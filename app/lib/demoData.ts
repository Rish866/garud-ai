export type DemoVehicle = {
  id: number;
  vehicle_number: string;
  driver_id?: number;
  customer_id?: number;
  driver_name?: string;
  status: string;
  latitude: number;
  longitude: number;
  location: string;
  speed: number;
  cameras: number;
  alerts: number;
  route: string;
  mode: string;
  health: number;
};

export type DemoDriver = {
  id: number;
  name: string;
  phone?: string;
  safety_score?: number;
  status?: string;
};

export type DemoCustomer = {
  id: number;
  company_name: string;
  contact_person?: string;
  city?: string;
};

export type DemoTrip = {
  id: number;
  origin: string;
  destination: string;
  revenue: number;
  expenses?: number;
  profit?: number;
  distanceKm?: number;
  eta?: string;
  status: string;
  vehicle_id?: number;
  driver_id?: number;
  customer_id?: number;
};

export const demoVehicles: DemoVehicle[] = [
  {
    id: 101,
    vehicle_number: "MH04XY5678",
    driver_id: 1,
    customer_id: 1,
    driver_name: "Rajesh Patil",
    status: "active",
    latitude: 19.037,
    longitude: 73.029,
    location: "JNPT Gate 2, Navi Mumbai",
    speed: 42,
    cameras: 4,
    alerts: 2,
    route: "JNPT to Bhiwandi",
    mode: "Container",
    health: 92,
  },
  {
    id: 102,
    vehicle_number: "MH12PQ7890",
    driver_id: 2,
    customer_id: 2,
    driver_name: "Aniket Jadhav",
    status: "active",
    latitude: 18.596,
    longitude: 73.738,
    location: "Pune Bypass",
    speed: 61,
    cameras: 4,
    alerts: 1,
    route: "Chakan to Talegaon",
    mode: "Auto Parts",
    health: 88,
  },
  {
    id: 103,
    vehicle_number: "GJ05LM2210",
    driver_id: 3,
    customer_id: 3,
    driver_name: "Imran Shaikh",
    status: "idle",
    latitude: 19.105,
    longitude: 72.902,
    location: "Sakinaka Hub",
    speed: 0,
    cameras: 4,
    alerts: 0,
    route: "Mumbai Local Distribution",
    mode: "FMCG",
    health: 95,
  },
  {
    id: 104,
    vehicle_number: "KA01TR8842",
    driver_id: 4,
    customer_id: 4,
    driver_name: "Mohan Reddy",
    status: "active",
    latitude: 12.971,
    longitude: 77.594,
    location: "Bengaluru Outer Ring Road",
    speed: 34,
    cameras: 4,
    alerts: 3,
    route: "Peenya to Whitefield",
    mode: "Electronics",
    health: 81,
  },
  {
    id: 105,
    vehicle_number: "RJ14BT4501",
    driver_id: 5,
    customer_id: 5,
    driver_name: "Vikas Sharma",
    status: "maintenance",
    latitude: 26.912,
    longitude: 75.787,
    location: "Jaipur Workshop",
    speed: 0,
    cameras: 2,
    alerts: 1,
    route: "Jaipur to Delhi NCR",
    mode: "Reefer",
    health: 67,
  },
];

export const demoDrivers: DemoDriver[] = [
  { id: 1, name: "Rajesh Patil", phone: "9876501001", safety_score: 91, status: "on trip" },
  { id: 2, name: "Aniket Jadhav", phone: "9876501002", safety_score: 86, status: "on trip" },
  { id: 3, name: "Imran Shaikh", phone: "9876501003", safety_score: 94, status: "standby" },
  { id: 4, name: "Mohan Reddy", phone: "9876501004", safety_score: 78, status: "on trip" },
  { id: 5, name: "Vikas Sharma", phone: "9876501005", safety_score: 82, status: "maintenance" },
];

export const demoCustomers: DemoCustomer[] = [
  { id: 1, company_name: "TransOcean Logistics", contact_person: "Neha Mehta", city: "Mumbai" },
  { id: 2, company_name: "Bharat Auto Components", contact_person: "Karan Shah", city: "Pune" },
  { id: 3, company_name: "MetroMart Retail", contact_person: "Priya Nair", city: "Mumbai" },
  { id: 4, company_name: "Nova Electronics", contact_person: "Arjun Rao", city: "Bengaluru" },
  { id: 5, company_name: "FreshRoute Cold Chain", contact_person: "Sahil Jain", city: "Jaipur" },
];

export const demoTrips: DemoTrip[] = [
  {
    id: 9001,
    origin: "JNPT Port",
    destination: "Bhiwandi Warehouse",
    revenue: 48500,
    expenses: 31600,
    profit: 16900,
    distanceKm: 78,
    eta: "12:35 PM",
    status: "running",
    vehicle_id: 101,
    driver_id: 1,
    customer_id: 1,
  },
  {
    id: 9002,
    origin: "Chakan Plant",
    destination: "Talegaon Vendor Park",
    revenue: 31200,
    expenses: 21400,
    profit: 9800,
    distanceKm: 54,
    eta: "Delivered",
    status: "completed",
    vehicle_id: 102,
    driver_id: 2,
    customer_id: 2,
  },
  {
    id: 9003,
    origin: "Sakinaka Hub",
    destination: "Thane Retail Cluster",
    revenue: 18750,
    expenses: 12600,
    profit: 6150,
    distanceKm: 31,
    eta: "Delivered",
    status: "completed",
    vehicle_id: 103,
    driver_id: 3,
    customer_id: 3,
  },
  {
    id: 9004,
    origin: "Peenya Industrial Area",
    destination: "Whitefield DC",
    revenue: 42600,
    expenses: 30950,
    profit: 11650,
    distanceKm: 68,
    eta: "01:10 PM",
    status: "running",
    vehicle_id: 104,
    driver_id: 4,
    customer_id: 4,
  },
  {
    id: 9005,
    origin: "Jaipur Cold Store",
    destination: "Delhi NCR Hub",
    revenue: 52800,
    expenses: 39200,
    profit: 13600,
    distanceKm: 278,
    eta: "Awaiting loading",
    status: "pending",
    vehicle_id: 105,
    driver_id: 5,
    customer_id: 5,
  },
];

