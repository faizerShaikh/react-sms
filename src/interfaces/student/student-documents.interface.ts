import { BaseObjectInterface } from "@/interfaces";

export interface StudentLeavingCertificateInterface
  extends BaseObjectInterface {
  student_id: string;
  last_attended_standard: string;
  studying_in_standard_since: string;
  progress: string;
  conduct: string;
  date_of_leaving: string;
  reason_of_leaving: string;
  remark: string;
  certificate_number: string;
}

export interface StudentBonafideInterface extends BaseObjectInterface {
  student_id: string;
  reason: string;
}
