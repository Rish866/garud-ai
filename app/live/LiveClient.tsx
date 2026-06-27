"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "../types/vehicle";
import LiveVehicleSelector from "../components/live/LiveVehicleSelector";
import LiveFleetMap from "../components/live/LiveFleetMap";

type Props = {
  vehicles: Vehicle[];
};

export default function LiveClient({ vehicles }: Props) {
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

  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  const cameras = [
    { ch: "CH1", name: "Front Road Camera", status: "LIVE", ai: "Road AI" },
    { ch: "CH2", name: "Cabin Driver Camera", status: "LIVE", ai: "Driver AI" },
    { ch: "CH3", name: "Left Side Camera", status: "LIVE", ai: "Blind Spot" },
    { ch: "CH4", name: "Rear Camera", status: "OFFLINE", ai: "Rear View" },
  ];

  const aiEvents = [
    { time: "14:23:11", event: "Phone Usage", channel: "CH2", level: "High" },
    { time: "14:18:40", event: "Harsh Brake", channel: "CH1", level: "Medium" },
    { time: "14:02:09", event: "Fatigue Alert", channel: "CH2", level: "High" },
    { time: "13:46:22", event: "Overspeed", channel: "CH1", level: "Medium" },
    { time: "13:15:54", event: "Seat Belt", channel: "CH2", level: "Low" },
  ];

  function handleSearchClips() {
    alert(
      `Searching clips\nVehicle: ${vehicleNumber}\nDate: ${
        playbackDate || "Not selected"
      }\nTime: ${playbackTime || "Not selected"}\nChannel: ${playbackChannel}\nEvent: ${playbackEvent}`
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Live Monitoring Command Center
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            GPS tracking, 4CH dashcam, AI events, playback and evidence export
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi label="Total" value={totalVehicles} />
          <Kpi label="Online" value={onlineVehicles} color="emerald" />
          <Kpi label="Offline" value={offlineVehicles} color="red" />
          <Kpi label="GPS" value={gpsVehicles} color="blue" />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <LiveVehicleSelector
          vehicles={safeVehicles}
          selectedVehicleId={selectedVehicleId}
          onVehicleChange={setSelectedVehicleId}
        />

        <div className="xl:col-span-2">
          <LiveFleetMap selectedVehicle={selectedVehicle} />
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-white">
              4CH Dashcam Wall
            </h2>
            <p className="text-sm text-slate-400">
              {vehicleNumber} live multi-camera monitoring
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge text="REC Ready" />
            <Badge text="AI Active" />
            <Badge text="4CH DVR" />
          </div>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-black md:grid-cols-2">
          {cameras.map((cam) => (
            <div
              key={cam.ch}
              className="relative h-[260px] border border-slate-800 bg-black md:h-[300px]"
            >
              <div className="absolute left-3 top-3 z-10 rounded-lg bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                {cam.ch} · {cam.name}
              </div>

              <div
                className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold ${
                  cam.status === "LIVE"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                ● {cam.status}
              </div>

              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-5xl">📹</div>
                  <p className="font-bold text-white">Stream Placeholder</p>
                  <p className="mt-1 text-xs text-slate-500">
                    RTSP / HLS / WebRTC
                  </p>
                  <p className="mt-2 text-xs text-blue-400">{cam.ai}</p>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-between gap-2">
                <button
                  onClick={() => alert(`${cam.ch} fullscreen`)}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  ⛶ Fullscreen
                </button>

                <button
                  onClick={() => alert(`${cam.ch} snapshot captured`)}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  📸 Snapshot
                </button>

                <button
                  onClick={() => alert(`${cam.ch} clip marked`)}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  🎞 Mark Clip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-1 text-lg font-bold text-white">
            AI Event Timeline
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Click any event to search related evidence
          </p>

          <div className="space-y-3">
            {aiEvents.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setPlaybackTime(item.time.slice(0, 5));
                  setPlaybackChannel(item.channel.toLowerCase());
                  setPlaybackEvent(item.event);
                }}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-left hover:border-blue-500/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.event}</p>
                    <p className="text-sm text-slate-400">
                      {item.time} · {item.channel} · {vehicleNumber}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.level === "High"
                        ? "bg-red-500/10 text-red-400"
                        : item.level === "Medium"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {item.level}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-1 text-lg font-bold text-white">
            Playback & Backdated Clips
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Search recorded evidence by date, time, channel and AI event
          </p>

          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="date"
              value={playbackDate}
              onChange={(e) => setPlaybackDate(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
            />

            <input
              type="time"
              value={playbackTime}
              onChange={(e) => setPlaybackTime(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
            />

            <select
              value={playbackChannel}
              onChange={(e) => setPlaybackChannel(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
            >
              <option value="all">All Channels</option>
              <option value="ch1">CH1 Front</option>
              <option value="ch2">CH2 Cabin</option>
              <option value="ch3">CH3 Left</option>
              <option value="ch4">CH4 Rear</option>
            </select>

            <select
              value={playbackEvent}
              onChange={(e) => setPlaybackEvent(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
            >
              <option value="all">All Events</option>
              <option value="Phone Usage">Phone Usage</option>
              <option value="Fatigue Alert">Fatigue Alert</option>
              <option value="Harsh Brake">Harsh Brake</option>
              <option value="Overspeed">Overspeed</option>
              <option value="Seat Belt">Seat Belt</option>
            </select>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            <button
              onClick={handleSearchClips}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
            >
              Search Clips
            </button>

            <button
              onClick={() => alert("Evidence export request created")}
              className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700"
            >
              Export Evidence
            </button>

            <button
              onClick={() => alert("Clip download started")}
              className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700"
            >
              Download Clip
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="mb-3 flex justify-between text-xs text-slate-400">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>

            <div className="relative h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="absolute left-[18%] h-full w-[18%] bg-emerald-500" />
              <div className="absolute left-[42%] h-full w-[10%] bg-amber-500" />
              <div className="absolute left-[66%] h-full w-[6%] bg-red-500" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <span className="text-emerald-400">■ Normal Recording</span>
              <span className="text-amber-400">■ Warning Event</span>
              <span className="text-red-400">■ Critical Event</span>
            </div>
          </div>
        </div>
      </div>
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
  const classes = {
    slate: "border-slate-800 bg-slate-900 text-white",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    red: "border-red-500/20 bg-red-500/10 text-red-400",
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${classes[color]}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
      {text}
    </span>
  );
}