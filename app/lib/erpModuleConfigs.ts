import type { ERPModuleConfig } from "../components/erp/ERPModulePage";

const money = (value: number) => `INR ${value.toLocaleString("en-IN")}`;

export const erpModules: Record<string, ERPModuleConfig> = {
  vehicles: {
    eyebrow: "Fleet ERP",
    title: "Vehicle Master & Asset Control",
    description:
      "Complete vehicle registry with live status, ownership, documents, GPS, cameras, maintenance, tyre health, and profitability signals.",
    primaryAction: { label: "Add vehicle", href: "/vehicles" },
    secondaryActions: [
      { label: "View risk", href: "/vehicle-risk" },
      { label: "Profitability", href: "/profitability" },
    ],
    metrics: [
      { label: "Total vehicles", value: 58, hint: "Owned and attached" },
      { label: "Active today", value: 43, hint: "On road or loading", tone: "emerald" },
      { label: "Maintenance due", value: 5, hint: "Before next dispatch", tone: "amber" },
      { label: "High risk", value: 3, hint: "Restrict assignment", tone: "rose" },
    ],
    workflows: [
      { title: "RC, permit, FC, insurance linked", owner: "Fleet admin", status: "Live", due: "Always on" },
      { title: "GPS and dashcam installation check", owner: "Telematics", status: "Pending", due: "2 vehicles" },
      { title: "Trip assignment lock for expired docs", owner: "Dispatch", status: "Auto", due: "Before load" },
      { title: "Vehicle P&L review", owner: "Accounts", status: "Weekly", due: "Friday" },
    ],
    table: {
      title: "Vehicle Operating Register",
      columns: ["Vehicle", "Type", "Driver", "Status", "Next action"],
      rows: [
        ["MH04XY5678", "Container", "Rajesh Patil", "Running", "Review collision alert"],
        ["MH12PQ7890", "Auto Parts", "Aniket Jadhav", "Running", "Tyre inspection"],
        ["RJ14BT4501", "Reefer", "Vikas Sharma", "Workshop", "Clear engine heat"],
      ],
    },
    automations: [
      "Block trip creation when insurance, FC, permit, or PUC is expired.",
      "Notify owner when a vehicle falls below target margin for two weeks.",
      "Create maintenance job from repeated engine, brake, or tyre events.",
    ],
    reports: ["Vehicle master export", "Vehicle P&L", "Document expiry", "Maintenance cost report"],
  },
  drivers: {
    eyebrow: "Fleet ERP",
    title: "Driver Master, Duty & Coaching",
    description:
      "Manage driver KYC, license, salary, trip duty, advances, safety score, coaching actions, and attendance readiness.",
    primaryAction: { label: "Add driver", href: "/drivers" },
    secondaryActions: [
      { label: "Safety score", href: "/driver-score" },
      { label: "Salary", href: "/driver-salary" },
    ],
    metrics: [
      { label: "Drivers", value: 64, hint: "Active workforce" },
      { label: "On duty", value: 38, hint: "Assigned today", tone: "emerald" },
      { label: "Coaching due", value: 7, hint: "Safety action", tone: "amber" },
      { label: "License expiry", value: 4, hint: "Next 30 days", tone: "rose" },
    ],
    workflows: [
      { title: "License and KYC verification", owner: "HR", status: "Live", due: "On joining" },
      { title: "Trip duty assignment", owner: "Dispatcher", status: "Daily", due: "Before loading" },
      { title: "Advance and salary settlement", owner: "Accounts", status: "Monthly", due: "Month end" },
      { title: "DMS coaching closure", owner: "Safety", status: "Open", due: "Before next long haul" },
    ],
    table: {
      title: "Driver Duty Board",
      columns: ["Driver", "Vehicle", "Safety", "Duty", "Next action"],
      rows: [
        ["Rajesh Patil", "MH04XY5678", "91", "JNPT to Bhiwandi", "Coach following distance"],
        ["Mohan Reddy", "KA01TR8842", "78", "Peenya to Whitefield", "Phone-use coaching"],
        ["Imran Shaikh", "GJ05LM2210", "94", "Standby", "Assign local delivery"],
      ],
    },
    automations: [
      "Do not assign night duty to drivers with recent fatigue events.",
      "Create coaching task after critical DMS or ADAS event.",
      "Warn accounts when driver advance crosses configured limit.",
    ],
    reports: ["Driver ledger", "Driver safety scorecard", "Duty roster", "Coaching history"],
  },
  customers: {
    eyebrow: "Fleet ERP",
    title: "Customer, Contract & Credit Control",
    description:
      "Manage customers, lanes, contract rates, billing terms, POD requirements, credit exposure, and dispatch hold decisions.",
    primaryAction: { label: "New customer", href: "/customers" },
    secondaryActions: [
      { label: "Receivables", href: "/receivables" },
      { label: "Create invoice", href: "/invoices" },
    ],
    metrics: [
      { label: "Customers", value: 24, hint: "Active accounts" },
      { label: "Credit exposure", value: money(612500), hint: "Open receivables", tone: "amber" },
      { label: "On credit hold", value: 2, hint: "Payment overdue", tone: "rose" },
      { label: "Contract lanes", value: 46, hint: "Rate cards loaded", tone: "emerald" },
    ],
    workflows: [
      { title: "Rate card approval", owner: "Owner", status: "Live", due: "Before trip" },
      { title: "POD and billing pack", owner: "Billing", status: "Auto", due: "After unload" },
      { title: "Credit hold review", owner: "Accounts", status: "Daily", due: "10 AM" },
      { title: "Customer escalation", owner: "Sales", status: "Open", due: "45+ days" },
    ],
    table: {
      title: "Customer Credit Register",
      columns: ["Customer", "Lane", "Credit", "Outstanding", "Action"],
      rows: [
        ["TransOcean Logistics", "JNPT-Bhiwandi", "15 days", money(154000), "Collect today"],
        ["FreshRoute Cold Chain", "Jaipur-Delhi", "30 days", money(96000), "Escalate"],
        ["MetroMart Retail", "Mumbai local", "45 days", money(109000), "Hold credit"],
      ],
    },
    automations: [
      "Block new trips when customer exceeds credit days or limit.",
      "Auto-create billing pack after POD upload.",
      "Notify sales before key account crosses escalation threshold.",
    ],
    reports: ["Customer ledger", "Lane rate card", "Credit exposure", "Billing pack"],
  },
  trips: {
    eyebrow: "Dispatch ERP",
    title: "Trip Planning, Dispatch & POD",
    description:
      "Create trips, assign vehicle and driver, track route progress, capture expenses, attach POD, and close billing in one workflow.",
    primaryAction: { label: "Create trip", href: "/trips" },
    secondaryActions: [
      { label: "Trip expenses", href: "/trip-expenses" },
      { label: "Create invoice", href: "/invoices" },
    ],
    metrics: [
      { label: "Trips today", value: 18, hint: "Running and planned" },
      { label: "On time", value: "92%", hint: "Delivery SLA", tone: "emerald" },
      { label: "Delayed", value: 3, hint: "Needs dispatcher action", tone: "amber" },
      { label: "POD pending", value: 6, hint: "Billing blocked", tone: "rose" },
    ],
    workflows: [
      { title: "Load booking and rate lock", owner: "Dispatch", status: "Live", due: "Before loading" },
      { title: "Vehicle and driver assignment", owner: "Dispatcher", status: "Live", due: "Same day" },
      { title: "POD capture and verification", owner: "Billing", status: "Pending", due: "After delivery" },
      { title: "Invoice generation", owner: "Accounts", status: "Auto", due: "POD approved" },
    ],
    table: {
      title: "Trip Control Board",
      columns: ["Trip", "Lane", "Vehicle", "Status", "Next action"],
      rows: [
        ["9001", "JNPT to Bhiwandi", "MH04XY5678", "Running", "Monitor ETA"],
        ["9004", "Peenya to Whitefield", "KA01TR8842", "Running", "Review DMS event"],
        ["9005", "Jaipur to Delhi", "RJ14BT4501", "Pending", "Clear maintenance hold"],
      ],
    },
    automations: [
      "Auto-alert if vehicle deviates from planned route.",
      "Auto-create detention charge when waiting time exceeds contract.",
      "Block invoice until POD and trip expenses are reviewed.",
    ],
    reports: ["Trip sheet", "POD report", "Lane profitability", "Customer billing packet"],
  },
  "trip-expenses": {
    eyebrow: "Dispatch ERP",
    title: "Trip Expense Capture & Approval",
    description:
      "Capture diesel, toll, loading, unloading, challan, driver advance, detention, and miscellaneous expenses before trip billing.",
    primaryAction: { label: "Add trip expense", href: "/trip-expenses" },
    secondaryActions: [
      { label: "Trips", href: "/trips" },
      { label: "Profitability", href: "/profitability" },
    ],
    metrics: [
      { label: "Expenses today", value: money(126800), hint: "Across active trips" },
      { label: "Pending approval", value: 9, hint: "Needs accounts check", tone: "amber" },
      { label: "Unbilled detention", value: money(56000), hint: "Recover from customers", tone: "emerald" },
      { label: "Leakage flags", value: 4, hint: "Variance from baseline", tone: "rose" },
    ],
    workflows: [
      { title: "Driver expense capture", owner: "Driver", status: "Live", due: "During trip" },
      { title: "Bill proof verification", owner: "Accounts", status: "Pending", due: "Trip close" },
      { title: "Customer recoverable tagging", owner: "Billing", status: "Open", due: "Before invoice" },
      { title: "Trip P&L update", owner: "System", status: "Auto", due: "On approval" },
    ],
    table: {
      title: "Expense Approval Queue",
      columns: ["Trip", "Category", "Amount", "Recoverable", "Action"],
      rows: [
        ["9001", "Toll", money(6800), "Yes", "Attach to invoice"],
        ["9004", "Driver advance", money(12000), "No", "Approve"],
        ["9005", "Loading detention", money(18000), "Yes", "Customer claim"],
      ],
    },
    automations: [
      "Flag expense when amount exceeds lane benchmark.",
      "Auto-add recoverable charges to invoice draft.",
      "Block trip closure until required bills are uploaded.",
    ],
    reports: ["Trip expense ledger", "Recoverable charges", "Expense variance", "Driver advance report"],
  },
};

