import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface SubjectInterface extends BaseObjectInterface {
  subject_id: string;
  name: string;
  // standard: StandardInterface;
}

export interface SubjectStoreInterface {
  subjects: SubjectInterface[];
}

export interface CreateSubjectInterface
  extends Omit<SubjectInterface, ExcludeBaseObjectKeys> {}
