import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface AcademicYearInterface extends BaseObjectInterface {
  name: string;
  start_year: number;
  start_month: number;
  start_month_name: string;
  end_year: number;
  end_month: number;
  end_month_name: string;
  is_active: boolean;
}

export interface AcademicYearStoreInterface {
  academicYears: AcademicYearInterface[];
}

export interface CreateAcademicYearInterface
  extends Omit<AcademicYearInterface, ExcludeBaseObjectKeys> {}
