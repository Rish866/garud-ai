import { createSupabaseAdminClient } from "./supabaseAdmin";

export type AgentResult = {
  ok: boolean;
  title: string;
  message: string;
  moduleKey: string;
  href: string;
  records: Array<{ table: string; id?: string | number; label: string }>;
};

type Classification = {
  moduleKey: string;
  href: string;
  recordType: string;
  title: string;
  documentType?: string;
  priority?: string;
  status?: string;
};

function firstMatch(value: string, pattern: RegExp) {
  return value.match(pattern)?.[1]?.trim() || "";
}

function extractAmount(value: string) {
  const match = value.match(/(?:inr|rs\.?|₹)?\s*([0-9][0-9,]*(?:\.[0-9]+)?)/i);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

function extractVehicle(value: string) {
  return (
    value.match(/[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{3,5}/i)?.[0]?.toUpperCase() ||
    firstMatch(value, /vehicle\s+([A-Z0-9-]+)/i)
  );
}

function classify(input: string, fileName = ""): Classification {
  const text = `${input} ${fileName}`.toLowerCase();

  if (text.includes("pod") || text.includes("proof of delivery")) {
    return {
      moduleKey: "document-management",
      href: "/document-center",
      recordType: "pod",
      title: "POD document intake",
      documentType: "POD",
      priority: "normal",
      status: "pending",
    };
  }

  if (text.includes("invoice") || text.includes("bill")) {
    return {
      moduleKey: "billing",
      href: "/invoices",
      recordType: "invoice",
      title: "Invoice intake",
      documentType: "Invoice",
      priority: "normal",
      status: "pending",
    };
  }

  if (text.includes("fuel") || text.includes("diesel")) {
    return {
      moduleKey: "fuel-management",
      href: "/fuel-management",
      recordType: "fuel",
      title: "Fuel entry intake",
      documentType: "Fuel Bill",
      priority: "normal",
      status: "pending",
    };
  }

  if (text.includes("permit") || text.includes("insurance") || text.includes("rc")) {
    return {
      moduleKey: "compliance",
      href: "/document-center",
      recordType: "compliance-document",
      title: "Compliance document intake",
      documentType: text.includes("insurance") ? "Insurance" : text.includes("permit") ? "Permit" : "RC",
      priority: "high",
      status: "pending",
    };
  }

  if (text.includes("maintenance") || text.includes("repair") || text.includes("breakdown")) {
    return {
      moduleKey: "workshop-module",
      href: "/maintenance-center",
      recordType: "maintenance",
      title: "Maintenance request",
      priority: "high",
      status: "open",
    };
  }

  if (text.includes("payment") || text.includes("receipt") || text.includes("utr")) {
    return {
      moduleKey: "accounts-receivable",
      href: "/payments",
      recordType: "payment",
      title: "Payment intake",
      priority: "normal",
      status: "pending",
    };
  }

  if (text.includes("driver") || text.includes("salary") || text.includes("advance")) {
    return {
      moduleKey: "driver-management",
      href: "/drivers",
      recordType: "driver-action",
      title: "Driver action intake",
      priority: "normal",
      status: "open",
    };
  }

  if (text.includes("trip") || text.includes("load") || text.includes("dispatch")) {
    return {
      moduleKey: "trip-management",
      href: "/trips",
      recordType: "trip-action",
      title: "Trip action intake",
      priority: "normal",
      status: "open",
    };
  }

  return {
    moduleKey: "master-data",
    href: "/erp/master-data",
    recordType: "general",
    title: "General ERP intake",
    priority: "normal",
    status: "open",
  };
}

export async function processAgentText(message: string): Promise<AgentResult> {
  const supabase = createSupabaseAdminClient();
  const classification = classify(message);
  const amount = extractAmount(message);
  const vehicle = extractVehicle(message);
  const party = firstMatch(message, /(?:for|from|customer|vendor)\s+([A-Za-z0-9 &.-]{3,40})/i);
  const title = firstMatch(message, /(?:add|create|record|make|upload)\s+(.{4,80})/i) || classification.title;

  const { data, error } = await supabase
    .from("erp_module_records")
    .insert({
      module_key: classification.moduleKey,
      record_type: classification.recordType,
      title,
      party: party || null,
      vehicle_label: vehicle || null,
      amount,
      priority: classification.priority || "normal",
      status: classification.status || "open",
      notes: message,
      created_by: "garud-agent",
    })
    .select("id")
    .single();

  if (error) {
    return {
      ok: false,
      title: "Agent could not save the request",
      message: error.message,
      moduleKey: classification.moduleKey,
      href: "/system-readiness",
      records: [],
    };
  }

  await supabase.from("erp_action_log").insert({
    module_key: classification.moduleKey,
    module_title: "GARUD AI Agent",
    record_label: title,
    action_type: "agent_intake",
    status: "open",
    note: message,
    assigned_to: "Ops admin",
    created_by: "garud-agent",
  });

  return {
    ok: true,
    title: "Request recorded",
    message: `I classified this as ${classification.title} and saved it under the correct ERP module.`,
    moduleKey: classification.moduleKey,
    href: classification.href,
    records: [{ table: "erp_module_records", id: data.id, label: title }],
  };
}

export async function processAgentFile(file: File, note: string): Promise<AgentResult> {
  const supabase = createSupabaseAdminClient();
  const classification = classify(note, file.name);
  const vehicle = extractVehicle(`${note} ${file.name}`);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const path = `agent/${Date.now()}-${safeName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await supabase.storage.createBucket("erp-documents", {
    public: false,
  });

  const upload = await supabase.storage
    .from("erp-documents")
    .upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (upload.error && !upload.error.message.toLowerCase().includes("already exists")) {
    return {
      ok: false,
      title: "File upload failed",
      message: upload.error.message,
      moduleKey: classification.moduleKey,
      href: "/document-center",
      records: [],
    };
  }

  const { data: document, error: documentError } = await supabase
    .from("erp_documents")
    .insert({
      entity_type: vehicle ? "vehicle" : "general",
      entity_label: vehicle || "Unassigned",
      document_type: classification.documentType || "Uploaded Document",
      document_number: firstMatch(note, /(?:no|number|#)\s*([A-Z0-9-]+)/i) || null,
      file_url: path,
      status: "pending",
    })
    .select("id")
    .single();

  if (documentError) {
    return {
      ok: false,
      title: "Document record failed",
      message: documentError.message,
      moduleKey: classification.moduleKey,
      href: "/document-center",
      records: [],
    };
  }

  const { data: moduleRecord } = await supabase
    .from("erp_module_records")
    .insert({
      module_key: classification.moduleKey,
      record_type: classification.recordType,
      title: `${classification.title}: ${file.name}`,
      vehicle_label: vehicle || null,
      priority: classification.priority || "normal",
      status: "pending",
      notes: note || `Uploaded file ${file.name}`,
      created_by: "garud-agent",
    })
    .select("id")
    .single();

  await supabase.from("erp_action_log").insert({
    module_key: classification.moduleKey,
    module_title: "GARUD AI Agent",
    record_label: file.name,
    action_type: "agent_file_upload",
    status: "open",
    note: note || "File uploaded through GARUD AI Agent",
    assigned_to: "Docs team",
    created_by: "garud-agent",
  });

  return {
    ok: true,
    title: "File uploaded and recorded",
    message: `I uploaded the file, classified it as ${classification.documentType || classification.title}, and created document/module records.`,
    moduleKey: classification.moduleKey,
    href: classification.href === "/invoices" ? "/document-center" : classification.href,
    records: [
      { table: "erp_documents", id: document.id, label: file.name },
      { table: "erp_module_records", id: moduleRecord?.id, label: classification.title },
    ],
  };
}
