import { BaseObjectInterface } from "@/interfaces";

export interface GetSchoolConfigItemParams {
  type: SchoolConfigTypeEnum;
}

export enum SchoolConfigTypeEnum {
  "ATTENDANCE_SETTINGS" = "Attendance Settings",
  "SCHOOL_DETAILS" = "School Details",
}

export interface PostSchoolConfigItem {
  type: SchoolConfigTypeEnum;
  data: Record<string, unknown>;
}

export interface SchoolConfigItemInterface
  extends BaseObjectInterface,
    PostSchoolConfigItem {}

export interface ShcoolConfigStoreInterface {
  schoolConfigItems: Record<string, SchoolConfigItemInterface>;
  qrCode: string | null;
}
