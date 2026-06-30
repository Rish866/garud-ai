export const loadBoard = [
  {
    id: "LOAD-1042",
    customer: "TransOcean Logistics",
    lane: "JNPT Port to Bhiwandi Warehouse",
    material: "Import container",
    rate: 48500,
    vehicleType: "32 ft container",
    status: "Ready to assign",
    margin: 34,
  },
  {
    id: "LOAD-1043",
    customer: "FreshRoute Cold Chain",
    lane: "Jaipur Cold Store to Delhi NCR Hub",
    material: "Frozen food",
    rate: 52800,
    vehicleType: "Reefer",
    status: "Maintenance hold",
    margin: 26,
  },
  {
    id: "LOAD-1044",
    customer: "Nova Electronics",
    lane: "Peenya Industrial Area to Whitefield DC",
    material: "Electronics",
    rate: 42600,
    vehicleType: "Closed body",
    status: "Driver assigned",
    margin: 27,
  },
];

export const tripLifecycle = [
  "Load booked",
  "Rate approved",
  "Vehicle assigned",
  "Driver accepted",
  "Gate-in geofence",
  "Loaded",
  "In transit",
  "Unloaded",
  "POD received",
  "Invoice ready",
  "Payment tracked",
];

export const routePlans = [
  {
    id: "RT-501",
    lane: "JNPT to Bhiwandi",
    distance: 78,
    eta: "2h 35m",
    geofences: ["JNPT Gate 2", "Kalamboli Toll", "Bhiwandi Warehouse"],
    deviation: "None",
    detentionRisk: "Low",
  },
  {
    id: "RT-502",
    lane: "Jaipur to Delhi NCR",
    distance: 278,
    eta: "6h 20m",
    geofences: ["Jaipur Cold Store", "Kotputli Toll", "Delhi NCR Hub"],
    deviation: "Workshop hold",
    detentionRisk: "Medium",
  },
  {
    id: "RT-503",
    lane: "Peenya to Whitefield",
    distance: 68,
    eta: "2h 05m",
    geofences: ["Peenya Yard", "ORR Checkpoint", "Whitefield DC"],
    deviation: "DMS event review",
    detentionRisk: "High",
  },
];

export const controlTowerIssues = [
  {
    id: "ISS-2201",
    title: "Forward collision event requires closure",
    owner: "Safety manager",
    severity: "Critical",
    sla: "42 min left",
    linkedTrip: "9001",
  },
  {
    id: "ISS-2202",
    title: "POD pending for completed delivery",
    owner: "Billing team",
    severity: "High",
    sla: "3 hrs left",
    linkedTrip: "9002",
  },
  {
    id: "ISS-2203",
    title: "Customer crossed 45+ day credit threshold",
    owner: "Accounts",
    severity: "High",
    sla: "Today",
    linkedTrip: "INV-2406-021",
  },
  {
    id: "ISS-2204",
    title: "Vehicle maintenance hold before reefer dispatch",
    owner: "Workshop",
    severity: "Critical",
    sla: "Now",
    linkedTrip: "LOAD-1043",
  },
];

export const driverAppTasks = [
  {
    task: "Accept assigned trip",
    detail: "MH04XY5678 | JNPT to Bhiwandi",
    status: "Pending",
  },
  {
    task: "Upload fuel bill",
    detail: "Required before trip close",
    status: "Open",
  },
  {
    task: "Capture POD",
    detail: "Photo and receiver signature",
    status: "After delivery",
  },
  {
    task: "Safety acknowledgement",
    detail: "Forward collision coaching clip",
    status: "Required",
  },
];

export const customerPortalShipments = [
  {
    shipment: "SHP-7781",
    customer: "TransOcean Logistics",
    trip: "9001",
    status: "In transit",
    eta: "12:35 PM",
    pod: "Pending",
    invoice: "Draft",
  },
  {
    shipment: "SHP-7782",
    customer: "Bharat Auto Components",
    trip: "9002",
    status: "Delivered",
    eta: "Delivered",
    pod: "Approved",
    invoice: "Sent",
  },
  {
    shipment: "SHP-7783",
    customer: "FreshRoute Cold Chain",
    trip: "9005",
    status: "On hold",
    eta: "Awaiting maintenance release",
    pod: "Not started",
    invoice: "Blocked",
  },
];

export const billingPacks = [
  {
    id: "PACK-9001",
    trip: "9001",
    customer: "TransOcean Logistics",
    includes: ["POD", "GPS trail", "Detention log", "Fuel proof", "AI safety summary"],
    status: "POD pending",
  },
  {
    id: "PACK-9002",
    trip: "9002",
    customer: "Bharat Auto Components",
    includes: ["POD", "GPS trail", "Toll receipts", "Invoice PDF"],
    status: "Ready to send",
  },
  {
    id: "PACK-9004",
    trip: "9004",
    customer: "Nova Electronics",
    includes: ["POD", "GPS trail", "Incident note", "Customer ETA log"],
    status: "Review DMS event",
  },
];
