import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface FeesDistributionInterface extends BaseObjectInterface {
  name: string;
  distribution_amount: number;
  fees: string;
}

export interface FeesInstallmentInterface extends BaseObjectInterface {
  instalment_no: number;
  instalment_amount: number;
  due_month: number;
  due_date: number;
  is_first_instalment: boolean;
  fees: string;
}

export enum OtherChargesDescriptionEnum {
  FORM_FEES = "Form Fees",
  DEPOSIT_AMOUNT = "Deposit Amount",
  TRANSPORTATION_FEES = "Transportation Fees",
  EXAMINATION_FEES = "Examination Fees",
  UNIFORM_FEES = "Uniform Fees",
  ACTIVITY_FEES = "Activity Fees",
  FIELD_TRIP_FEES = "Field Trip Fees",
  TECHNOLOGY_FEES = "Technology Fees",
}

export interface OtherChargesInterface {
  description: OtherChargesDescriptionEnum;
  amount: number;
  is_required: boolean;
}

export enum FeesTypeEnum {
  OLD = "Old",
  NEW = "New",
}

export interface FeesInterface extends BaseObjectInterface {
  name: string;
  distributions: Array<FeesDistributionInterface>;
  instalments: Array<FeesInstallmentInterface>;
  other_charges: Array<FeesInstallmentInterface>;
  no_of_instalment: number;
  form_fees: number;
  fees_type: FeesTypeEnum;
  deposit_amount: number;
  warning: string;
  total_fees: number;
  standard: string;
}

export interface FeesStoreInterface {
  admissionFees: FeesInterface | null;
}

export interface CreateFeesInterface
  extends Omit<FeesInterface, ExcludeBaseObjectKeys> {}
