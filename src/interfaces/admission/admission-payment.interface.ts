export enum PaymentTypes {
  INSTALMENT_PAYMENT = 'Instalment Payment',
  OTHER_CHARGE = 'Other Charge',
}

export interface PayInstalmentInterface {
  ins_id: string;
  payment_method: string;
}

export interface PayOtherChargesInterface {
  id: string;
  payment_method: string;
  initialForm?: boolean;
}

export interface updatePaymentMethodInterface {
  id: string;
  payment_method: string;
  fees_type: string;
  initialForm?: boolean;
}
