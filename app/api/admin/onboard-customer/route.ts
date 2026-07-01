import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import { createPasswordHash } from "../../../lib/session";
import { getCurrentTenant } from "../../../lib/tenant";

function makeTenantCode(companyName: string) {
  const slug = companyName
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, 5)
    .padEnd(5, "X");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GARUD-${slug}-${suffix}`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const companyName = String(body.companyName || "").trim();
  const fullName = String(body.fullName || "Owner").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const transporterType = String(body.transporterType || "fleet_owner");
  const logoUrl = String(body.logoUrl || "").trim();
  const brandColor = String(body.brandColor || "#22d3ee").trim();
  const portalTitle = String(body.portalTitle || companyName).trim();
  const workflowTemplate = String(body.workflowTemplate || "standard_tms");
  const enabledModules = Array.isArray(body.enabledModules)
    ? body.enabledModules
    : [];

  if (!companyName || !email || password.length < 8) {
    return Response.json(
      {
        ok: false,
        message: "Company, owner email, and 8+ character password are required.",
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { count: superUserCount } = await supabase
    .from("garud_super_users")
    .select("id", { count: "exact", head: true });
  const currentTenant = await getCurrentTenant();

  if ((superUserCount || 0) > 0 && !currentTenant?.isSuperAdmin) {
    return Response.json(
      { ok: false, message: "Super admin access is required to onboard customers." },
      { status: 403 },
    );
  }

  const tenantCode = makeTenantCode(companyName);

  let { data: tenant, error: tenantError } = await supabase
    .from("garud_tenants")
    .insert({
      tenant_code: tenantCode,
      company_name: companyName,
      transporter_type: transporterType,
      logo_url: logoUrl || null,
      brand_color: brandColor || "#22d3ee",
      portal_title: portalTitle || companyName,
      workflow_template: workflowTemplate,
      enabled_modules: enabledModules,
      status: "active",
    })
    .select("id, tenant_code, company_name")
    .single();

  if (tenantError?.message.toLowerCase().includes("column")) {
    ({ data: tenant, error: tenantError } = await supabase
      .from("garud_tenants")
      .insert({
        tenant_code: tenantCode,
        company_name: companyName,
        transporter_type: transporterType,
        status: "active",
      })
      .select("id, tenant_code, company_name")
      .single());
  }

  if (tenantError || !tenant) {
    return Response.json(
      { ok: false, message: tenantError?.message || "Could not create customer." },
      { status: 500 },
    );
  }

  const { data: user, error: userError } = await supabase
    .from("garud_customer_users")
    .insert({
      tenant_id: tenant.id,
      email,
      full_name: fullName,
      role: "owner",
      password_hash: createPasswordHash(password),
      status: "active",
    })
    .select("id, email, full_name, role")
    .single();

  if (userError || !user) {
    await supabase.from("garud_tenants").delete().eq("id", tenant.id);
    return Response.json(
      { ok: false, message: userError?.message || "Could not create owner login." },
      { status: 500 },
    );
  }

  await supabase.from("erp_module_records").insert({
    tenant_id: tenant.id,
    module_key: "onboarding",
    module_title: "Customer Onboarding",
    record_type: "workspace",
    title: `${companyName} workspace created`,
    status: "Open",
    priority: "High",
    amount: 0,
    owner: fullName,
    due_date: new Date().toISOString().slice(0, 10),
    metadata: {
      tenantCode: tenant.tenant_code,
      transporterType,
      nextSteps: ["Add vehicles", "Add drivers", "Add customers", "Create first trip"],
    },
  });

  return Response.json({
    ok: true,
    tenant,
    user: { email: user.email, fullName: user.full_name, role: user.role },
    loginUrl: "/login",
  });
}
