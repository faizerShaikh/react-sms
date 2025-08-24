import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";
import { SectionInterface } from "../section";

export interface StandardInterface extends BaseObjectInterface {
  name: string;
  label: string;
  postfix: string;
  section: string | SectionInterface;
  is_active: boolean;
  age_criteria_no_of_years?: number;
  is_available_for_admission: boolean;
  is_aadhaar_required: boolean;
  age_criteria_start_threshold: string;
  age_criteria_end_threshold: string;
  age_criteria_start_date: number;
  age_criteria_start_month: number;
  age_criteria_end_date: number;
  age_criteria_end_month: number;
}

export interface StandardStoreInterface {
  standards: StandardInterface[];
  standardsForFees: StandardInterface[];
}

export interface CreateStandardInterface
  extends Omit<StandardInterface, ExcludeBaseObjectKeys> {}
