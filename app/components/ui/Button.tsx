import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  className?: string;
};

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary:
    "border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800",
  danger: "bg-red-600 text-white hover:bg-red-500",
  success: "bg-green-600 text-white hover:bg-green-500",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}