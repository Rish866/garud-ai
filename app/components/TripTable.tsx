"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function TripTable({
  trips,
}: {
  trips: any[];
}) {
  const router = useRouter();

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] =
    useState("");
  const [revenue, setRevenue] = useState(0);
  const [status, setStatus] = useState("");

  const startEdit = (trip: any) => {
    setEditingId(trip.id);
    setOrigin(trip.origin);
    setDestination(trip.destination);
    setRevenue(trip.revenue);
    setStatus(trip.status);
  };

  const saveEdit = async () => {
    const { error } = await supabase
      .from("trips")
      .update({
        origin,
        destination,
        revenue,
        status,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId(null);
    router.refresh();
  };

  const deleteTrip = async (
    id: number
  ) => {
    if (!confirm("Delete this trip?"))
      return;

    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left py-3">
            Customer
          </th>
          <th className="text-left py-3">
            Vehicle
          </th>
          <th className="text-left py-3">
            Driver
          </th>
          <th className="text-left py-3">
            Origin
          </th>
          <th className="text-left py-3">
            Destination
          </th>
          <th className="text-left py-3">
            Revenue
          </th>
          <th className="text-left py-3">
            Status
          </th>
          <th className="text-left py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {trips.map((trip) => (
          <tr
            key={trip.id}
            className="border-b border-slate-800"
          >
            <td>
              {trip.customers?.company_name ||
                "-"}
            </td>

            <td>
              {trip.vehicles?.vehicle_number ||
                "-"}
            </td>

            <td>
              {trip.drivers?.name || "-"}
            </td>

            <td>
              {editingId === trip.id ? (
                <input
                  value={origin}
                  onChange={(e) =>
                    setOrigin(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                trip.origin
              )}
            </td>

            <td>
              {editingId === trip.id ? (
                <input
                  value={destination}
                  onChange={(e) =>
                    setDestination(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                trip.destination
              )}
            </td>

            <td>
              {editingId === trip.id ? (
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) =>
                    setRevenue(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                `₹${Number(
                  trip.revenue
                ).toLocaleString()}`
              )}
            </td>

            <td>
              {editingId === trip.id ? (
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                >
                  <option>
                    Pending
                  </option>
                  <option>
                    In Progress
                  </option>
                  <option>
                    Completed
                  </option>
                </select>
              ) : (
                trip.status
              )}
            </td>

            <td className="space-x-2">
              {editingId === trip.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(
                        null
                      )
                    }
                    className="bg-gray-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      startEdit(
                        trip
                      )
                    }
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTrip(
                        trip.id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}