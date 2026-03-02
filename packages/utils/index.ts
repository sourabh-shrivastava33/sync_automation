export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, "");
}
