import { SupplementryInfoInterface } from "@/interfaces";

export interface PostSupplementryInfoInterface {
  step: number;
  admission: string;
  student: string;
  supplementary_data: SupplementryInfoInterface;
  is_update: boolean;
}
