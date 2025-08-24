import { AcademicYearInterface } from "@/interfaces";

export interface AdminLoginInterface {
  username: string;
  password: string;
}

export interface AdminDataInterface {
  name: string;
  username: string;
  email: string;
  designation: string;
  token: string;
  academic_year?: AcademicYearInterface;
}
