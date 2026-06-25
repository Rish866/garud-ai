import Link from "next/link";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  href?: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  href,
}: DashboardCardProps) {
  const cardContent = (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition
        hover:border-blue-500
        hover:bg-slate-800
      "
    >
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-white">{value}</h2>

      {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );

  if (!href) {
    return cardContent;
  }

  return <Link href={href}>{cardContent}</Link>;
}