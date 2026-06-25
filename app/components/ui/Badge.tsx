type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "yellow" | "red" | "slate";
};

const tones = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  red: "bg-red-500/10 text-red-400",
  slate: "bg-slate-700 text-slate-300",
};

export default function Badge({ children, tone = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}