"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase"; // Ensure this path is correct

const TrackingMap = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
      Loading Live Tracking Dashboard...
    </div>
  ),
});

interface Vehicle {
  id: number;
  name: string;
  plate_number: string;
  latitude: number; // Ensure this matches your DB column
  longitude: number; // Ensure this matches your DB column
  status: string;
  speed: number;
}

export default function TrackingPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    // 1. Fetch initial data from Supabase
    const fetchData = async () => {
      const { data, error } = await supabase.from("vehicles").select("*");
      if (error) console.error("Error fetching vehicles:", error);
      else if (data) setVehicles(data);
    };
    fetchData();

    // 2. Subscribe to real-time changes
    const channel = supabase
      .channel("realtime-vehicles")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "vehicles" },
        (payload) => {
          setVehicles((prev) =>
            prev.map((v) => (v.id === payload.new.id ? (payload.new as Vehicle) : v))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const currentSelected = selectedVehicle
    ? vehicles.find((v) => v.id === selectedVehicle.id) || null
    : null;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-950 text-white">
        <div className="w-80 border-r border-slate-800 bg-slate-900 p-4 flex flex-col gap-4 overflow-y-auto">
          <h1 className="text-xl font-bold">Fleet Tracking</h1>
          <div className="flex flex-col gap-2">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`p-3 rounded-lg border text-left ${
                  currentSelected?.id === vehicle.id ? "bg-blue-600 border-blue-500" : "bg-slate-800 border-slate-700"
                }`}
              >
                <div className="font-semibold">{vehicle.name}</div>
                <div className="text-xs opacity-70">{vehicle.plate_number}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 bg-slate-950">
          <TrackingMap 
            vehicles={vehicles.map(v => ({
                ...v,
                lat: v.latitude, // Map your DB columns to what your map component expects
                lng: v.longitude
            }))} 
            selectedVehicle={currentSelected ? {...currentSelected, lat: currentSelected.latitude, lng: currentSelected.longitude} : null} 
          />
        </div>
      </div>
    </AppLayout>
  );
}