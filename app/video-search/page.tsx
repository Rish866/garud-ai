import AppLayout from "../components/AppLayout";
import VideoSearchClient from "../components/VideoSearchClient";

export default function VideoSearchPage() {
  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-cyan-500 mb-8">
        🔎 Video Search
      </h1>

      <VideoSearchClient />
    </AppLayout>
  );
}