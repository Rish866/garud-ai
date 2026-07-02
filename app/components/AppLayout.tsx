"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navSections = [
  {
    title: "Start Here",
    items: [
      { name: "ERP Home", href: "/start", icon: "GO" },
      { name: "Dashboard", href: "/dashboard", icon: "DB" },
      { name: "Control Tower", href: "/control-tower", icon: "ISS" },
      { name: "GARUD Agent", href: "/garud-agent", icon: "AI" },
    ],
  },
  {
    title: "Master Data",
    items: [
      { name: "Vehicles", href: "/vehicles", icon: "TRK" },
      { name: "Drivers", href: "/drivers", icon: "DRV" },
      { name: "Customers", href: "/customers", icon: "CUS" },
      { name: "Documents", href: "/document-center", icon: "DOC" },
    ],
  },
  {
    title: "Trip Operations",
    items: [
      { name: "Trips", href: "/trips", icon: "TRP" },
      { name: "Route Planner", href: "/route-planner", icon: "RT" },
      { name: "TMS Lifecycle", href: "/tms", icon: "TMS" },
      { name: "Customer Portal", href: "/customer-portal", icon: "PORT" },
      { name: "Trip Expenses", href: "/trip-expenses", icon: "EXP" },
    ],
  },
  {
    title: "Money",
    items: [
      { name: "Invoices", href: "/invoices", icon: "INV" },
      { name: "Payments", href: "/payments", icon: "PMT" },
      { name: "Receivables", href: "/receivables", icon: "REC" },
      { name: "Accounting", href: "/accounting", icon: "ACC" },
      { name: "Fuel", href: "/fuel-management", icon: "FUEL" },
      { name: "Driver Salary", href: "/driver-salary", icon: "PAY" },
      { name: "Billing Packs", href: "/billing-packs", icon: "POD" },
      { name: "Statements", href: "/financial-statements", icon: "BS" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { name: "Inventory Management", href: "/inventory-management", icon: "STK" },
    ],
  },
  {
    title: "Workshop & Compliance",
    items: [
      { name: "Maintenance", href: "/maintenance-center", icon: "MNT" },
      { name: "Tyres", href: "/tyre-management", icon: "TYR" },
      { name: "Document Alerts", href: "/document-alerts", icon: "DUE" },
      { name: "Profitability", href: "/profitability", icon: "ROI" },
    ],
  },
  {
    title: "AI Safety & Video",
    items: [
      { name: "Live Dashcam", href: "/live-dashcam", icon: "LIVE" },
      { name: "Safety Events", href: "/safety-events", icon: "AI" },
      { name: "Video Search", href: "/video-search", icon: "SEA" },
      { name: "Video Requests", href: "/video-requests", icon: "REQ" },
      { name: "AI Risk Engine", href: "/risk-engine", icon: "RISK" },
    ],
  },
  {
    title: "Reports & Admin",
    items: [
      { name: "Reports", href: "/reports", icon: "RPT" },
      { name: "Integrations", href: "/integrations", icon: "API" },
      { name: "Settings", href: "/settings", icon: "SET" },
      { name: "All ERP Modules", href: "/erp-architecture", icon: "ERP" },
    ],
  },
];

const quickActions = [
  { name: "Add vehicle", href: "/vehicles", icon: "TRK" },
  { name: "Add driver", href: "/drivers", icon: "DRV" },
  { name: "Add customer", href: "/customers", icon: "CUS" },
  { name: "Create trip", href: "/trips", icon: "TRP" },
  { name: "Raise invoice", href: "/invoices", icon: "INV" },
  { name: "Upload docs", href: "/document-center", icon: "DOC" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [tenantBrand, setTenantBrand] = useState<{
    company_name?: string | null;
    transporter_type?: string | null;
    logo_url?: string | null;
    brand_color?: string | null;
    portal_title?: string | null;
    workflow_template?: string | null;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        const result = await response.json();

        if (mounted) {
          setIsSuperAdmin(Boolean(result.session?.isSuperAdmin));
          setTenantBrand(result.session?.tenantBrand || null);
        }
      } catch {
        if (mounted) {
          setIsSuperAdmin(false);
          setTenantBrand(null);
        }
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  const portalTitle = isSuperAdmin
    ? "GARUD AI"
    : tenantBrand?.portal_title || tenantBrand?.company_name || "GARUD AI";
  const portalSubtitle = isSuperAdmin
    ? "Transport OS"
    : tenantBrand?.transporter_type
        ?.replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Customer ERP";
  const brandColor = tenantBrand?.brand_color || "#22d3ee";
  const logoUrl = tenantBrand?.logo_url || "/logo.png";

  return (
    <div className="flex min-h-screen bg-[#05070d] text-white">
      <aside className="sticky top-0 hidden h-screen w-96 shrink-0 overflow-y-auto border-r border-white/10 bg-[#07111f]/95 xl:block">
        <div className="border-b border-white/10 p-6">
          <Link href="/dashboard" className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-cyan-400/20 bg-white shadow-lg shadow-cyan-950/30">
              {tenantBrand?.logo_url ? (
                <img
                  src={logoUrl}
                  alt={portalTitle}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="GARUD AI"
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                  priority
                />
              )}
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                {portalTitle}
              </h1>
              <p className="mt-1 text-sm font-semibold" style={{ color: brandColor }}>
                {portalSubtitle}
              </p>
              <p className="mt-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
                {isSuperAdmin ? "ERP + AI Safety" : "Powered by GARUD AI"}
              </p>
            </div>
          </Link>
        </div>

        <nav className="space-y-6 p-5">
          <SidebarNav isSuperAdmin={isSuperAdmin} />
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/90 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">{portalTitle}</h2>
              <p className="text-sm text-slate-400">
                {isSuperAdmin
                  ? "Start, dispatch, finance, compliance, GPS, and AI safety"
                  : `${portalSubtitle} workspace managed on GARUD AI`}
              </p>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <TopBarAdminActions isSuperAdmin={isSuperAdmin} />
              <Link
                href="/garud-agent"
                className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
              >
                GARUD Agent
              </Link>

              <Link
                href="/live-dashcam"
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10"
              >
                Live dashcam
              </Link>

              <div className="rounded-md bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                System Online
              </div>

              <a
                href="/api/auth/logout"
                className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Logout
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const pathname = usePathname();
  const sections = isSuperAdmin
    ? [
        {
          title: "Super Admin",
          items: [
            { name: "Super Admin", href: "/super-admin", icon: "SA" },
            { name: "Onboard Customer", href: "/onboarding", icon: "NEW" },
          ],
        },
        ...navSections,
      ]
    : navSections;

  return (
    <>
      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
          Quick Add
        </p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-lg border border-cyan-300/10 bg-slate-950/60 px-3 py-2 text-xs font-bold text-slate-200 hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              <span className="mr-2 text-cyan-300">{action.icon}</span>
              {action.name}
            </Link>
          ))}
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            {section.title}
          </p>

          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                  pathname === item.href
                    ? "border-cyan-400/30 bg-cyan-400/15 text-white"
                    : "border-transparent text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
                }`}
              >
                <span className="flex h-7 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-950 text-[10px] font-black text-cyan-300">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function TopBarAdminActions({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  if (!isSuperAdmin) {
    return null;
  }

  return (
    <Link
      href="/super-admin"
      className="rounded-md border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-800 hover:bg-cyan-100"
    >
      Super Admin
    </Link>
  );
}
