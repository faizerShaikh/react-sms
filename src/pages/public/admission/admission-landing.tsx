import { ActionCard, MobileHeader, Separator } from '@/components';
import { Button } from '@/components/ui/button';
import { schoolConfig } from '@/configs/app-config';

type Props = {};

export function AdmissionLanding({}: Props) {
  return (
    <div className='p-5 flex flex-col justify-center relative items-center w-full'>
      <MobileHeader>Select Admission Type</MobileHeader>
      <div className='flex items-start flex-col gap-3 self-stretch mt-10'>
        <ActionCard
          routerLink='instructions'
          icon='ph-duotone ph-user-plus'
          heading='New Student Admission'
          description={`Select this if student is being admitted for the first time in ${schoolConfig.school_name}`}
        ></ActionCard>
        <ActionCard
          routerLink='partial-admissions'
          icon='ph-duotone ph-user-switch'
          heading='Continue with Partially filled Admission'
          description='Select this option resume filling out your partially completed admission form.'
        ></ActionCard>
        <ActionCard
          routerLink='my-admissions'
          icon='ph-duotone ph-identification-card'
          heading='Submitted Admissions'
          description='Select this option to view submitted admission. You can also download the admission form and view admission status.'
        ></ActionCard>
      </div>
      <Separator orientation='horizontal' className='w-full' />
      <Button variant='primary-light-contained' routerLink='../' size='large'>
        Back
      </Button>
    </div>
  );
}
