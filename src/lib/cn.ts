type ClassValue = string | number | null | false | undefined;

export function cn(...args: ClassValue[]): string {
  return args.filter(Boolean).join(" ");
}