export const complianceModules: Record<string, ERPModuleConfig> = {
  "maintenance-center": {
    eyebrow: "Compliance",
    title: "Maintenance Command Center",
    description:
      "Plan preventive maintenance, breakdown repair, job cards, vendor bills, spare parts, downtime, and vehicle release approvals.",
    primaryAction: { label: "Add maintenance", href: "/maintenance-center" },
    secondaryActions: [
      { label: "Alerts", href: "/maintenance-alerts" },
      { label: "Vehicle risk", href: "/vehicle-risk" },
    ],
    metrics: [
      { label: "Open jobs", value: 12, hint: "Workshop queue" },
      { label: "Critical", value: 3, hint: "Block dispatch", tone: "rose" },
      { label: "Downtime", value: "64 hrs", hint: "This month", tone: "amber" },
      { label: "Released", value: 18, hint: "After repair", tone: "emerald" },
    ],
    workflows: [
      { title: "Preventive service schedule", owner: "Maintenance", status: "Auto", due: "By km and date" },
      { title: "Breakdown job card", owner: "Workshop", status: "Open", due: "Same day" },
      { title: "Vendor bill approval", owner: "Accounts", status: "Pending", due: "Before payment" },
      { title: "Vehicle release approval", owner: "Owner", status: "Required", due: "Before dispatch" },
    ],
    table: {
      title: "Maintenance Job Cards",
      columns: ["Vehicle", "Issue", "Priority", "Estimate", "Action"],
      rows: [
        ["RJ14BT4501", "Engine temperature spike", "Critical", money(42000), "Hold dispatch"],
        ["MH12PQ7890", "Front tyre wear", "High", money(18500), "Replace tyre"],
        ["KA01TR8842", "Brake pad inspection", "Medium", money(9600), "Inspect today"],
      ],
    },
    automations: [
      "Create job card from repeated engine, brake, or tyre alerts.",
      "Block trip assignment when critical job card is open.",
      "Notify owner when repair estimate exceeds threshold.",
    ],
    reports: ["Maintenance cost report", "Downtime report", "Vendor bill report", "Preventive schedule"],
  },
  "tyre-management": {
    eyebrow: "Compliance",
    title: "Tyre Lifecycle & Cost Control",
    description:
      "Track tyre position, fitment, rotation, pressure, tread depth, retreading, failures, and per-km tyre cost.",
    primaryAction: { label: "Add tyre entry", href: "/tyre-management" },
    secondaryActions: [
      { label: "Maintenance center", href: "/maintenance-center" },
      { label: "Vehicle risk", href: "/vehicle-risk" },
    ],
    metrics: [
      { label: "Tyres tracked", value: 232, hint: "Across fleet" },
      { label: "Rotation due", value: 17, hint: "Next 7 days", tone: "amber" },
      { label: "Critical wear", value: 5, hint: "Replace now", tone: "rose" },
      { label: "Cost / km", value: "INR 2.8", hint: "Fleet average", tone: "emerald" },
    ],
    workflows: [
      { title: "Fitment and position register", owner: "Tyre manager", status: "Live", due: "On install" },
      { title: "Pressure and tread inspection", owner: "Yard team", status: "Daily", due: "Pre-dispatch" },
      { title: "Rotation planning", owner: "Maintenance", status: "Weekly", due: "Sunday" },
      { title: "Retread or scrap decision", owner: "Owner", status: "Review", due: "Wear threshold" },
    ],
    table: {
      title: "Tyre Risk Register",
      columns: ["Vehicle", "Position", "Tread", "Pressure", "Action"],
      rows: [
        ["MH12PQ7890", "Front right", "28%", "Low", "Replace"],
        ["RJ14BT4501", "Rear left", "42%", "Normal", "Rotate"],
        ["KA01TR8842", "Rear right", "58%", "Normal", "Monitor"],
      ],
    },
    automations: [
      "Warn when tyre wear crosses safe threshold.",
      "Create maintenance job when pressure is repeatedly low.",
      "Calculate tyre cost per vehicle and per lane.",
    ],
    reports: ["Tyre lifecycle", "Tyre cost per km", "Retread report", "Failure analysis"],
  },
  "document-center": {
    eyebrow: "Compliance",
    title: "Document Vault & Expiry Control",
    description:
      "Store and track RC, permit, FC, insurance, PUC, tax, driver license, KYC, customer contracts, and POD documents.",
    primaryAction: { label: "Open alerts", href: "/document-alerts" },
    secondaryActions: [
      { label: "Vehicles", href: "/vehicles" },
      { label: "Drivers", href: "/drivers" },
    ],
    metrics: [
      { label: "Documents", value: 486, hint: "Vehicle, driver, customer" },
      { label: "Expiring soon", value: 9, hint: "Next 30 days", tone: "amber" },
      { label: "Expired", value: 2, hint: "Dispatch blocked", tone: "rose" },
      { label: "Verified", value: "96%", hint: "Audit readiness", tone: "emerald" },
    ],
    workflows: [
      { title: "Upload and verify document", owner: "Admin", status: "Live", due: "On creation" },
      { title: "Expiry reminders", owner: "System", status: "Auto", due: "30/15/7 days" },
      { title: "Dispatch block on expired docs", owner: "Dispatch", status: "Auto", due: "Before trip" },
      { title: "Audit pack export", owner: "Compliance", status: "Ready", due: "On demand" },
    ],
    table: {
      title: "Document Expiry Register",
      columns: ["Entity", "Document", "Expiry", "Risk", "Action"],
      rows: [
        ["RJ14BT4501", "National permit", "3 days", "High", "Renew now"],
        ["MH12PQ7890", "Fitness certificate", "8 days", "Medium", "Book RTO"],
        ["KA01TR8842", "Insurance", "12 days", "Medium", "Renew policy"],
      ],
    },
    automations: [
      "Send expiry reminders to admin and owner.",
      "Block trips when mandatory documents expire.",
      "Create customer billing pack with POD and GPS proof.",
    ],
    reports: ["Document expiry", "Audit pack", "Missing documents", "Customer POD archive"],
  },
  "maintenance-alerts": {
    eyebrow: "Compliance",
    title: "Maintenance Alerts & Dispatch Holds",
    description:
      "Track service alerts, breakdown risk, inspection failures, job-card escalation, and automatic dispatch holds.",
    primaryAction: { label: "Open maintenance center", href: "/maintenance-center" },
    secondaryActions: [
      { label: "Add maintenance", href: "/maintenance-center" },
      { label: "Vehicle risk", href: "/vehicle-risk" },
    ],
    metrics: [
      { label: "Open alerts", value: 14, hint: "Fleet-wide" },
      { label: "Dispatch holds", value: 3, hint: "Cannot assign trip", tone: "rose" },
      { label: "Service due", value: 8, hint: "Next 7 days", tone: "amber" },
      { label: "Closed this week", value: 19, hint: "Workshop output", tone: "emerald" },
    ],
    workflows: [
      { title: "Alert triage", owner: "Maintenance", status: "Live", due: "Daily" },
      { title: "Job card creation", owner: "Workshop", status: "Auto", due: "On high alert" },
      { title: "Dispatch hold release", owner: "Owner", status: "Approval", due: "After repair" },
      { title: "Vendor billing", owner: "Accounts", status: "Pending", due: "Job close" },
    ],
    table: {
      title: "Maintenance Alert Queue",
      columns: ["Vehicle", "Alert", "Severity", "ETA impact", "Action"],
      rows: [
        ["RJ14BT4501", "Engine heat", "Critical", "Hold load", "Workshop"],
        ["MH12PQ7890", "Tyre wear", "High", "Inspect before trip", "Replace"],
        ["KA01TR8842", "Brake inspection", "Medium", "No delay", "Schedule"],
      ],
    },
    automations: [
      "Create dispatch hold for critical mechanical alerts.",
      "Escalate repeated alerts to owner.",
      "Attach maintenance cost to vehicle profitability.",
    ],
    reports: ["Alert history", "Dispatch hold report", "Repair cost impact", "Workshop SLA"],
  },
  "document-alerts": {
    eyebrow: "Compliance",
    title: "Document Alerts & Renewal Desk",
    description:
      "Prioritize expiring permits, insurance, FC, PUC, tax, licenses, and contracts before they block dispatch.",
    primaryAction: { label: "Open document center", href: "/document-center" },
    secondaryActions: [
      { label: "Vehicles", href: "/vehicles" },
      { label: "Drivers", href: "/drivers" },
    ],
    metrics: [
      { label: "Due in 7 days", value: 4, hint: "Immediate renewal", tone: "rose" },
      { label: "Due in 30 days", value: 9, hint: "Plan renewal", tone: "amber" },
      { label: "Dispatch blocked", value: 2, hint: "Expired docs", tone: "rose" },
      { label: "Renewed", value: 16, hint: "This month", tone: "emerald" },
    ],
    workflows: [
      { title: "Expiry detection", owner: "System", status: "Auto", due: "Daily" },
      { title: "Renewal assignment", owner: "Admin", status: "Open", due: "Same day" },
      { title: "Proof upload", owner: "Admin", status: "Pending", due: "Before dispatch" },
      { title: "Dispatch unblock", owner: "System", status: "Auto", due: "After verification" },
    ],
    table: {
      title: "Renewal Queue",
      columns: ["Entity", "Document", "Due", "Risk", "Action"],
      rows: [
        ["RJ14BT4501", "National permit", "3 days", "High", "Renew now"],
        ["MH12PQ7890", "Fitness certificate", "8 days", "Medium", "Book slot"],
        ["Driver Mohan", "License", "18 days", "Low", "Remind driver"],
      ],
    },
    automations: [
      "Notify owner and admin at 30, 15, 7, and 1 day.",
      "Block vehicle or driver assignment after expiry.",
      "Keep audit trail of renewal proof.",
    ],
    reports: ["Expiry calendar", "Blocked dispatch report", "Renewal cost report", "Audit trail"],
  },
};

