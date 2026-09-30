export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function padStep(n: number) {
  return String(n).padStart(2, "0");
}
