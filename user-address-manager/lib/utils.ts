import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormFields(data: Record<string, FormDataEntryValue>) {
  const fields: Record<string, string> = {}
  for (const key of Object.keys(data)) {
    fields[key] = data[key].toString()
  }
  return fields
}


export const formatDate = (date: string | Date, locale: string = "en-US"): string => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
};


export const iso3166Alpha3Pattern = /^[A-Z]{3}$/;