export const financeModules: Record<string, ERPModuleConfig> = {
  "fuel-management": {
    eyebrow: "Finance",
    title: "Fuel Control & Mileage Analytics",
    description:
      "Track fuel entries, card/cash spend, route mileage, theft variance, driver-wise consumption, and vehicle fuel efficiency.",
    primaryAction: { label: "Add fuel", href: "/fuel-management" },
    secondaryActions: [
      { label: "Trip expenses", href: "/trip-expenses" },
      { label: "Profitability", href: "/profitability" },
    ],
    metrics: [
      { label: "Fuel spend", value: money(238000), hint: "Month to date" },
      { label: "Avg mileage", value: "4.8 km/L", hint: "Heavy fleet" },
      { label: "Variance", value: "7.2%", hint: "Needs review", tone: "amber" },
      { label: "Suspect entries", value: 4, hint: "Audit required", tone: "rose" },
    ],
    workflows: [
      { title: "Fuel entry and bill capture", owner: "Driver", status: "Live", due: "At pump" },
      { title: "Mileage validation", owner: "Accounts", status: "Auto", due: "After trip" },
      { title: "Variance review", owner: "Owner", status: "Open", due: "Daily" },
      { title: "Vendor/card reconciliation", owner: "Accounts", status: "Weekly", due: "Saturday" },
    ],
    table: {
      title: "Fuel Variance Board",
      columns: ["Vehicle", "Lane", "Fuel", "Mileage", "Action"],
      rows: [
        ["MH04XY5678", "JNPT-Bhiwandi", "78 L", "4.2 km/L", "Review traffic"],
        ["KA01TR8842", "Peenya-Whitefield", "61 L", "3.9 km/L", "Check idling"],
        ["RJ14BT4501", "Jaipur-Delhi", "142 L", "4.6 km/L", "Normal"],
      ],
    },
    automations: [
      "Flag fuel entry if odometer and GPS distance mismatch.",
      "Alert when mileage drops below vehicle baseline.",
      "Attach fuel cost automatically to trip profitability.",
    ],
    reports: ["Fuel ledger", "Mileage variance", "Fuel vendor reconciliation", "Driver fuel behavior"],
  },
  "driver-salary": {
    eyebrow: "Finance",
    title: "Driver Salary, Advance & Settlement",
    description:
      "Calculate salary, trip bata, incentives, penalties, advances, deductions, and month-end settlement per driver.",
    primaryAction: { label: "Add salary", href: "/driver-salary" },
    secondaryActions: [
      { label: "Drivers", href: "/drivers" },
      { label: "Driver score", href: "/driver-score" },
    ],
    metrics: [
      { label: "Payroll due", value: money(312000), hint: "Current cycle" },
      { label: "Advances", value: money(86000), hint: "Recoverable" },
      { label: "Incentives", value: money(42000), hint: "Safe driving" },
      { label: "Penalties", value: money(9500), hint: "Violations", tone: "amber" },
    ],
    workflows: [
      { title: "Trip-wise bata calculation", owner: "Accounts", status: "Auto", due: "Trip close" },
      { title: "Advance approval", owner: "Owner", status: "Approval", due: "On request" },
      { title: "Safety incentive", owner: "Safety", status: "Monthly", due: "Month end" },
      { title: "Salary settlement", owner: "Accounts", status: "Pending", due: "Month end" },
    ],
    table: {
      title: "Driver Settlement Board",
      columns: ["Driver", "Salary", "Advance", "Incentive", "Net payable"],
      rows: [
        ["Rajesh Patil", money(42000), money(8000), money(5000), money(39000)],
        ["Aniket Jadhav", money(38000), money(12000), money(3500), money(29500)],
        ["Mohan Reddy", money(40000), money(5000), money(0), money(35000)],
      ],
    },
    automations: [
      "Auto-calculate trip bata from completed trips.",
      "Deduct approved advances during salary settlement.",
      "Reward safe drivers and flag repeat safety violations.",
    ],
    reports: ["Driver salary sheet", "Advance ledger", "Bata report", "Safety incentive report"],
  },
  invoices: {
    eyebrow: "Finance",
    title: "Invoice, POD & Billing Workflow",
    description:
      "Generate invoices from trips, attach POD and GPS proof, add detention charges, track approvals, and send billing packs.",
    primaryAction: { label: "Create invoice", href: "/invoices" },
    secondaryActions: [
      { label: "Receivables", href: "/receivables" },
      { label: "Payments", href: "/payments" },
    ],
    metrics: [
      { label: "Invoices", value: 42, hint: "This month" },
      { label: "Pending POD", value: 6, hint: "Billing blocked", tone: "amber" },
      { label: "Ready to send", value: 12, hint: "Approved billing pack", tone: "emerald" },
      { label: "Disputed", value: 3, hint: "Needs sales follow-up", tone: "rose" },
    ],
    workflows: [
      { title: "Trip close and POD verification", owner: "Billing", status: "Live", due: "After unload" },
      { title: "Rate and detention validation", owner: "Accounts", status: "Pending", due: "Before invoice" },
      { title: "Invoice approval", owner: "Owner", status: "Approval", due: "Same day" },
      { title: "Customer email and ledger update", owner: "Billing", status: "Auto", due: "On approval" },
    ],
    table: {
      title: "Invoice Control Board",
      columns: ["Invoice", "Customer", "Amount", "Status", "Action"],
      rows: [
        ["INV-2407-018", "TransOcean Logistics", money(218000), "Part paid", "Collect balance"],
        ["INV-2407-014", "Bharat Auto Components", money(164500), "Sent", "Follow up"],
        ["INV-2406-021", "MetroMart Retail", money(109000), "Overdue", "Hold credit"],
      ],
    },
    automations: [
      "Block invoice creation until POD and trip expenses are reviewed.",
      "Auto-add detention charges from route waiting time.",
      "Send reminder based on customer credit terms.",
    ],
    reports: ["Invoice register", "POD billing pack", "Dispute report", "Customer ledger"],
  },
  payments: {
    eyebrow: "Finance",
    title: "Payments, Receipts & Reconciliation",
    description:
      "Record customer receipts, vendor payments, driver advances, bank reconciliation, invoice settlement, and cash-flow control.",
    primaryAction: { label: "Add payment", href: "/payments" },
    secondaryActions: [
      { label: "Receivables", href: "/receivables" },
      { label: "Invoices", href: "/invoices" },
    ],
    metrics: [
      { label: "Receipts today", value: money(154000), hint: "Customer collections", tone: "emerald" },
      { label: "Vendor payouts", value: money(84000), hint: "Fuel and repair" },
      { label: "Unmatched", value: 5, hint: "Needs reconciliation", tone: "amber" },
      { label: "Cash runway", value: "11 days", hint: "At current spend" },
    ],
    workflows: [
      { title: "Receipt entry against invoice", owner: "Accounts", status: "Live", due: "On payment" },
      { title: "Vendor bill payment", owner: "Owner", status: "Approval", due: "Due date" },
      { title: "Bank statement matching", owner: "Accounts", status: "Daily", due: "5 PM" },
      { title: "Cash-flow forecast", owner: "Owner", status: "Weekly", due: "Monday" },
    ],
    table: {
      title: "Payment Reconciliation",
      columns: ["Reference", "Party", "Type", "Amount", "Status"],
      rows: [
        ["PAY-1008", "TransOcean Logistics", "Receipt", money(64000), "Matched"],
        ["PAY-1011", "Fuel vendor", "Payout", money(48000), "Pending approval"],
        ["PAY-1014", "Repair vendor", "Payout", money(36000), "Unmatched"],
      ],
    },
    automations: [
      "Auto-match receipts to oldest open invoice.",
      "Alert owner when cash runway drops below threshold.",
      "Prevent duplicate payment references.",
    ],
    reports: ["Payment register", "Bank reconciliation", "Vendor payout report", "Cash-flow summary"],
  },
  billing: {
    eyebrow: "Finance",
    title: "Billing, Contracts & Charges",
    description:
      "Configure lane rates, detention, loading/unloading charges, GST, billing rules, customer terms, and approval workflows.",
    primaryAction: { label: "Create invoice", href: "/invoices" },
    secondaryActions: [
      { label: "Customers", href: "/customers" },
      { label: "Receivables", href: "/receivables" },
    ],
    metrics: [
      { label: "Active rate cards", value: 46, hint: "Customer lanes" },
      { label: "Detention claims", value: money(56000), hint: "This month", tone: "emerald" },
      { label: "Billing errors", value: 2, hint: "Needs correction", tone: "amber" },
      { label: "GST ready", value: "100%", hint: "Invoice compliance", tone: "emerald" },
    ],
    workflows: [
      { title: "Rate card setup", owner: "Owner", status: "Approval", due: "Before trip" },
      { title: "Charge validation", owner: "Billing", status: "Auto", due: "Trip close" },
      { title: "GST invoice creation", owner: "Accounts", status: "Live", due: "POD approved" },
      { title: "Customer billing pack", owner: "Billing", status: "Auto", due: "Invoice send" },
    ],
    table: {
      title: "Billing Rule Matrix",
      columns: ["Customer", "Lane", "Base rate", "Detention", "Credit"],
      rows: [
        ["TransOcean Logistics", "JNPT-Bhiwandi", money(48500), "INR 900/hr", "15 days"],
        ["FreshRoute Cold Chain", "Jaipur-Delhi", money(52800), "INR 1200/hr", "30 days"],
        ["Nova Electronics", "Peenya-Whitefield", money(42600), "INR 800/hr", "21 days"],
      ],
    },
    automations: [
      "Auto-apply detention from GPS waiting time.",
      "Validate invoice amount against approved rate card.",
      "Attach POD, GPS trail, and expense proof to billing pack.",
    ],
    reports: ["Rate card report", "Detention report", "Billing error report", "GST invoice register"],
  },
};

