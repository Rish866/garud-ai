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
