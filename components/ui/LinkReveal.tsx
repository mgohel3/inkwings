import Link from "next/link";
import { cx } from "@/lib/utils";

export function LinkReveal({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cx("underline-reveal font-semibold", className)}>
      {children}
    </Link>
  );
}
