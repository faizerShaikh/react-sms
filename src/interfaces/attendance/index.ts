import { BaseObjectInterface } from "@/interfaces";
import { StudentInterface } from "../student";
import { TeacherInterface } from "../teacher";

export interface AttendancePostInterface {
  classroom: string;
  attendance_date: string;
  present_count: number;
  absent_count: number;
  absent_students: Array<string>;
}

export interface AttendanceMonthlyReportInterface {
  id: string;
  created_on: string;
  updated_on: string;
  is_deleted: boolean;
  name: string;
  data: Array<{
    date: string;
    attendance_marked: boolean;
  }>;
  attribute1: string;
  attribute2: string;
  attribute3: any;
  attribute4: any;
  attribute5: any;
}

export interface GetAttendanceDataParams {
  classroom?: string;
  attendance_date: string;
}

export interface GetAttendanceStatusParams {
  classroom?: string;
  student?: string;
  teacher?: string | null;
  date: string;
}

export interface AttendanceInterface extends BaseObjectInterface {
  student: {
    student_detail: StudentInterface;
    id: string;
  };
  attendance_date: string;
  is_present: boolean;
  classroom: string;
  created_by: string;
}

export interface StudentMonthlyAttendanceInterface extends BaseObjectInterface {
  other_count: number;
  month: string;
  present_count: number;
  absent_count: number;
  total_count: number;
  student: string;
  data_in_percent: number[];
}

export interface CheckInOutTeacherInterface {
  qr?: string;
  current_lat: number;
  current_lon: number;
}

export interface TeacherAttendanceInterface extends BaseObjectInterface {
  attendance_date: string;
  is_present: boolean;
  in_time: string;
  in_latitude: number;
  in_longitude: number;
  out_time: any;
  out_latitude: any;
  out_longitude: any;
  teacher: string;
  work_hours: string;
}

export interface TeacherAttendanceViewInterface
  extends TeacherAttendanceInterface,
    TeacherInterface {}

export interface AttendanceStoreInterface {
  studentAttendancesCache: {
    [key: string]: AttendanceInterface[];
  };
  studentMonthlyAttendanceCache: {
    [key: string]: StudentMonthlyAttendanceInterface;
  };
  classroomAttendanceStatus: Record<string, boolean>;
  teachersAttendanceStatus: Record<string, TeacherAttendanceInterface>;
  teacherAttendanceCache: {
    [key: string]: TeacherAttendanceInterface;
  };
}
