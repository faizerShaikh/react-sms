import { Heading, MobileHeader } from '@/components';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import {
  AdmissionFeesInterface,
  AdmissionInstalmentInterface,
  AdmissionOtherChargesInterface,
} from '@/interfaces';
import { getFormatedFeeDueDate, getWithOrdinalSuffix } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ViewPaymentDetail } from './components/view-payment-detail';
import { ViewPaymentMethodDetails } from './components/view-payment-method-details';

type Props = {};

export function FeesDetail({}: Props) {
  const {
    state: { userData },
  } = useAuth();

  const [selectedFeesData, setSelectedFeesData] = useState<
    AdmissionInstalmentInterface | AdmissionOtherChargesInterface | null
  >(null);
  const { data: admissionFeesData } = useQuery({
    queryKey: ['admissionFeesData', userData?.admission_id],
    queryFn: () =>
      api
        .get<AdmissionFeesInterface>(
          `/schools/admission-fees-instalment/${userData?.admission_id}/`,
        )
        .then((res) => res.data),
    enabled: !!userData?.admission_id,
  });

  return (
    <div>
      <div className=''>
        <MobileHeader>My Fees Details</MobileHeader>
      </div>

      <div className='grid sm:grid-cols-1 w-full gap-6 tb:mt-0 mt-5'>
        <div className='flex flex-col gap-3'>
          <Heading variant='secondary'>
            <div className='flex justify-between items-center'>
              <div className='flex-1'>PAYMENT BREAKUP</div>
              <ViewPaymentMethodDetails />
            </div>
          </Heading>
          <Alert variant='info' className='flex items-start gap-3'>
            <div>
              <i className='ph-bold ph-info'></i>
            </div>
            <div>
              <AlertTitle>
                This is a breakdown of fees according to class for which you are
                taking admission
              </AlertTitle>
            </div>
          </Alert>

          {selectedFeesData && (
            <ViewPaymentDetail
              selectedFeesData={selectedFeesData}
              onClose={() => setSelectedFeesData(null)}
            />
          )}

          <div className='flex flex-col items-start self-stretch gap-2 px-2'>
            <div className='flex justify-between items-center w-full'>
              <p className='m-0 font-satoshi text-sm text-gray-800'>
                SECURITY DEPOSIT (REFUNDABLE)
              </p>
              <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                &#8377; {admissionFeesData?.deposit_amount}
              </p>
            </div>

            <div className='flex justify-between items-center w-full border-t border-0 border-dashed border-gray-200 pt-1'>
              <p className='m-0 font-satoshi text-sm text-gray-800'>
                Total Fees
              </p>
              <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                &#8377;
                {admissionFeesData
                  ? admissionFeesData?.total_amount +
                    admissionFeesData?.deposit_amount
                  : '-'}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <Heading variant='secondary'>OTHER CHARGES</Heading>
          <div className='flex flex-col items-start self-stretch gap-2 px-2'>
            {admissionFeesData?.admission_other_charges?.map((item) => (
              <div
                key={item.id}
                className='flex justify-between items-start w-full border-b pb-2 border-0 border-solid border-gray-100 cursor-pointer'
                onClick={() => setSelectedFeesData(item)}
              >
                <div>
                  <p className='m-0 font-satoshi text-sm text-gray-800'>
                    {item.description}
                  </p>
                  <span className='text-primary text-xs font-satoshi'>
                    (Pay while filling admission form)
                  </span>
                </div>
                <div className='mt-1'>
                  <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                    &#8377; {item.amount}
                  </p>
                  <Badge variant={!item.is_paid ? 'warning' : 'success'}>
                    {item.is_paid ? 'Paid' : 'Due'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Heading variant='secondary'>INSTALLMENT BREAKUP</Heading>
          <Alert variant='info' className='flex items-start gap-3'>
            <div>
              <i className='ph-bold ph-info'></i>
            </div>
            <div>
              <AlertTitle>
                Fees can be paid at once or in installment
              </AlertTitle>
            </div>
          </Alert>
          <div className='flex flex-col items-start self-stretch gap-2 px-2'>
            {admissionFeesData?.admission_instalments?.map((item) => (
              <div
                key={item.id}
                className='flex justify-between items-start w-full border-b py-2 border-0 border-solid border-gray-100 cursor-pointer'
                onClick={() => setSelectedFeesData(item)}
              >
                <div>
                  <p className='m-0 font-satoshi text-sm text-gray-800'>
                    {getWithOrdinalSuffix(item.installment_no)} Instalment
                    {item.total_amount_breakup?.length && (
                      <>
                        +
                        {item.total_amount_breakup?.map((item) => (
                          <span key={item.id}>{item.description}</span>
                        ))}
                      </>
                    )}
                  </p>
                  <span className='text-primary text-xs font-satoshi'>
                    (
                    {item.is_first_instalment
                      ? 'Pay after admission'
                      : 'Before ' + getFormatedFeeDueDate(item)}
                    )
                  </span>
                </div>
                <div className='mt-1 flex justify-end items-end flex-col'>
                  <p className='font-satoshi m-0 text-sm text-end text-gray-900 font-bold'>
                    &#8377;
                    {item.total_amount}
                  </p>
                  <Badge variant={!item.is_paid ? 'warning' : 'success'}>
                    {item.is_paid ? 'Paid' : 'Due'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
