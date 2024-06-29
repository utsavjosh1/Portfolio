import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single class value.
 * 
 * @param inputs - An array of class values to combine.
 * @returns A class value that is the combination of all the input class values.
 */
export function cn(...inputs: ClassValue[]) {
  let result = "";
  for (const input of inputs) {
    result += `${input} `;
  }
  return result.trim();
}
