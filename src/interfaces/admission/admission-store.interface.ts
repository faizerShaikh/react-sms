import { AdmissionFeesInterface, AdmissionInterface } from "@/interfaces";
import { PostAdmissionStepResponse } from "./children-info.interface";
import { IDCardInterface } from "@/interfaces";

export interface AdmissionStoreInterface {
  currentStep: number;
  admissionIdsData: PostAdmissionStepResponse | null;
  admissionData: null | AdmissionInterface;
  partialAdmissions: AdmissionInterface[];
  interviewScheduledAdmissions: AdmissionInterface[];
  admissionFeesData: AdmissionFeesInterface | null;
  idCardData: IDCardInterface | null;
}
