"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { demoCustomers, demoDrivers, demoVehicles } from "../lib/demoData";
import { supabase } from "../lib/supabase";

type SelectRow = {
  id: number | string;
  company_name?: string;
  vehicle_number?: string;
  name?: string;
};

const geofenceTemplates = [
  "Origin yard",
  "Toll checkpoint",
  "Fuel stop",
  "Customer gate",
  "Unloading point",
];

export default function AddTripForm() {
  const router = useRouter();

  const [customers, setCustomers] = useState<SelectRow[]>(demoCustomers);
  const [vehicles, setVehicles] = useState<SelectRow[]>(demoVehicles);
  const [drivers, setDrivers] = useState<SelectRow[]>(demoDrivers);
  const [createdLocally, setCreatedLocally] = useState(false);

  const [form, setForm] = useState({
    customerId: String(demoCustomers[0].id),
    vehicleId: String(demoVehicles[0].id),
    driverId: String(demoDrivers[0].id),
    loadNumber: "LOAD-1045",
    material: "Commercial goods",
    origin: "JNPT Port",
    destination: "Bhiwandi Warehouse",
    vehicleType: "32 ft container",
    freightRate: 48500,
    fuelAdvance: 12000,
    detentionRate: 900,
    promisedEta: "Today 12:35 PM",
    podRequired: true,
    gpsProofRequired: true,
    status: "Pending",
  });

  useEffect(() => {
    async function loadData() {
      const [{ data: customersData }, { data: vehiclesData }, { data: driversData }] =
        await Promise.all([
          supabase.from("customers").select("*"),
          supabase.from("vehicles").select("*"),
          supabase.from("drivers").select("*"),
        ]);

      if (Array.isArray(customersData) && customersData.length > 0) {
        setCustomers(customersData);
      }

      if (Array.isArray(vehiclesData) && vehiclesData.length > 0) {
        setVehicles(vehiclesData);
      }

      if (Array.isArray(driversData) && driversData.length > 0) {
        setDrivers(driversData);
      }
    }

    loadData();
  }, []);

  function updateField(field: keyof typeof form, value: string | number | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("trips").insert([
      {
        customer_id: Number(form.customerId),
        vehicle_id: Number(form.vehicleId),
        driver_id: Number(form.driverId),
        origin: form.origin,
        destination: form.destination,
        revenue: form.freightRate,
        status: form.status,
      },
    ]);

    if (error) {
      setCreatedLocally(true);
      return;
    }

    router.push("/tms");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {createdLocally && (
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          Supabase insert was not available, so the demo workflow stayed local.
          The TMS screen still shows how this load moves through dispatch, POD,
          billing, and payment.
        </div>
      )}

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 xl:col-span-2">
          <h2 className="text-xl font-bold">Load Booking</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Load number" value={form.loadNumber} onChange={(value) => updateField("loadNumber", value)} />
            <Input label="Material" value={form.material} onChange={(value) => updateField("material", value)} />
            <Select
              label="Customer"
              value={form.customerId}
              onChange={(value) => updateField("customerId", value)}
              options={customers.map((customer) => ({
                value: String(customer.id),
                label: customer.company_name || `Customer ${customer.id}`,
              }))}
            />
            <Input label="Vehicle type" value={form.vehicleType} onChange={(value) => updateField("vehicleType", value)} />
            <Input label="Origin" value={form.origin} onChange={(value) => updateField("origin", value)} />
            <Input label="Destination" value={form.destination} onChange={(value) => updateField("destination", value)} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-xl font-bold">Commercials</h2>
          <div className="mt-5 space-y-4">
            <NumberInput label="Freight rate" value={form.freightRate} onChange={(value) => updateField("freightRate", value)} />
            <NumberInput label="Fuel advance" value={form.fuelAdvance} onChange={(value) => updateField("fuelAdvance", value)} />
            <NumberInput label="Detention / hour" value={form.detentionRate} onChange={(value) => updateField("detentionRate", value)} />
            <Input label="Promised ETA" value={form.promisedEta} onChange={(value) => updateField("promisedEta", value)} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-xl font-bold">Assignment</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Select
              label="Vehicle"
              value={form.vehicleId}
              onChange={(value) => updateField("vehicleId", value)}
              options={vehicles.map((vehicle) => ({
                value: String(vehicle.id),
                label: vehicle.vehicle_number || `Vehicle ${vehicle.id}`,
              }))}
            />
            <Select
              label="Driver"
              value={form.driverId}
              onChange={(value) => updateField("driverId", value)}
              options={drivers.map((driver) => ({
                value: String(driver.id),
                label: driver.name || `Driver ${driver.id}`,
              }))}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(value) => updateField("status", value)}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          </div>

          <div className="mt-5 space-y-3">
            <Check
              label="POD required before invoice"
              checked={form.podRequired}
              onChange={(value) => updateField("podRequired", value)}
            />
            <Check
              label="GPS trail required in billing pack"
              checked={form.gpsProofRequired}
              onChange={(value) => updateField("gpsProofRequired", value)}
            />
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-xl font-bold">Geofence & Billing Proof</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {geofenceTemplates.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-3"
              >
                <p className="text-xs font-bold text-cyan-300">
                  Gate {index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg bg-slate-950/80 p-4">
            <p className="text-sm font-bold text-white">Auto-created outputs</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
              <span>Trip sheet</span>
              <span>Driver duty card</span>
              <span>Billing pack draft</span>
              <span>Geofence plan</span>
              <span>Detention rule</span>
              <span>Customer tracking link</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950"
        >
          Create TMS workflow
        </button>
        <button
          type="button"
          onClick={() => router.push("/tms")}
          className="rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-slate-200"
        >
          View lifecycle
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-950 p-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}