export const commandEvents = [
  {
    title: "Driver distraction",
    vehicle: "KA01TR8842",
    severity: "High",
    time: "10:42 AM",
    detail: "Phone use detected for 7 seconds near ORR service lane.",
  },
  {
    title: "Forward collision risk",
    vehicle: "MH04XY5678",
    severity: "Critical",
    time: "10:39 AM",
    detail: "Following distance dropped below safe threshold at 42 km/h.",
  },
  {
    title: "Harsh braking",
    vehicle: "MH12PQ7890",
    severity: "Medium",
    time: "10:31 AM",
    detail: "Brake spike recorded while entering Pune Bypass merge.",
  },
  {
    title: "Camera obstruction",
    vehicle: "RJ14BT4501",
    severity: "Medium",
    time: "10:18 AM",
    detail: "Cabin camera visibility degraded, evidence clip queued.",
  },
];

export const transporterModes = [
  "Container",
  "Mining",
  "School Bus",
  "FMCG",
  "Cold Chain",
  "Employee Transport",
];

export const transporterKPIs = {
  cashInBank: 824000,
  receivables: 612500,
  payables: 284000,
  fuelSpend: 238000,
  tyreSpend: 74000,
  maintenanceDue: 5,
  documentsExpiring: 9,
  openInvoices: 14,
  margin: 24.8,
  onTimeDelivery: 92,
  utilization: 78,
  emptyKm: 11.6,
};

export const receivableAging = [
  { bucket: "0-15 days", amount: 218000, count: 5, status: "Healthy" },
  { bucket: "16-30 days", amount: 164500, count: 4, status: "Follow up" },
  { bucket: "31-45 days", amount: 121000, count: 3, status: "Escalate" },
  { bucket: "45+ days", amount: 109000, count: 2, status: "Hold credit" },
];

export const complianceQueue = [
  { item: "National permit renewal", vehicle: "RJ14BT4501", due: "3 days", risk: "High" },
  { item: "Fitness certificate", vehicle: "MH12PQ7890", due: "8 days", risk: "Medium" },
  { item: "Insurance renewal", vehicle: "KA01TR8842", due: "12 days", risk: "Medium" },
  { item: "PUC check", vehicle: "GJ05LM2210", due: "18 days", risk: "Low" },
];

export const dispatchBoard = [
  { lane: "JNPT to Bhiwandi", demand: 8, available: 3, rate: 48500, margin: 34 },
  { lane: "Chakan to Talegaon", demand: 5, available: 2, rate: 31200, margin: 31 },
  { lane: "Jaipur to Delhi NCR", demand: 4, available: 1, rate: 52800, margin: 26 },
  { lane: "Peenya to Whitefield", demand: 6, available: 2, rate: 42600, margin: 27 },
];

export const maintenanceQueue = [
  { vehicle: "RJ14BT4501", issue: "Engine temperature spike", priority: "Critical", cost: 42000 },
  { vehicle: "MH12PQ7890", issue: "Front tyre wear at 72%", priority: "High", cost: 18500 },
  { vehicle: "KA01TR8842", issue: "Brake pad inspection", priority: "Medium", cost: 9600 },
  { vehicle: "GJ05LM2210", issue: "Dashcam lens cleaning", priority: "Low", cost: 1200 },
];

export const reportCatalog = [
  {
    title: "Owner Daily Control Report",
    cadence: "Daily",
    output: "Cash, trips, alerts, breakdowns, receivables",
    owner: "Transport owner",
  },
  {
    title: "Vehicle P&L Report",
    cadence: "Weekly",
    output: "Revenue, fuel, driver salary, maintenance, margin",
    owner: "Accounts",
  },
  {
    title: "Driver Coaching Report",
    cadence: "Weekly",
    output: "DMS alerts, harsh events, score trend, action plan",
    owner: "Safety manager",
  },
  {
    title: "Compliance Expiry Report",
    cadence: "Daily",
    output: "Permit, FC, insurance, PUC, tax, document proof",
    owner: "Fleet admin",
  },
  {
    title: "Customer Billing Pack",
    cadence: "Per trip",
    output: "POD, GPS trail, detention, invoice, payment status",
    owner: "Billing team",
  },
  {
    title: "Incident Evidence Pack",
    cadence: "On event",
    output: "Video clip, GPS, driver, vehicle, severity, review log",
    owner: "Claims team",
  },
];

export const monthlyPerformance = [
  { label: "Apr", revenue: 1420000, expense: 1032000, alerts: 94 },
  { label: "May", revenue: 1568000, expense: 1104000, alerts: 81 },
  { label: "Jun", revenue: 1734000, expense: 1189000, alerts: 67 },
  { label: "Jul", revenue: 1882000, expense: 1296000, alerts: 58 },
];