export const safetyModules: Record<string, ERPModuleConfig> = {
  "safety-events": {
    eyebrow: "AI Safety",
    title: "Safety Events Review",
    description:
      "Review DMS and ADAS events, classify severity, attach clips, coach drivers, and close evidence with audit trail.",
    primaryAction: { label: "Open command center", href: "/command-center" },
    secondaryActions: [
      { label: "Safety center", href: "/safety-center" },
      { label: "Incident clips", href: "/incidentclips" },
    ],
    metrics: [
      { label: "Events today", value: 18, hint: "DMS and ADAS" },
      { label: "Critical", value: 2, hint: "Immediate action", tone: "rose" },
      { label: "Coaching due", value: 7, hint: "Driver follow-up", tone: "amber" },
      { label: "Closed", value: "82%", hint: "Review completion", tone: "emerald" },
    ],
    workflows: [
      { title: "Event verification", owner: "Safety", status: "Live", due: "Within 2 hrs" },
      { title: "Clip tagging", owner: "Command center", status: "Auto", due: "On event" },
      { title: "Driver coaching", owner: "Fleet manager", status: "Open", due: "Before next trip" },
      { title: "Insurance evidence", owner: "Claims", status: "Ready", due: "On request" },
    ],
    table: {
      title: "Safety Event Queue",
      columns: ["Event", "Vehicle", "Driver", "Severity", "Action"],
      rows: [
        ["Forward collision", "MH04XY5678", "Rajesh Patil", "Critical", "Coach + evidence"],
        ["Driver distraction", "KA01TR8842", "Mohan Reddy", "High", "Restrict night duty"],
        ["Harsh braking", "MH12PQ7890", "Aniket Jadhav", "Medium", "Review clip"],
      ],
    },
    automations: [
      "Create coaching task after critical event.",
      "Attach GPS and video evidence to event packet.",
      "Update driver safety score after event closure.",
    ],
    reports: ["Safety event register", "Driver coaching report", "Incident evidence pack", "Safety trend"],
  },
  incidentclips: {
    eyebrow: "AI Safety",
    title: "Incident Clips & Evidence Vault",
    description:
      "Search, tag, export, and review incident clips with vehicle, driver, GPS, severity, and claims metadata.",
    primaryAction: { label: "Video search", href: "/video-search" },
    secondaryActions: [
      { label: "Video archive", href: "/video-archive" },
      { label: "Safety events", href: "/safety-events" },
    ],
    metrics: [
      { label: "Clips", value: 128, hint: "Stored events" },
      { label: "Evidence ready", value: 22, hint: "Claims export", tone: "emerald" },
      { label: "Needs review", value: 9, hint: "Safety manager", tone: "amber" },
      { label: "Critical clips", value: 4, hint: "Do not delete", tone: "rose" },
    ],
    workflows: [
      { title: "Clip ingestion", owner: "AI camera", status: "Auto", due: "On event" },
      { title: "Evidence tagging", owner: "Safety", status: "Open", due: "Same day" },
      { title: "Customer or insurance export", owner: "Claims", status: "Ready", due: "On demand" },
      { title: "Retention policy", owner: "Admin", status: "Auto", due: "90 days" },
    ],
    table: {
      title: "Clip Review Queue",
      columns: ["Clip", "Vehicle", "Event", "Status", "Action"],
      rows: [
        ["CLP-881", "MH04XY5678", "Forward collision", "Critical", "Export evidence"],
        ["CLP-882", "KA01TR8842", "Phone use", "Review", "Coach driver"],
        ["CLP-883", "RJ14BT4501", "Camera obstruction", "Open", "Check device"],
      ],
    },
    automations: [
      "Auto-save clip before and after critical event.",
      "Watermark exports with vehicle, driver, GPS, and timestamp.",
      "Link incident clip to driver coaching history.",
    ],
    reports: ["Clip archive", "Evidence export", "Driver clip history", "Claims packet"],
  },
  "video-archive": {
    eyebrow: "AI Safety",
    title: "Video Archive & Retention",
    description:
      "Store route video, incident footage, driver cabin clips, evidence exports, retention policies, and customer/claims proof.",
    primaryAction: { label: "Search video", href: "/video-search" },
    secondaryActions: [
      { label: "Request clip", href: "/video-requests" },
      { label: "Incident clips", href: "/incidentclips" },
    ],
    metrics: [
      { label: "Stored clips", value: 1280, hint: "Rolling archive" },
      { label: "Evidence locked", value: 42, hint: "Cannot purge", tone: "emerald" },
      { label: "Review pending", value: 16, hint: "Safety team", tone: "amber" },
      { label: "Storage risk", value: "11%", hint: "Capacity left", tone: "rose" },
    ],
    workflows: [
      { title: "Archive by vehicle and date", owner: "System", status: "Auto", due: "Continuous" },
      { title: "Incident lock", owner: "Safety", status: "Auto", due: "On event" },
      { title: "Export approval", owner: "Owner", status: "Approval", due: "On request" },
      { title: "Retention cleanup", owner: "Admin", status: "Scheduled", due: "Monthly" },
    ],
    table: {
      title: "Archive Index",
      columns: ["Vehicle", "Date", "Type", "Status", "Action"],
      rows: [
        ["MH04XY5678", "2026-06-30", "Road + cabin", "Locked", "Export"],
        ["KA01TR8842", "2026-06-30", "DMS event", "Review", "Tag"],
        ["MH12PQ7890", "2026-06-29", "Route video", "Archived", "Search"],
      ],
    },
    automations: [
      "Lock footage around critical safety events.",
      "Purge normal route video after retention window.",
      "Watermark exported clips with vehicle and GPS metadata.",
    ],
    reports: ["Archive register", "Evidence export log", "Storage report", "Clip retention report"],
  },
  "video-search": {
    eyebrow: "AI Safety",
    title: "Video Search & Evidence Discovery",
    description:
      "Find video by vehicle, driver, date, route, event type, severity, GPS location, and customer trip reference.",
    primaryAction: { label: "Open archive", href: "/video-archive" },
    secondaryActions: [
      { label: "Request video", href: "/video-requests" },
      { label: "Safety events", href: "/safety-events" },
    ],
    metrics: [
      { label: "Searchable days", value: 90, hint: "Retention window" },
      { label: "Tagged events", value: 327, hint: "AI indexed" },
      { label: "Exports today", value: 6, hint: "Evidence packs", tone: "emerald" },
      { label: "Pending requests", value: 11, hint: "Ops queue", tone: "amber" },
    ],
    workflows: [
      { title: "Search by trip or vehicle", owner: "Ops", status: "Live", due: "On request" },
      { title: "AI event filter", owner: "System", status: "Auto", due: "Instant" },
      { title: "Clip export approval", owner: "Owner", status: "Approval", due: "Before share" },
      { title: "Evidence packet generation", owner: "Claims", status: "Ready", due: "On export" },
    ],
    table: {
      title: "Recent Search Results",
      columns: ["Vehicle", "Time", "Match", "Severity", "Action"],
      rows: [
        ["MH04XY5678", "10:39 AM", "Forward collision", "Critical", "Export"],
        ["KA01TR8842", "10:42 AM", "Phone use", "High", "Coach"],
        ["RJ14BT4501", "10:18 AM", "Camera obstruction", "Medium", "Inspect"],
      ],
    },
    automations: [
      "Index clips by AI event, vehicle, driver, route, and trip.",
      "Attach selected video to incident and customer billing packs.",
      "Log every export for audit and privacy control.",
    ],
    reports: ["Search audit", "Export log", "Event match report", "Evidence packet"],
  },
  "video-requests": {
    eyebrow: "AI Safety",
    title: "Video Request Desk",
    description:
      "Manage customer, claims, police, owner, and safety-team requests for specific trip or incident footage.",
    primaryAction: { label: "Search video", href: "/video-search" },
    secondaryActions: [
      { label: "Archive", href: "/video-archive" },
      { label: "Incident clips", href: "/incidentclips" },
    ],
    metrics: [
      { label: "Open requests", value: 11, hint: "Across teams" },
      { label: "SLA breach risk", value: 2, hint: "Due soon", tone: "rose" },
      { label: "Approved", value: 7, hint: "Ready to export", tone: "emerald" },
      { label: "Rejected", value: 1, hint: "Access denied" },
    ],
    workflows: [
      { title: "Request creation", owner: "Ops", status: "Live", due: "On demand" },
      { title: "Approval and privacy check", owner: "Owner", status: "Approval", due: "Before export" },
      { title: "Clip retrieval", owner: "Command center", status: "Open", due: "Within SLA" },
      { title: "Secure handoff", owner: "Claims", status: "Ready", due: "After approval" },
    ],
    table: {
      title: "Video Request Queue",
      columns: ["Request", "Vehicle", "Requester", "SLA", "Action"],
      rows: [
        ["VR-1088", "MH04XY5678", "Claims", "2 hrs", "Approve export"],
        ["VR-1089", "KA01TR8842", "Safety", "Today", "Retrieve clip"],
        ["VR-1090", "MH12PQ7890", "Customer", "Tomorrow", "Verify trip"],
      ],
    },
    automations: [
      "Require owner approval before external video sharing.",
      "Track SLA for every clip request.",
      "Attach export logs to request history.",
    ],
    reports: ["Video request register", "SLA report", "Approval audit", "External sharing log"],
  },
  "driver-score": {
    eyebrow: "AI Safety",
    title: "Driver Safety Score & Coaching",
    description:
      "Score drivers from DMS, ADAS, harsh events, route discipline, speed behavior, fatigue, and coaching closure.",
    primaryAction: { label: "Open drivers", href: "/drivers" },
    secondaryActions: [
      { label: "Safety events", href: "/safety-events" },
      { label: "Risk engine", href: "/risk-engine" },
    ],
    metrics: [
      { label: "Fleet score", value: "86/100", hint: "Weighted average" },
      { label: "Top drivers", value: 12, hint: "Eligible incentive", tone: "emerald" },
      { label: "Coaching due", value: 7, hint: "Before next dispatch", tone: "amber" },
      { label: "Restricted", value: 2, hint: "High-risk duty block", tone: "rose" },
    ],
    workflows: [
      { title: "Event scoring", owner: "System", status: "Auto", due: "On event" },
      { title: "Coaching assignment", owner: "Safety", status: "Open", due: "Same day" },
      { title: "Incentive approval", owner: "Owner", status: "Monthly", due: "Month end" },
      { title: "Dispatch restriction", owner: "Dispatch", status: "Auto", due: "Before trip" },
    ],
    table: {
      title: "Driver Scoreboard",
      columns: ["Driver", "Score", "Events", "Status", "Action"],
      rows: [
        ["Imran Shaikh", "94", "0", "Excellent", "Reward"],
        ["Rajesh Patil", "91", "2", "Good", "Coach ADAS"],
        ["Mohan Reddy", "78", "3", "Risk", "Restrict night duty"],
      ],
    },
    automations: [
      "Update score after every verified event.",
      "Generate coaching tasks for low-score drivers.",
      "Calculate incentive from safe trips and low violations.",
    ],
    reports: ["Driver scorecard", "Coaching report", "Incentive report", "Violation trend"],
  },
  "violation-history": {
    eyebrow: "AI Safety",
    title: "Violation History & Enforcement",
    description:
      "Track repeat violations, coaching closure, penalties, driver acknowledgements, and safety improvement trend.",
    primaryAction: { label: "Safety events", href: "/safety-events" },
    secondaryActions: [
      { label: "Driver score", href: "/driver-score" },
      { label: "Risk engine", href: "/risk-engine" },
    ],
    metrics: [
      { label: "Violations", value: 327, hint: "All-time events" },
      { label: "Repeat drivers", value: 6, hint: "Needs intervention", tone: "amber" },
      { label: "Critical", value: 18, hint: "Evidence locked", tone: "rose" },
      { label: "Improved", value: "31%", hint: "After coaching", tone: "emerald" },
    ],
    workflows: [
      { title: "Violation verification", owner: "Safety", status: "Live", due: "Daily" },
      { title: "Driver acknowledgement", owner: "Fleet manager", status: "Open", due: "Before salary" },
      { title: "Penalty or incentive update", owner: "Accounts", status: "Monthly", due: "Payroll" },
      { title: "Trend review", owner: "Owner", status: "Weekly", due: "Monday" },
    ],
    table: {
      title: "Violation Register",
      columns: ["Driver", "Vehicle", "Violation", "Repeat", "Action"],
      rows: [
        ["Mohan Reddy", "KA01TR8842", "Phone use", "3", "Coaching + restriction"],
        ["Rajesh Patil", "MH04XY5678", "Following distance", "2", "ADAS coaching"],
        ["Aniket Jadhav", "MH12PQ7890", "Harsh braking", "1", "Review clip"],
      ],
    },
    automations: [
      "Escalate repeat violations to owner.",
      "Attach violation trend to driver salary incentives.",
      "Block high-risk driver from sensitive loads.",
    ],
    reports: ["Violation register", "Repeat offender report", "Penalty report", "Coaching closure"],
  },
};
