import { cx } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "m-0 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-orange",
        className
      )}
    >
      {children}
    </p>
  );
}
