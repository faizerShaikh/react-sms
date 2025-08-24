import { ParentsInfoInterface } from "@/interfaces";

export interface PostParentsInfoInterface extends ParentsInfoInterface {
  step: number;
  admission: string;
  student: string;
  is_update?: boolean;
}
