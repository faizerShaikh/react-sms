import { toast } from 'sonner';
import { MobileResponsiveDialog } from '../mobile-responsive-dialog';
import { Button, Separator } from '../ui';

type Props = {
  admissionNumber: string;
  onClose: () => void;
};

export function ShowFormNumber({ admissionNumber, onClose }: Props) {
  const onCopy = () => {
    window.navigator.clipboard.writeText(admissionNumber);
    toast.success('Admission Number Copied Successfully');
  };

  return (
    <MobileResponsiveDialog
      onClose={onClose}
      heading='Copy Admission Number'
      autoOpen
    >
      {({ onClose }) => (
        <div className='p-4'>
          <div className='flex flex-col items-center gap-3'>
            <div className='flex justify-center items-center p-5 bg-info-light rounded-full'>
              <i className='ph-bold ph-info text-info text-2xl'></i>
            </div>
            <h4
              className='cursor-pointer font-satoshi text-heading text-center font-semibold text-base underline'
              onClick={onCopy}
            >
              {admissionNumber}
            </h4>
            <p className='text-sm text-gray-400 text-center font-satoshi'>
              This is your unique admission number and it will be essential for
              future reference. Please keep it secure for future use.
            </p>
          </div>
          <Separator orientation='horizontal' />
          <div className='flex justify-end items-center gap-3'>
            <Button
              onClick={onClose}
              variant='primary-outlined'
              className='w-auto'
            >
              Close
            </Button>
            <Button
              onClick={onCopy}
              variant='primary-contained'
              className='w-auto'
            >
              Copy <i className='ph-bold ph-clipboard'></i>
            </Button>
          </div>
        </div>
      )}
    </MobileResponsiveDialog>
  );
}
