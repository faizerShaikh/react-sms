import { BaseObjectInterface } from "@/interfaces";
import { AdmissionInterface } from "./admission.interface";

export interface PaymentDetailsInterface {
  transaction_fee_at: string;
  transaction_fee: number;
  gst_amount: number;
  total_amount: number;
  total_in_paise: number;
}

export interface AdmissionOtherChargesInterface {
  id: string;
  paid_by: any;
  created_on: string;
  updated_on: string;
  is_deleted: boolean;
  description: string;
  amount: number;
  payment_date: any;
  is_active: boolean;
  is_paid: boolean;
  payment_method: any;
  is_value_updated_to_plan: boolean;
  admission_fees_plan: string;
  payment_detail: PaymentDetailsInterface;
}

export interface AdmissionInstalmentInterface extends BaseObjectInterface {
  installment_no: number;
  amount: number;
  due_in_month: number;
  due_date: number;
  is_first_instalment: boolean;
  amount_percentage: number;
  discounted_amount: number;
  payment_date: any;
  is_active: boolean;
  is_paid: boolean;
  payment_method: PaymentMethodEnum;
  is_value_updated_to_plan: boolean;
  admission_fees_plan: string;
  paid_by: any;
  total_amount: number;
  total_amount_breakup: AdmissionOtherChargesInterface[];
  payment_detail: PaymentDetailsInterface;
}

export enum PaymentMethodEnum {
  "CHEQUE" = "Cheque",
  "CASH" = "Cash",
  "ONLINE" = "Online",
  "Online + Cash" = "Online + Cash",
}

export interface AdmissionFeesInterface extends BaseObjectInterface {
  admission_instalments: Array<AdmissionInstalmentInterface>;
  total_amount: number;
  discount_amount: number;
  amount_deducted_by_admin: number;
  extra_discounted_amount: number;
  paid_amount: number;
  pending_amount: number;
  is_fully_paid: boolean;
  fees_distribution_json: any;
  is_discount_updated: boolean;
  admission: AdmissionInterface;
  deposit_amount: number;
  is_deposit_paid: boolean;
  admission_other_charges: Array<AdmissionOtherChargesInterface>;
}
