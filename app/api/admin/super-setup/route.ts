import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import { createPasswordHash } from "../../../lib/session";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  const { count } = await supabase
    .from("garud_super_users")
    .select("id", { count: "exact", head: true });

  return Response.json({ setupAllowed: (count || 0) === 0 });
}

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient();
  const { count } = await supabase
    .from("garud_super_users")
    .select("id", { count: "exact", head: true });

  if ((count || 0) > 0) {
    return Response.json(
      { ok: false, message: "Super admin is already created." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const fullName = String(body.fullName || "GARUD Admin").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || password.length < 10) {
    return Response.json(
      { ok: false, message: "Email and 10+ character password are required." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("garud_super_users")
    .insert({
      email,
      full_name: fullName,
      password_hash: createPasswordHash(password),
      status: "active",
    })
    .select("id, email, full_name")
    .single();

  if (error || !data) {
    return Response.json(
      { ok: false, message: error?.message || "Could not create super admin." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    user: { email: data.email, fullName: data.full_name },
  });
}
