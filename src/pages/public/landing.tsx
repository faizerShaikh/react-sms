import { ActionCard, Button, PowerdBy, Separator } from '@/components';
import { schoolConfig } from '@/configs';

type Props = {};

export function Landing({}: Props) {
  return (
    <div className='sm:p-2 p-5 sm:w-[500px] h-screen md:flex md:justify-center md:flex-col mx-auto'>
      <div
        className='mx-auto mt-10'
        style={{ width: '180px', height: '180px' }}
      >
        <img
          className='w-full h-full'
          src={schoolConfig.school_logo_path}
          alt='school logo'
        />
      </div>
      <h1 className='text-gray-950 font-black text-xl leading-7 text-center font-satoshi'>
        Welcome to {schoolConfig.school_name} Student/Parent Portal
      </h1>
      <div className='flex items-start flex-col gap-3 self-stretch my-6'>
        <ActionCard
          routerLink='create-enquiry'
          icon='ph-duotone ph-file-search'
          heading='Fill Enquiry Form'
          description='Fill form for any general enquiry - admission related or otherwise'
        ></ActionCard>
        <ActionCard
          routerLink='admission'
          icon='ph-duotone ph-graduation-cap'
          heading='Admission Form'
          description='Fill out admission form for new or existing Student'
        ></ActionCard>
      </div>
      <Separator orientation='horizontal'>Or</Separator>
      <div className='mt-8 flex flex-col items-center justify-center gap-2 self-stretch'>
        <p className='text-gray-400 font-satoshi text-xs font-medium'>
          Already a registerd? Sign in here using your Refrence Number
        </p>
        <Button variant='primary-contained' size='large' routerLink='/login'>
          Sign In
        </Button>
      </div>
      <PowerdBy className='py-5'></PowerdBy>
    </div>
  );
}
