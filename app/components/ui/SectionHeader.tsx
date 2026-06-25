import { ReactNode } from "react";

export default function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="mt-2 text-slate-400">{description}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}