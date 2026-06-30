"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "../../types/vehicle";

import LiveVehicleSelector from "../components/live/LiveVehicleSelector";
import LiveTopStatusBar from "../components/live/LiveTopStatusBar";
import LiveCameraWall from "../components/live/LiveCameraWall";
import LiveAIEventsPanel from "../components/live/LiveAIEventsPanel";
import LivePlaybackPanel from "../components/live/LivePlaybackPanel";
import LiveVehicleInfo from "../components/live/LiveVehicleInfo";
import LiveFleetMapCompact from "../components/live/LiveFleetMapCompact";

type Props = {
  vehicles: Vehicle[];
  title?: string;
  subtitle?: string;
};

export default function LiveClient({
  vehicles,
  title = "GARUD AI Live Command Center",
  subtitle = "4CH dashcam monitoring, AI events, playback, vehicle telemetry and GPS",
}: Props) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    safeVehicles.length > 0 ? String(safeVehicles[0].id) : ""
  );

  const [playbackDate, setPlaybackDate] = useState("");
  const [playbackTime, setPlaybackTime] = useState("");
  const [playbackChannel, setPlaybackChannel] = useState("all");
  const [playbackEvent, setPlaybackEvent] = useState("all");

  const selectedVehicle = useMemo(() => {
    return (
      safeVehicles.find(
        (vehicle) => String(vehicle.id) === String(selectedVehicleId)
      ) || safeVehicles[0]
    );
  }, [safeVehicles, selectedVehicleId]);

  const totalVehicles = safeVehicles.length;

  const onlineVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "active"
  ).length;

  const offlineVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "inactive"
  ).length;

  const gpsVehicles = safeVehicles.filter((vehicle) => {
    const lat = Number(vehicle.latitude);
    const lng = Number(vehicle.longitude);

    return Number.isFinite(lat) && Number.isFinite(lng);
  }).length;

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            {title}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi label="Total" value={totalVehicles} />
          <Kpi label="Online" value={onlineVehicles} color="emerald" />
          <Kpi label="Offline" value={offlineVehicles} color="red" />
          <Kpi label="GPS" value={gpsVehicles} color="blue" />
        </div>
      </div>

      <div className="mb-5">
        <LiveTopStatusBar selectedVehicle={selectedVehicle} />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <LiveVehicleSelector
            vehicles={safeVehicles}
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
          />
        </div>

        <div className="xl:col-span-6">
          <LiveCameraWall selectedVehicle={selectedVehicle} />
        </div>

        <div className="xl:col-span-3">
          <LiveAIEventsPanel
            selectedVehicle={selectedVehicle}
            onEventSelect={(event) => {
              setPlaybackTime(event.time.slice(0, 5));
              setPlaybackChannel(event.channel.toLowerCase());
              setPlaybackEvent(event.event);
            }}
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <LivePlaybackPanel
            selectedVehicle={selectedVehicle}
            playbackDate={playbackDate}
            playbackTime={playbackTime}
            playbackChannel={playbackChannel}
            playbackEvent={playbackEvent}
            setPlaybackDate={setPlaybackDate}
            setPlaybackTime={setPlaybackTime}
            setPlaybackChannel={setPlaybackChannel}
            setPlaybackEvent={setPlaybackEvent}
          />
        </div>

        <div className="xl:col-span-4">
          <LiveVehicleInfo selectedVehicle={selectedVehicle} />
        </div>
      </div>

      <LiveFleetMapCompact selectedVehicle={selectedVehicle} />
    </div>
  );
}

function Kpi({
  label,
  value,
  color = "slate",
}: {
  label: string;
  value: number;
  color?: "slate" | "emerald" | "red" | "blue";
}) {
  const styles = {
    slate: "border-slate-800 bg-slate-900 text-white",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    red: "border-red-500/20 bg-red-500/10 text-red-400",
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${styles[color]}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
