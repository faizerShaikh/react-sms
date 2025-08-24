import { BaseObjectInterface } from "@/interfaces";

export interface IDCardInterface extends BaseObjectInterface {
  photo: string;
  roll_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  age: number;
  blood_group: string;
  gender: string;
  standard: string;
  academic_year: string;
  fathers_name: string;
  fathers_contact_no: string;
  mothers_name: string;
  mothers_contact_no: string;
  address: string;
  guardians_name_relation: string;
  guardians_contact_no: string;
  student_id: string;
}
