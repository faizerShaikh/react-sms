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

export function downloadFile(path: string, filename: string) {
  let download_path =
    import.meta.env.VITE_MEDIA_FOLDER_URL +
    (path[0] === "/" ? path : `/${path}`);

  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    window.location.href = download_path;
  } else {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", download_path);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("download", filename);
    anchor.click();
  }
}
