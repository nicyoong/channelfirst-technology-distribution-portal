import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes with full type safety.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
