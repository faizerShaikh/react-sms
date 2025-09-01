import { Button, QuillViewer } from '@/components';
import { MobileHeader } from '@/components/mobile-header';
import { api } from '@/configs/axios';
import { ContentManagementComponentEnum } from '@/enum';
import { useQuery } from '@tanstack/react-query';
import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';

type Props = {};

export function AdmissionInstructions({}: Props) {
  const { data: contentData } = useQuery({
    queryKey: ['content-data', ContentManagementComponentEnum.ADMISSION_RULES],
    queryFn: () => {
      return api
        .get(
          '/schools/content-management/get/' +
            ContentManagementComponentEnum.ADMISSION_RULES,
        )
        .then((res) => res.data);
    },
  });
  return (
    <div className='p-5 min-h-screen flex md:justify-center justify-between flex-col mx-auto relative'>
      <div className='flex items-start flex-col gap-8 self-stretch mb-5 mt-2 px-3'>
        <MobileHeader>Rules & Regulations</MobileHeader>

        {contentData && <QuillViewer content={contentData.content} />}
      </div>
      <div className='w-full flex flex-col px-5 bg-white pb-5'>
        <Button
          variant='primary-contained'
          type='submit'
          routerLink='../new'
          className='w-full mt-3'
          size='large'
        >
          Continue
        </Button>
        <Button
          variant='primary-light-contained'
          routerLink='../'
          className='w-full mt-5'
          size='large'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
