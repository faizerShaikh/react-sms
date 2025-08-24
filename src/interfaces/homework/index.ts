import { BaseObjectInterface } from "@/interfaces";
import { HomeworkTypeEnum } from "../../enum";
import { ClassSubjectInterface } from "../classroom";
import { AttachmentInterface } from "../other";
import { StudentInterface } from "../student";

export interface HomeworkInterface extends BaseObjectInterface {
  class_subject: ClassSubjectInterface;
  attachments: Array<AttachmentInterface>;
  homework_id: string;
  submission_date: any;
  title: string;
  type: HomeworkTypeEnum;
  description: string;
  assignments: AssignmentInterface[];
}

export interface HomeworkStoreInterface {
  homeworksCache: Record<string, HomeworkInterface>;
  homework: HomeworkInterface | null;
}

export interface AssignmentInterface extends BaseObjectInterface {
  comments: string;
  homework: string;
  student: StudentInterface;
  assignments: Array<AttachmentInterface>;
}
