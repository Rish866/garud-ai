"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("./Map"),
  { ssr: false }
);

export default function FleetMapClient({
  vehicles,
}: {
  vehicles: any[];
}) {
  return (
    <Map
      vehicles={vehicles}
      selectedVehicle={null}
    />
  );
}