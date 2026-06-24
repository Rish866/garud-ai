"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function VideoSearchClient() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  const [selectedVehicle, setSelectedVehicle] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [fromTime, setFromTime] =
    useState("");

  const [toTime, setToTime] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: vehicleData } =
      await supabase
        .from("vehicles")
        .select("*");

    const { data: videoData } =
      await supabase
        .from("video_archive")
        .select("*")
        .order("recording_date", {
          ascending: false,
        });

    setVehicles(vehicleData || []);
    setVideos(videoData || []);
    setFilteredVideos(videoData || []);
  }

  function handleSearch() {
    let results = [...videos];

    if (selectedVehicle) {
      const vehicle =
        vehicles.find(
          (v) =>
            v.vehicle_number ===
            selectedVehicle
        );

      if (vehicle) {
        results = results.filter(
          (video) =>
            video.vehicle_id === vehicle.id
        );
      }
    }

    if (fromDate) {
      results = results.filter(
        (video) =>
          video.recording_date >= fromDate
      );
    }

    if (toDate) {
      results = results.filter(
        (video) =>
          video.recording_date <= toDate
      );
    }

    if (fromTime) {
      results = results.filter(
        (video) =>
          video.end_time >= fromTime
      );
    }

    if (toTime) {
      results = results.filter(
        (video) =>
          video.start_time <= toTime
      );
    }

    setFilteredVideos(results);
  }

  return (
    <>
      <div className="bg-slate-900 p-6 rounded-xl mb-8">

        <h2 className="text-xl font-bold mb-4">
          Search Filters
        </h2>

        <div className="grid md:grid-cols-5 gap-4">

          <select
            value={selectedVehicle}
            onChange={(e) =>
              setSelectedVehicle(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          >
            <option value="">
              All Vehicles
            </option>

            {vehicles.map((vehicle) => (
              <option
                key={vehicle.id}
                value={
                  vehicle.vehicle_number
                }
              >
                {vehicle.vehicle_number}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="time"
            value={fromTime}
            onChange={(e) =>
              setFromTime(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="time"
            value={toTime}
            onChange={(e) =>
              setToTime(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          />

        </div>

        <button
          onClick={handleSearch}
          className="mt-4 bg-cyan-600 px-6 py-3 rounded-lg font-bold"
        >
          🔎 Search Videos
        </button>

      </div>

      <div className="grid gap-6">

        {filteredVideos.map((video) => {

          const vehicle =
            vehicles.find(
              (v) =>
                v.id ===
                video.vehicle_id
            );

          return (
            <div
              key={video.id}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <h2 className="text-xl font-bold text-green-400">
                {
                  vehicle?.vehicle_number
                }
              </h2>

              <p className="text-slate-400">
                📅 {video.recording_date}
              </p>

              <p className="text-slate-400 mb-4">
                ⏰ {video.start_time}
                {" → "}
                {video.end_time}
              </p>

              <video
                controls
                className="w-full rounded-lg"
              >
                <source
                  src={video.video_url}
                  type="video/mp4"
                />
              </video>

              <div className="flex gap-4 mt-4">

                <a
                  href={video.video_url}
                  target="_blank"
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  ▶ Watch
                </a>

                <a
                  href={video.video_url}
                  download
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  ⬇ Download
                </a>

              </div>

            </div>
          );
        })}

        {filteredVideos.length === 0 && (
          <div className="bg-slate-900 p-6 rounded-xl">
            No videos found.
          </div>
        )}

      </div>
    </>
  );
}