"use client";

import { useState } from "react";
import type { Vehicle } from "../../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LivePlayback({ selectedVehicle }: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");

  const vehicleNumber = selectedVehicle?.vehicle_number || "selected vehicle";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Playback & Backdated Clips
        </h2>
        <p className="text-sm text-slate-400">
          Search recorded footage for {vehicleNumber}
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-xs text-slate-400">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-slate-400">
            Channel
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
          >
            <option value="all">All Channels</option>
            <option value="ch1">CH1 Front</option>
            <option value="ch2">CH2 Cabin</option>
            <option value="ch3">CH3 Left</option>
            <option value="ch4">CH4 Rear</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            alert(
              `Searching clips for ${vehicleNumber}\nDate: ${
                selectedDate || "Not selected"
              }\nChannel: ${selectedChannel}`
            )
          }
          className="mt-6 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Search Clips
        </button>

        <button
          type="button"
          onClick={() => alert("Export request created")}
          className="mt-6 rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Export Evidence
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[68%] rounded-full bg-blue-500" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <button
            onClick={() => alert("Playback started")}
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-white hover:bg-slate-700"
          >
            ▶ Play
          </button>

          <button
            onClick={() => alert("Snapshot captured")}
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-white hover:bg-slate-700"
          >
            📸 Snapshot
          </button>

          <button
            onClick={() => alert("Clip download started")}
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-white hover:bg-slate-700"
          >
            ⬇ Download Clip
          </button>

          <button
            onClick={() => alert("Opening fullscreen player")}
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-white hover:bg-slate-700"
          >
            🔍 Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}