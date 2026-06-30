export type ActionNotification = {
  title: string;
  detail: string;
  href: string;
  tone: "rose" | "amber" | "cyan" | "emerald";
  meta?: string;
};

export const ownerPriorityNotifications: ActionNotification[] = [
  {
    title: "Collect INR 2.18L before dispatch cut-off",
    detail: "Open receivables need collection before more credit is released.",
    href: "/receivables",
    tone: "amber",
    meta: "Finance",
  },
  {
    title: "Hold credit on overdue customers",
    detail: "45+ day outstanding accounts should be blocked before new trips.",
    href: "/customers",
    tone: "rose",
    meta: "Credit",
  },
  {
    title: "Clear RJ14BT4501 maintenance hold",
    detail: "Engine heat must be closed before reefer dispatch.",
    href: "/maintenance-center",
    tone: "rose",
    meta: "Workshop",
  },
  {
    title: "Coach Mohan Reddy before next trip",
    detail: "Driver distraction event requires safety follow-up.",
    href: "/safety-events",
    tone: "amber",
    meta: "AI Safety",
  },
];

export function toneClass(tone: ActionNotification["tone"]) {
  const tones = {
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  };

  return tones[tone];
}
