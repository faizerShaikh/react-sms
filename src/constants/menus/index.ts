import { MenuItem } from "@/interfaces";
import { AdminMenus } from "./admin.constants";
import { getStudentMenus } from "./student.constants";
import { TeacherMenus } from "./teacher.constants";

const menus: Record<string, MenuItem[] | any> = {
  Admin: AdminMenus,
  Teacher: TeacherMenus,
  Student: getStudentMenus,
};
export { AdminMenus, TeacherMenus, getStudentMenus, menus };
