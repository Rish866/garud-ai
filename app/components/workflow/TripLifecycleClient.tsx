"use client";

import { useMemo, useState } from "react";
import { tripLifecycle } from "../../lib/operatingSystemData";

type Trip = {
  id: string | number;
  origin?: string | null;
  destination?: string | null;
  status?: string | null;
  revenue?: number | null;
};

const statusStepMap: Record<string, number> = {
  pending: 0,
  booked: 0,
  assigned: 2,
  "driver accepted": 3,
  loaded: 5,
  "in transit": 6,
  delivered: 7,
  "pod pending": 7,
  "pod received": 8,
  invoiced: 9,
  paid: 10,
  completed: 10,
};

function getStep(status: string | null | undefined) {
  return statusStepMap[String(status || "").trim().toLowerCase()] ?? 0;
}

export default function TripLifecycleClient({ trips }: { trips: Trip[] }) {
  const safeTrips = Array.isArray(trips) ? trips : [];
  const [selectedTripId, setSelectedTripId] = useState(
    safeTrips[0]?.id ? String(safeTrips[0].id) : "",
  );
  const selectedTrip =
    safeTrips.find((trip) => String(trip.id) === selectedTripId) || safeTrips[0];
  const currentStep = getStep(selectedTrip?.status);
  const podReady = currentStep >= 8;

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / tripLifecycle.length) * 100),
    [currentStep]
  );

  if (safeTrips.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-bold text-white">Live Trip Lifecycle</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          No live trip lifecycle is available yet. Add a trip first, then this
          panel will track assignment, transit, POD, invoice, and payment from
          real customer data.
        </p>
        <a
          href="/trips"
          className="mt-5 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
        >
          Add trip
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Live Trip Lifecycle</h2>
          <p className="mt-1 text-sm text-slate-400">
            Tracking real trips from this customer workspace.
          </p>
        </div>
        <div className="rounded-md bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
          {progress}% complete
        </div>
      </div>

      <label className="mt-5 block text-sm font-bold text-slate-300">
        Select trip
        <select
          value={String(selectedTrip?.id || "")}
          onChange={(event) => setSelectedTripId(event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        >
          {safeTrips.map((trip) => (
            <option key={trip.id} value={String(trip.id)}>
              Trip #{trip.id} - {trip.origin || "Origin"} to{" "}
              {trip.destination || "Destination"}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tripLifecycle.map((step, index) => (
          <div
            key={step}
            className={`rounded-lg border p-4 ${
              index <= currentStep
                ? "border-cyan-400/25 bg-cyan-400/10"
                : "border-slate-800 bg-slate-950/80"
            }`}
          >
            <p className="text-xs font-bold text-slate-500">
              Step {index + 1}
            </p>
            <p className="mt-2 font-semibold text-white">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`/trips/${selectedTrip?.id}`}
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950"
        >
          Open trip
        </a>
        <a
          href="/document-center"
          className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200"
        >
          Upload POD
        </a>
        <a
          href="/control-tower"
          className="rounded-md border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-bold text-rose-200"
        >
          Open issues
        </a>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">POD status</p>
          <p className="mt-2 font-black text-white">
            {podReady ? "Received" : "Pending"}
          </p>
        </div>
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">Current status</p>
          <p className="mt-2 font-black text-white">
            {selectedTrip?.status || "Pending"}
          </p>
        </div>
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">Next billing action</p>
          <p className="mt-2 font-black text-white">
            {podReady ? "Generate invoice" : "Wait for POD"}
          </p>
        </div>
      </div>
    </div>
  );
}
