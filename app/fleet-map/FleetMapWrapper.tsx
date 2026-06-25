"use client";

import dynamic from "next/dynamic";

type Vehicle = {
  id: number;
  vehicle_number: string;
  make?: string | null;
  model?: string | null;
  status?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

const FleetMapClient = dynamic(() => import("./FleetMapClient"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
      Loading fleet map...
    </div>
  ),
});

export default function FleetMapWrapper({
  vehicles,
  error,
}: {
  vehicles: Vehicle[];
  error?: string;
}) {
  return <FleetMapClient vehicles={vehicles} error={error} />;
}