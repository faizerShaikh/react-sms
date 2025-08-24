import { SchoolConfigInterface } from "@/interfaces";
import config from "./config";

export const schoolConfig: SchoolConfigInterface =
  import.meta.env.VITE_SCHOOL_CONFIG_NAME in config
    ? config[import.meta.env.VITE_SCHOOL_CONFIG_NAME]
    : config[import.meta.env.VITE_DEFAULT_CONFIG_NAME];
