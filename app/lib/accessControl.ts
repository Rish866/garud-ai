export const roleDefinitions = [
  {
    key: "owner",
    label: "Owner",
    description: "Full customer workspace control.",
    modules: ["All modules", "Settings", "Billing", "Users"],
  },
  {
    key: "admin",
    label: "Admin",
    description: "Daily ERP administration and user support.",
    modules: ["Fleet", "Trips", "Finance", "Compliance", "Reports", "Settings"],
  },
  {
    key: "operations",
    label: "Operations",
    description: "Dispatch, trips, route planning, and control tower.",
    modules: ["Dashboard", "Trips", "Route Planner", "Control Tower", "Live"],
  },
  {
    key: "finance",
    label: "Finance",
    description: "Invoices, payments, receivables, salary, and exports.",
    modules: ["Invoices", "Payments", "Receivables", "Fuel", "Driver Salary"],
  },
  {
    key: "safety",
    label: "Safety",
    description: "AI events, video requests, coaching, and evidence review.",
    modules: ["Live Dashcam", "Safety Events", "Video Requests", "Risk Engine"],
  },
  {
    key: "viewer",
    label: "Viewer",
    description: "Read-only management visibility.",
    modules: ["Dashboard", "Reports", "Customer Portal"],
  },
] as const;

export const manageableRoles = roleDefinitions.map((role) => role.key);

export function canManageSettings(role?: string, isSuperAdmin?: boolean) {
  return Boolean(isSuperAdmin || role === "owner" || role === "admin");
}

const tableWriteRoles: Record<string, string[]> = {
  vehicles: ["owner", "admin", "operations"],
  drivers: ["owner", "admin", "operations"],
  customers: ["owner", "admin", "operations", "finance"],
  trips: ["owner", "admin", "operations"],
  erp_route_plans: ["owner", "admin", "operations"],
  erp_trip_expenses: ["owner", "admin", "operations", "finance"],
  invoices: ["owner", "admin", "finance"],
  payments: ["owner", "admin", "finance"],
  fuel_logs: ["owner", "admin", "operations", "finance"],
  erp_driver_settlements: ["owner", "admin", "finance"],
  erp_billing_packs: ["owner", "admin", "finance", "operations"],
  erp_documents: ["owner", "admin", "operations", "finance", "safety"],
  erp_maintenance_jobs: ["owner", "admin", "operations"],
  erp_tyre_records: ["owner", "admin", "operations"],
  erp_safety_events: ["owner", "admin", "safety"],
  erp_video_requests: ["owner", "admin", "safety"],
  erp_issues: ["owner", "admin", "operations", "finance", "safety"],
  erp_action_log: ["owner", "admin", "operations", "finance", "safety"],
  erp_module_records: ["owner", "admin", "operations", "finance", "safety"],
  erp_notifications: ["owner", "admin"],
  erp_approvals: ["owner", "admin"],
  erp_integrations: ["owner", "admin"],
  erp_device_mappings: ["owner", "admin", "operations"],
  erp_accounting_entries: ["owner", "admin", "finance"],
  erp_inventory_items: ["owner", "admin", "operations", "finance"],
  erp_stock_movements: ["owner", "admin", "finance"],
  erp_ledger_postings: ["owner", "admin", "finance"],
};

export function canWriteTable(table: string, role?: string, isSuperAdmin?: boolean) {
  if (isSuperAdmin || role === "owner" || role === "admin") return true;
  return tableWriteRoles[table]?.includes(role || "") || false;
}
