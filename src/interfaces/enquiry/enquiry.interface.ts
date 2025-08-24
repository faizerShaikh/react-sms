import { BaseObjectInterface } from "@/interfaces";

export interface EnquiryInterface extends BaseObjectInterface {
  full_name: string;
  mothers_name: string;
  standard: string;
  last_attended_school_name: string;
  board: string;
  dob: string;
  age: number;
  contact_no: string;
  alternate_contact_no: string;
  address: string;
  reference: string;
  additional_info: string;
}
