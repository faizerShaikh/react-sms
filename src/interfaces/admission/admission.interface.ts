import { BaseObjectInterface, ScheduleInterviewInterface } from "@/interfaces";
import {
  AdmissionFeesInterface,
  BatchInterface,
  StandardInterface,
  StudentInterface,
} from "@/interfaces";
import { AdmissionStatusEnum } from "../../enum";
import { ParentsInfoInterface } from "../student/parent-info.interface";
import { DocumentsAttachedInterface } from "./documents-attached.inerface";

export interface AdmissionInterface
  extends BaseObjectInterface,
    ParentsInfoInterface {
  student: StudentInterface;
  standard: StandardInterface;
  batch: BatchInterface;
  student_aadhaar: string;
  admission_step: number;
  date_of_application: string | null;
  form_number: string;
  admission_completion_date: any;
  declaration_agreed: boolean;
  status: AdmissionStatusEnum;
  academic_year: string;
  other_documents: DocumentsAttachedInterface;
  phone: string;
  interview: null | ScheduleInterviewInterface;
  total_installments?: string;
  installments_paid?: string;
  is_adm_form_fee_paid: boolean;
  payment_status?: string;
  admissionfeesplan: AdmissionFeesInterface;
}
