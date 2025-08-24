import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";
import { UserInterface } from "../settings";
import { CasteInterface, SubCasteInterface } from "../settings/lovs";

export interface TeacherInterface extends BaseObjectInterface {
  user: UserInterface;
  caste: CasteInterface;
  sub_caste: SubCasteInterface;
  employee_id: string;
  dob: string;
  full_name: string;
  subjects: string;
  class_teacher: string;
  photo: string;
  address: string;
  aadhaar_number: string;
  pan_number: string;
  mother_name: string;
  father_name: string;
  can_delete: boolean;
}

export interface TeacherStoreInterface {
  teachers: TeacherInterface[];
}

export interface CreateTeacherInterface
  extends Omit<TeacherInterface, ExcludeBaseObjectKeys> {}
