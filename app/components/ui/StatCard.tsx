import Card from "./Card";

type StatCardProps = {
  title: string;
  value: string;
  note?: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  note,
  color = "text-white",
}: StatCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className={`mt-3 text-3xl font-black ${color}`}>{value}</h2>
      {note && <p className="mt-2 text-sm text-slate-500">{note}</p>}
    </Card>
  );
}