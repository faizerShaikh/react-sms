import { schoolConfig } from "@/configs";

export const BACKEND_DATE_FORMAT = "yyyy-MM-dd";
export const BACKEND_TIME_FORMAT = "HH:mm:ss";
export const BACKEND_DATE_TIME_FORMAT = `yyyy-MM-ddTHH:mm:ss.SSSZ`;
export const FRONTEND_DATE_FORMAT = schoolConfig.formats["date-format"];
export const FRONTEND_TIME_FORMAT = schoolConfig.formats["time-format"];
export const FRONTEND_DATE_TIME_FORMAT = `${FRONTEND_DATE_FORMAT}, ${FRONTEND_TIME_FORMAT}`;
