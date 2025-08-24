import { BaseObjectInterface } from "@/interfaces";

export interface PostScheduleInterviewInterface {
  interview_date: string;
  interview_start_time: string;
  interview_end_time: string;
  admission?: string[];
  admissions?: string[];
}
export interface ScheduleInterviewInterface extends BaseObjectInterface {
  interview_date: string;
  interview_start_time: string;
  interview_end_time: string;
  status: string;
  admission: string;
}
