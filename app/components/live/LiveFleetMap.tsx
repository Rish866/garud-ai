import type { Vehicle } from "../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveFleetMap({ selectedVehicle }: Props) {
  const lat = Number(selectedVehicle?.latitude);
  const lng = Number(selectedVehicle?.longitude);

  const hasGps = Number.isFinite(lat) && Number.isFinite(lng);

  const defaultLat = hasGps ? lat : 19.076;
  const defaultLng = hasGps ? lng : 72.8777;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    defaultLng - 0.25
  }%2C${defaultLat - 0.25}%2C${defaultLng + 0.25}%2C${
    defaultLat + 0.25
  }&layer=mapnik&marker=${defaultLat}%2C${defaultLng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 p-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Fleet Map
          </h2>

          <p className="text-sm text-slate-400">
            Centered on selected vehicle
          </p>
        </div>

        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          {hasGps ? "GPS Active" : "Default View"}
        </span>
      </div>

      <div className="h-[620px] bg-slate-950">
        <iframe
          key={`${defaultLat}-${defaultLng}`}
          title="GARUD AI Fleet Map"
          src={mapSrc}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}