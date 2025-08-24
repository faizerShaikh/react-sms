import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValueByKey(obj: any, key: string) {
  if (!obj || !key) return undefined;

  return key.split(".").reduce((acc, part) => {
    if (acc && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);
}

export function getWithOrdinalSuffix(number: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = number % 100;
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
