import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mixColorVar(varName: string, alpha: number | string) {
  return `color-mix(in srgb, var(--${varName}) ${
    typeof alpha === "number" && alpha <= 1
      ? alpha * 100 + "%"
      : typeof alpha === "number" && alpha > 1
      ? alpha + "%"
      : alpha.toString().endsWith("%")
      ? alpha
      : `${alpha} * 100%`
  }, transparent)`;
}
