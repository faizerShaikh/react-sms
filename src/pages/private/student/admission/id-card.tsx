import { MobileHeader } from '@/components';
import { IdCardForm } from '@/components/admission';

type Props = {};

export function IdCard({}: Props) {
  return (
    <div>
      <MobileHeader>Fill ID Card Form</MobileHeader>
      <IdCardForm />
    </div>
  );
}
