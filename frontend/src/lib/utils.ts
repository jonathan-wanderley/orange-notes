import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrencySymbol(currency: "USD" | "EUR" | "BRL") {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "BRL":
      return "R$";
  }
}

export function getCurrencyForRegion(
  region: string | null
): "USD" | "BRL" | "EUR" {
  if (!region) return "USD";
  switch (region) {
    case "brazil":
      return "BRL";
    case "united_states":
      return "USD";
    case "europe":
      return "EUR";
    default:
      return "USD";
  }
}
