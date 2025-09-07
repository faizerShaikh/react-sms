import { api } from '@/configs/axios';
import { ContentManagementComponentEnum } from '@/enum';
import { BatchInterface } from '@/interfaces';
import { getFormatedTime } from '@/lib/utils';
import { useQueries } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { PiCaretDoubleUp } from 'react-icons/pi';
import { useSearchParams } from 'react-router';
import * as yup from 'yup';
import { Heading } from '../heading';
import { QuillViewer } from '../quill/quill-viewer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

type Props = {
  isViewOnly?: boolean;
};

export const declarationFormDefaultValues = {
  declaration: false,
};

export const declarationFormSchema = yup.object({
  declaration: yup
    .boolean()
    .test('declaration', 'Declaration Required', (val) => !!val),
});

export const getDeclarationFormValuesToSubmit = (values: any) => {
  return values;
};

export function DeclarationForm({ isViewOnly }: Props) {
  const [searchParams] = useSearchParams();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [{ data: admissionBatch }, { data: contentData }] = useQueries({
    queries: [
      {
        queryKey: ['admission-batch', searchParams.get('admissionId')],
        queryFn: (): Promise<BatchInterface> => {
          return api
            .get(
              `/schools/batch-for-admission/${searchParams.get('admissionId')}`,
            )
            .then((res) => res.data);
        },
        enabled: !!searchParams.get('admissionId'),
      },
      {
        queryKey: [
          'content-data',
          ContentManagementComponentEnum.DECLARATION_RULES,
        ],
        queryFn: () => {
          return api
            .get(
              `/schools/content-management/get/${ContentManagementComponentEnum.DECLARATION_RULES}`,
            )
            .then((res) => res.data);
        },
      },
    ],
  });

  return (
    <div>
      <Alert
        className='w-full flex flex-row justify-start items-start gap-3'
        variant='info'
      >
        <i className='ph-duotone ph-info text-base mt-1'></i>
        <div>
          <AlertTitle>Kindly Note</AlertTitle>
          <AlertDescription>
            This Is To Inform You Kindly Go Through This Declaration, Sign By
            Parents & Guardians.
          </AlertDescription>
        </div>
      </Alert>
      <Accordion type='single' value='kindly-note' collapsible>
        <AccordionItem value='kindly-note'>
          <AccordionTrigger Icon={PiCaretDoubleUp}>
            <Heading>Kindly Note</Heading>
          </AccordionTrigger>
          <AccordionContent>
            <h2 className='text-primary font-bold text-sm font-satoshi'>
              All The Parents Have To Follow The Rules Given Below
            </h2>
            {admissionBatch && (
              <div>
                <h4 className='text-gray-500 text-xs my-4 font-satoshi text-center'>
                  Timings: {getFormatedTime(admissionBatch.in_time)} To{' '}
                  {getFormatedTime(admissionBatch.out_time)}
                </h4>
                <div className='flex flex-col justify-start gap-2 p-3 bg-primary-light rounded'>
                  <div className='flex justify-between items-center'>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      CLASS
                    </div>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      {admissionBatch.label}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      IN TIME
                    </div>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      {getFormatedTime(admissionBatch.in_time)}
                    </div>
                  </div>
                  {admissionBatch.batch_rules.map((batchRule) => (
                    <div
                      className='flex justify-between items-center'
                      key={batchRule['label']}
                    >
                      <div className='text-xs text-gray-800 font-satoshi'>
                        {batchRule['label']}
                      </div>
                      <div className='text-xs text-gray-800 font-satoshi'>
                        {batchRule['value'] || '-'}
                      </div>
                    </div>
                  ))}

                  <div className='flex justify-between items-center'>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      OUT TIME
                    </div>
                    <div className='text-xs text-gray-800 font-satoshi'>
                      {getFormatedTime(admissionBatch.out_time)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {contentData && <QuillViewer content={contentData.content} />}
      <div className='flex justify-start items-center gap-3 mt-5'>
        <Checkbox
          disabled={isViewOnly}
          checked={watch('declaration')}
          id='declaration'
          onCheckedChange={(checked) => {
            setValue('declaration', checked);
          }}
        ></Checkbox>

        <Label
          className='text-sm font-semibold font-satoshi text-active leading-5'
          htmlFor='declaration'
        >
          I hereby declare that I accept the above conditions
        </Label>
      </div>
      {'declaration' in errors && (
        <Alert
          variant='destructive'
          className='mt-5 flex justify-start items-start gap-2'
        >
          <i className='ph-duotone ph-warning-circle text-error text-lg mt-1'></i>
          <div>
            <AlertTitle>Declaration Required</AlertTitle>
            <AlertDescription className='text-red-400'>
              Your Declaration Is Required To Continue
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
