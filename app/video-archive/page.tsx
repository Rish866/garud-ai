import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function VideoArchivePage() {
  const {
  data: videos,
  error,
} = await supabase
  .from("video_archive")
  .select("*");

console.log(videos);
console.log(error);

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        📹 Video Archive
      </h1>

      <div className="grid gap-6">

        {videos?.map((video: any) => {

          const vehicle =
            vehicles?.find(
              (v: any) =>
                v.id === video.vehicle_id
            );

          return (
            <div
              key={video.id}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <div className="flex justify-between mb-4">

                <div>
                  <h2 className="text-xl font-bold">
                    {vehicle?.vehicle_number ||
                      `Vehicle #${video.vehicle_id}`}
                  </h2>

                  <p className="text-slate-400">
                    {video.recording_date}
                  </p>

                  <p className="text-slate-400">
                    {video.start_time} → {video.end_time}
                  </p>
                </div>

              </div>

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
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                >
                  ▶ Watch
                </a>

                <a
                  href={video.video_url}
                  download
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  ⬇ Download
                </a>

              </div>
            </div>
          );
        })}

        {videos?.length === 0 && (
          <div className="bg-slate-900 p-6 rounded-xl">
            No videos found.
          </div>
        )}

      </div>
    </AppLayout>
  );
}