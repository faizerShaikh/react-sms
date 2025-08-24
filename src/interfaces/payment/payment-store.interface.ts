import { AdmissionInstalmentInterface } from '../admission';
import { onClose } from '../other';

export interface PaymentStoreInterface {
  selectedPaymentData: AdmissionInstalmentInterface | null;
  orderData: any;
}

export interface CreateOrderInterface {
  onClose?: onClose;
  other_payment_id?: string;
  admission_instalment_id?: string;
  type: string;
  id: string;
  payment_method: string;
  initialForm?: boolean;
}

export interface OpenCheckoutInterface {
  onClose?: onClose;
  order_id: string;
  total_amount: number;
  id: string;
  payment_method: string;
  type: string;
  initialForm?: boolean;
}
