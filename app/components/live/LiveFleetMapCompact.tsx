import type { Vehicle } from "../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveFleetMapCompact({ selectedVehicle }: Props) {
  const lat = Number(selectedVehicle?.latitude);
  const lng = Number(selectedVehicle?.longitude);

  const hasGps = Number.isFinite(lat) && Number.isFinite(lng);

  const defaultLat = hasGps ? lat : 19.076;
  const defaultLng = hasGps ? lng : 72.8777;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    defaultLng - 0.08
  }%2C${defaultLat - 0.08}%2C${defaultLng + 0.08}%2C${
    defaultLat + 0.08
  }&layer=mapnik&marker=${defaultLat}%2C${defaultLng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div>
          <h2 className="text-lg font-bold text-white">Live Map</h2>
          <p className="text-sm text-slate-400">Selected vehicle location</p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
          {hasGps ? "GPS Active" : "Default"}
        </span>
      </div>

      <div className="h-[320px] bg-slate-950">
        <iframe
          key={`${defaultLat}-${defaultLng}`}
          title="GARUD AI Compact Map"
          src={mapSrc}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}