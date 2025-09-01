import { api } from '@/configs/axios';
import { FRONTEND_DATE_FORMAT } from '@/constants';
import { ContentManagementComponentEnum } from '@/enum';
import { FeesInstallmentInterface, FeesInterface } from '@/interfaces';
import { getWithOrdinalSuffix } from '@/lib/utils';
import { useQueries } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { useSearchParams } from 'react-router';
import { Heading } from '../heading';
import { QuillViewer } from '../quill/quill-viewer';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';

type Props = {};

export function FeesStructure({}: Props) {
  const [searchParams] = useSearchParams();
  const [
    { data: admissionFeesData, isLoading: isAdmissionFeesDataLoading },
    { data: contentData, isLoading: isContentDataLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['admission-fees-data', searchParams.get('admissionId')],
        queryFn: (): Promise<FeesInterface> => {
          return api
            .get(
              `/schools/fees-for-admission/${searchParams.get('admissionId')}/`,
            )
            .then((res) => res.data);
        },
        enabled: !!searchParams.get('admissionId'),
      },
      {
        queryKey: [
          'content-data',
          ContentManagementComponentEnum.ADMISSION_FEE_NOTES,
        ],
        queryFn: () => {
          return api
            .get(
              `/schools/content-management/get/${ContentManagementComponentEnum.ADMISSION_FEE_NOTES}`,
            )
            .then((res) => res.data);
        },
      },
    ],
  });

  const getFormatedDate = (item: FeesInstallmentInterface) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const createdDate = new Date(
      currentYear,
      item.due_month - 1,
      item.due_date,
    );
    return formatDate(createdDate, FRONTEND_DATE_FORMAT);
  };
  return (
    <div className='grid sm:grid-cols-1 w-full gap-6'>
      <div className='flex flex-col gap-3'>
        <Heading>PAYMENT BREAKUP</Heading>
        <Alert className='flex justify-start items-start gap-2' variant='info'>
          <i className='ph-duotone ph-info text-base mt-1'></i>
          <div>
            <AlertTitle>Kindly Note</AlertTitle>
            <AlertDescription>
              This is a breakdown of fees according to class for which you are
              taking admission
            </AlertDescription>
          </div>
        </Alert>

        <div className='flex flex-col items-start self-stretch gap-2 px-2 mt-2 mb-3'>
          <div className='flex justify-between items-center w-full'>
            <p className='m-0 font-satoshi text-sm text-gray-800'>
              SECURITY DEPOSIT (REFUNDABLE)
            </p>
            {isAdmissionFeesDataLoading ? (
              <Skeleton className='w-20 h-4' />
            ) : (
              <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                &#8377; {admissionFeesData?.deposit_amount}
              </p>
            )}
          </div>

          <div className='flex justify-between items-center w-full border-t border-0 border-dashed border-gray-200 pt-1'>
            <p className='m-0 font-satoshi text-sm text-gray-800'>Total Fees</p>
            {isAdmissionFeesDataLoading ? (
              <Skeleton className='w-20 h-4' />
            ) : (
              <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                &#8377;
                {admissionFeesData
                  ? admissionFeesData!.total_fees +
                    admissionFeesData!.deposit_amount
                  : '-'}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Heading>INSTALLMENT BREAKUP</Heading>
        <Alert className='flex justify-start items-start gap-2' variant='info'>
          <i className='ph-duotone ph-info text-base mt-1'></i>

          <AlertTitle>Fees can be paid at once or in installment</AlertTitle>
        </Alert>
        <div className='flex flex-col items-start self-stretch gap-2 px-2'>
          {isAdmissionFeesDataLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  className='flex justify-between items-start w-full'
                  key={index}
                >
                  <div>
                    <Skeleton className='w-[200px] h-4' />
                    <Skeleton className='w-[100px] h-3 mt-1' />
                  </div>
                  <Skeleton className='w-20 h-4' />
                </div>
              ))
            : admissionFeesData?.instalments?.map(
                (item: FeesInstallmentInterface) => (
                  <div
                    className='flex justify-between items-start w-full'
                    key={item.instalment_no}
                  >
                    <div>
                      <p className='m-0 font-satoshi text-sm text-gray-800'>
                        {getWithOrdinalSuffix(item.instalment_no)} Instalment
                        {item.instalment_no === 1 ? ' + Security Deposit' : ''}
                      </p>
                      <span className='text-primary text-xs font-satoshi'>
                        (
                        {item.is_first_instalment
                          ? 'Pay after admission'
                          : 'Before ' + getFormatedDate(item)}
                        )
                      </span>
                    </div>
                    <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                      &#8377;
                      {item.instalment_no === 1 ? (
                        <>
                          <span> {item.instalment_amount}</span> +{' '}
                          <span>
                            &#8377; {admissionFeesData?.deposit_amount}
                          </span>
                        </>
                      ) : (
                        item.instalment_amount
                      )}
                    </p>
                  </div>
                ),
              )}
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Heading>IMPORTANT NOTES</Heading>

        {isContentDataLoading ? (
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-1/2 h-4' />
          </div>
        ) : (
          contentData && (
            <QuillViewer content={contentData?.content}></QuillViewer>
          )
        )}
      </div>

      {admissionFeesData?.warning && (
        <Alert
          variant='destructive'
          className='mt-5 flex justify-start items-start gap-2'
        >
          <i className='ph-duotone ph-warning-circle text-error text-lg mt-1'></i>
          <div>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription className='text-red-400'>
              {admissionFeesData?.warning}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
