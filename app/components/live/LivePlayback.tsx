"use client";

import type { Vehicle } from "../../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
  playbackDate: string;
  playbackTime: string;
  playbackChannel: string;
  playbackEvent: string;
  setPlaybackDate: (value: string) => void;
  setPlaybackTime: (value: string) => void;
  setPlaybackChannel: (value: string) => void;
  setPlaybackEvent: (value: string) => void;
};

export default function LivePlaybackPanel({
  selectedVehicle,
  playbackDate,
  playbackTime,
  playbackChannel,
  playbackEvent,
  setPlaybackDate,
  setPlaybackTime,
  setPlaybackChannel,
  setPlaybackEvent,
}: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  function searchClips() {
    alert(
      `Searching clips\nVehicle: ${vehicleNumber}\nDate: ${
        playbackDate || "Not selected"
      }\nTime: ${playbackTime || "Not selected"}\nChannel: ${playbackChannel}\nEvent: ${playbackEvent}`
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">
          Playback Search
        </h2>
        <p className="text-sm text-slate-400">
          Search backdated clips and evidence
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
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

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={searchClips}
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

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
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

        <div className="mt-4 grid grid-cols-1 gap-2 text-xs md:grid-cols-3">
          <span className="text-emerald-400">■ Normal Recording</span>
          <span className="text-amber-400">■ Warning Event</span>
          <span className="text-red-400">■ Critical Event</span>
        </div>
      </div>
    </div>
  );
}
