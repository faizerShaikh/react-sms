import { BaseObjectInterface } from "@/interfaces";
import { AdmissionInterface } from "../admission";
import { SubCasteInterface } from "../settings/lovs";

export interface StudentInterface extends BaseObjectInterface {
  aadhaar_number: string;
  standard?: string;
  batch?: string;
  gr_number: string;
  udise_id: string;
  full_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  name_as_aadhar: string;
  gender: string;
  nationality: string;
  dob: string;
  place_of_birth: string;
  mother_tongue: string;
  transport_facility_required: boolean;
  caste: string;
  religion: string;
  academic_year: string;
  sub_caste: SubCasteInterface;
  blood_group: string;
  photo: string;
  is_foreigner: boolean;
  is_active: boolean;
  father: string;
  mother: string;
  guardian: string;
  active_admission: AdmissionInterface;
}

export interface StudentImportResponseInterface {
  "id": string;
  "GR NO": string;
  "row_number": string;
  "IS ACTIVE": string;
  "ACADEMIC YEAR": string;
  "TYPE": string;
  "CLASS": string;
  "BATCH": string;
  "DIV": string;
  "FIRST NAME": string;
  "MIDDLE NAME": string;
  "LAST NAME": string;
  "NAME AS PER AADHAR": string;
  "AGE": number;
  "DOB (DD-MM-YYYY)": string;
  "MOTHER TONGUE": string;
  "BIRTH PLACE": string;
  "AADHAR": number;
  "BLOOD GROUP": string;
  "RELIGION": string;
  "CASTE": string;
  "SUB CASTE": string;
  "GENDER": string;
  "TRANSPORT FACILITY": string;
  "NATIONALITY": string;
  "ROLL NO": number;
  "UDISE": number;
  "FATHER'S NAME": string;
  "FATHER EDUCATION": string;
  "FATHER OCCUPATION": string;
  "FATHER DESIGNATION": string;
  "FATHER ANNUAL INCOME": number;
  "FATHER EMAIL": string;
  "CONT NO (FATHER)": number;
  "ALTERNATIVE CONT NO (FATHER)": string;
  "FATHER'S AADHAR NUMBER": string;
  "FATHER'S PAN NUMBER": string;
  "MOTHER'S NAME": string;
  "MOTHER EDUCATION": string;
  "MOTHER OCCUPATION": string;
  "MOTHER DESIGNATION": string;
  "MOTHER ANNUAL INCOME": number;
  "MOTHER EMAIL": string;
  "CONT NO (MOTHER)": number;
  "ALTERNATIVE CONT NO (MOTHER)": string;
  "MOTHER'S AADHAR NUMBER": string;
  "MOTHER'S PAN NUMBER": string;
  "ADDRESS": string;
  "REPORT CARD": string;
  "PERMANENT ADDRESS": string;
  "PREV SCHOOL": string;
  "PREVIOUS CLASS": string;
  "PREVIOUS YEAR PERCENT %": string;
  "REASON OF LEAVING": string;
  "HISTORY OF DISEASE": string;
  "ALLERGY DETAILS": string;
  "MEDICAL REASONS": string;
  "BC": any;
  "MC": any;
  "LC/TC": any;
  "PHOTOS": any;
}

export interface StudentStoreInterface {
  students: StudentInterface[];
  studentCount: number;
  stepCount: number;
  studentImportData: StudentImportResponseInterface[] | null;
  student: StudentInterface | null;
  studentLcData: any | null;
}

export enum GenderOptions {
  "MALE" = "Male",
  "FEMALE" = "Female",
}

export interface StudentLcInterface extends BaseObjectInterface {
  certificate_number: string;
  last_attended_standard: string;
  studying_in_standard_since: string;
  lc_student_id: string;
  admission_standard: string;
  studying_since_standard: string;
  progress: string;
  conduct: string;
  remark: string;
  date_of_leaving: string;
  reason_of_leaving: string;
  student: string;
}
