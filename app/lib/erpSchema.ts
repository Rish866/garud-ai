export type ERPTableRequirement = {
  table: string;
  label: string;
  module: string;
  critical: boolean;
};

export const erpTableRequirements: ERPTableRequirement[] = [
  { table: "garud_tenants", label: "Customer workspaces", module: "Admin", critical: true },
  { table: "garud_customer_users", label: "Customer logins", module: "Admin", critical: true },
  { table: "garud_super_users", label: "GARUD super admins", module: "Admin", critical: true },
  { table: "vehicles", label: "Vehicle master", module: "Fleet", critical: true },
  { table: "drivers", label: "Driver master", module: "Fleet", critical: true },
  { table: "customers", label: "Customer master", module: "CRM", critical: true },
  { table: "trips", label: "Trip lifecycle", module: "TMS", critical: true },
  { table: "invoices", label: "Invoices", module: "Finance", critical: true },
  { table: "payments", label: "Payments", module: "Finance", critical: true },
  { table: "fuel_logs", label: "Fuel logs", module: "Finance", critical: false },
  { table: "erp_action_log", label: "Action audit log", module: "Workflow", critical: true },
  { table: "erp_issues", label: "Issue control tower", module: "Workflow", critical: true },
  { table: "erp_documents", label: "Document vault", module: "Compliance", critical: true },
  { table: "erp_maintenance_jobs", label: "Maintenance jobs", module: "Compliance", critical: true },
  { table: "erp_tyre_records", label: "Tyre lifecycle", module: "Compliance", critical: false },
  { table: "erp_trip_expenses", label: "Trip expense approvals", module: "Finance", critical: true },
  { table: "erp_driver_settlements", label: "Driver settlements", module: "Finance", critical: false },
  { table: "erp_billing_packs", label: "Billing packs", module: "Finance", critical: true },
  { table: "erp_safety_events", label: "AI safety events", module: "AI Safety", critical: true },
  { table: "erp_video_requests", label: "Video requests", module: "AI Safety", critical: false },
  { table: "erp_route_plans", label: "Route plans", module: "TMS", critical: false },
  { table: "erp_report_exports", label: "Report export log", module: "Reports", critical: true },
  { table: "erp_module_records", label: "Universal ERP module records", module: "Architecture", critical: true },
  { table: "erp_notifications", label: "Clickable notifications", module: "Automation", critical: true },
  { table: "erp_approvals", label: "Workflow approvals", module: "Automation", critical: true },
  { table: "erp_integrations", label: "Integration registry", module: "Admin", critical: false },
  { table: "erp_device_mappings", label: "Vehicle device mappings", module: "Integrations", critical: true },
  { table: "erp_accounting_entries", label: "Tally-style accounting entries", module: "Accounting", critical: true },
  { table: "erp_inventory_items", label: "Inventory stock master", module: "Inventory", critical: true },
  { table: "erp_stock_movements", label: "Inventory stock movement ledger", module: "Inventory", critical: true },
  { table: "erp_ledger_postings", label: "Double-entry ledger postings", module: "Accounting", critical: true },
];
