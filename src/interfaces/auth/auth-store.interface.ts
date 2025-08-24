import { MenuItem, TeacherInterface } from "@/interfaces";
import { ForgotPasswordOTPResponseInterface } from ".";
import { AdminDataInterface } from "./admin-login.interface";
import { StudentDataInterface } from "./student-login.interface";

export interface AuthStoreInterface {
  isLoggedIn: boolean;
  userData: StudentDataInterface | null;
  teacherData: TeacherInterface | null;
  usersData: StudentDataInterface[] | null;
  isAdminLoggedIn: boolean;
  adminUserData: AdminDataInterface | null;
  menuItems: MenuItem[];
  userType: string | null;
  forgotPasswordStep: number;
  forgotPasswordData: ForgotPasswordOTPResponseInterface | null;
  isOTPValid: boolean | null;
}
