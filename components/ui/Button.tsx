import Link from "next/link";
import { cx } from "@/lib/utils";

type Variant = "solid-ink" | "solid-orange" | "outline-ink" | "outline-ink-on-orange";

const variantClasses: Record<Variant, string> = {
  "solid-ink":
    "bg-ink text-paper hover:bg-orange hover:text-white",
  "solid-orange":
    "bg-orange text-white hover:bg-ink hover:text-paper",
  "outline-ink":
    "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-ink-on-orange":
    "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
};

export function Button({
  href,
  children,
  variant = "solid-ink",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = cx(
    "inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold transition-colors duration-200",
    variantClasses[variant],
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
