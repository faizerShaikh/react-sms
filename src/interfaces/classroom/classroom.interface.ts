import { BaseObjectInterface } from "@/interfaces";
import {
  AcademicYearInterface,
  StandardInterface,
  SubjectInterface,
} from "../settings";
import { StudentInterface } from "../student";
import { TeacherInterface } from "../teacher";

export interface ClassSubjectInterface extends BaseObjectInterface {
  subject_teacher: TeacherInterface;
  subject: SubjectInterface;
  name: string;
  homework_count: number;
  division: string;
}
export interface ClassroomInterface extends BaseObjectInterface {
  academic_year: AcademicYearInterface;
  standard: StandardInterface;
  class_subjects: Array<ClassSubjectInterface>;
  altenative_class_teacher: Array<ClassSubjectInterface>;
  class_teacher: TeacherInterface;
  subjects: Array<SubjectInterface>;
  students: Array<StudentInterface>;
  division_id: string;
  division_name: string;
  name: string;
}
