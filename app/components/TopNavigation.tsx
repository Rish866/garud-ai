"use client";

interface TopNavigationProps {
  section: string;
}

export default function TopNavigation({
  section,
}: TopNavigationProps) {
  const menus: Record<string, any[]> = {
    fleet: [
      ["Vehicles", "/vehicles"],
      ["Drivers", "/drivers"],
      ["Customers", "/customers"],
      ["Trips", "/trips"],
      ["Fleet Map", "/fleet-map"],
    ],

    safety: [
      ["Command Center", "/safety-center"],
      ["Live Monitoring", "/live"],
      ["Events", "/safety-events"],
      ["Incident Clips", "/incidentclips"],
      ["Video Archive", "/video-archive"],
      ["Video Search", "/video-search"],
      ["Video Requests", "/video-requests"],
      ["Driver Score", "/driver-score"],
      ["Violations", "/violation-history"],
      ["Risk Engine", "/risk-engine"],
    ],

    compliance: [
      ["Documents", "/document-center"],
      ["Document Alerts", "/document-alerts"],
      ["Maintenance", "/maintenance-center"],
      ["Maintenance Alerts", "/maintenance-alerts"],
      ["Tyres", "/tyre-management"],
    ],

    finance: [
      ["Fuel", "/fuel-management"],
      ["Invoices", "/invoices"],
      ["Payments", "/payments"],
      ["Receivables", "/receivables"],
      ["Profitability", "/profitability"],
      ["Salary", "/driver-salary"],
    ],
  };

  const items = menus[section] || [];

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex gap-4 overflow-x-auto">
      {items.map(([label, href]) => (
        <a
          key={href}
          href={href}
          className="whitespace-nowrap px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition"
        >
          {label}
        </a>
      ))}
    </div>
  );
}