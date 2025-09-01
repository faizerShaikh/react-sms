import { Button, ConfirmDialog, Heading, MobileHeader } from '@/components';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form } from '@/components/ui/form';
import { schoolConfig } from '@/configs/app-config';
import { api } from '@/configs/axios';
import { AdmissionSteps } from '@/constants';
import { PostAdmissionStepResponse } from '@/interfaces';
import { cn } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { FullPageLoader } from '../full-page-loader';
import {
  ChildernInfoDefultValues,
  childernInfoSchema,
  ChildrenInfo,
  getChildrenInfoDefaultValues,
  getChildrenInfoValuesToSubmit,
} from './children-info';
import {
  DeclarationForm,
  declarationFormDefaultValues,
  declarationFormSchema,
  getDeclarationFormValuesToSubmit,
} from './declaration-form';
import {
  DocumentAttached,
  documentAttachedDefaultValues,
  documentAttachedSchema,
  getDocumentAttachedDefaultValues,
  getDocumentAttachedValuesToSubmit,
} from './document-attached';
import { FeesStructure } from './fees-structure';
import {
  getParentsInfoValuesToSubmit,
  parentInfoDefaultValues,
  ParentsInfo,
  parentsInfoSchema,
} from './parents-info';
import { ShowFormNumber } from './show-form-number';
import {
  getSupplementryInfoValuesToSubmit,
  SupplementaryInfo,
  supplementryInfoDefaultValues,
  supplementryInfoSchema,
} from './supplementary-info';
type Props = {
  isStudent?: boolean;
};

const stepFormMap: Record<
  number,
  {
    value: any;
    schema: any;
    getSubmitValues: any;
    successMessage: string;
    component: any;
    getDefaultValues?: any;
  }
> = {
  1: {
    value: ChildernInfoDefultValues,
    schema: childernInfoSchema,
    getSubmitValues: getChildrenInfoValuesToSubmit,
    successMessage: 'Children info saved successfully',
    component: ChildrenInfo,
    getDefaultValues: getChildrenInfoDefaultValues,
  },
  2: {
    value: parentInfoDefaultValues,
    schema: parentsInfoSchema,
    getSubmitValues: getParentsInfoValuesToSubmit,
    successMessage: 'Parents info saved successfully',
    component: ParentsInfo,
  },
  3: {
    value: supplementryInfoDefaultValues,
    schema: supplementryInfoSchema,
    getSubmitValues: getSupplementryInfoValuesToSubmit,
    successMessage: 'Supplementary info saved successfully',
    component: SupplementaryInfo,
  },
  4: {
    value: documentAttachedDefaultValues,
    schema: documentAttachedSchema,
    getSubmitValues: getDocumentAttachedValuesToSubmit,
    successMessage: 'Document attached saved successfully',
    component: DocumentAttached,
    getDefaultValues: getDocumentAttachedDefaultValues,
  },
  5: {
    value: declarationFormDefaultValues,
    schema: declarationFormSchema,
    getSubmitValues: getDeclarationFormValuesToSubmit,
    successMessage: 'Declaration Acknowledged successfully',
    component: DeclarationForm,
  },
  6: {
    value: {},
    schema: {},
    getSubmitValues: () => {},
    successMessage:
      'Application Completed, your application is under review admin will contact you.',
    component: FeesStructure,
  },
};

export function AdmissionForm({ isStudent = false }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(
    searchParams.get('currentStep')
      ? parseInt(searchParams.get('currentStep') || '1')
      : 1,
  );

  const isViewOnly = searchParams.get('view') === 'true';
  const [admissionData, setAdmissionData] =
    useState<PostAdmissionStepResponse | null>(null);

  const [showFormNumber, setShowFormNumber] = useState(false);

  const navigate = useNavigate();

  const currentStepProps = useMemo(() => {
    return stepFormMap[currentStep];
  }, [currentStep]);

  const form = useForm({
    defaultValues: currentStepProps?.value || {},
    resolver: yupResolver(currentStepProps?.schema || {}),
    shouldFocusError: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admission', searchParams.get('admissionId'), currentStep],
    queryFn: () => {
      return api
        .get(`/admission/`, {
          params: {
            adm: searchParams.get('admissionId'),
            sp: currentStep == 5 ? 1 : currentStep,
          },
        })
        .then((res) => res.data);
    },
    enabled:
      !!searchParams.get('admissionId') && !!currentStep && currentStep <= 5,
  });

  useEffect(() => {
    if (searchParams.get('admissionId')) {
      if (data && currentStep <= 5) {
        form.reset(
          currentStepProps?.getDefaultValues
            ? currentStepProps?.getDefaultValues(data)
            : data,
        );
        form.setValue('is_update', true);
        if (currentStep === 1) {
          setAdmissionData({
            student: `${data?.student.id || admissionData?.student}`,
            admission: `${data?.id || admissionData?.admission}`,
            form_number: `${data?.form_number || admissionData?.form_number}`,
            declaration_agreed: !!(
              data?.declaration_agreed || admissionData?.declaration_agreed
            ),
            currentStep: +(data?.currentStep || currentStep || 1),
          });
        }
      }

      if (currentStep === 5) {
        form.setValue('declaration', admissionData?.declaration_agreed);
        form.setValue('is_update', true);
      }
    }
  }, [data, currentStep]);

  const {
    mutate: mutateDocumentAttached,
    isPending: isPendingDocumentAttached,
  } = useMutation({
    mutationFn: (data: any) => {
      return api
        .post('/admission-documents-upload/', data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success(currentStepProps?.successMessage);
      setCurrentStep(currentStep + 1);
      setSearchParams({
        currentStep: (currentStep + 1).toString(),
        admissionId: searchParams.get('admissionId') || '',
        studentId: searchParams.get('studentId') || '',
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post('/admission/', data).then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.success(currentStepProps?.successMessage, {
        duration: currentStep === 6 ? 10000 : 5000,
      });
      if (currentStep === 6) {
        navigate('/');
        return;
      }
      setCurrentStep(currentStep + 1);
      if (currentStep === 1) {
        setAdmissionData({
          student: `${data?.student || admissionData?.student}`,
          admission: `${data?.admission || admissionData?.admission}`,
          form_number: `${data?.form_number || admissionData?.form_number}`,
          declaration_agreed: !!(
            data?.declaration_agreed || admissionData?.declaration_agreed
          ),
          currentStep: +(data?.currentStep || currentStep || 1),
        });
        if (!form.watch('is_update')) {
          setShowFormNumber(true);
        }
      }

      setSearchParams({
        currentStep: (currentStep + 1).toString(),
        admissionId: data?.admission,
        studentId: data?.student,
      });
    },
  });

  const onSubmit = (data: any) => {
    if (isViewOnly) {
      setCurrentStep(currentStep + 1);
      return;
    }
    const submitValues = currentStepProps?.getSubmitValues(data);
    if (currentStep === 4) {
      submitValues.append('admission', searchParams.get('admissionId') || '');
      submitValues.append('student', searchParams.get('studentId') || '');
      submitValues.append('step', currentStep.toString());
      submitValues.append('is_update', data.is_update);
      mutateDocumentAttached(submitValues);
    } else {
      mutate({
        ...submitValues,
        is_update: data.is_update,
        admission: searchParams.get('admissionId'),
        student: searchParams.get('studentId'),
        step: currentStep,
      });
    }
  };

  useEffect(() => {
    scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const CurrentStepComponent = useMemo(() => {
    return currentStepProps?.component || null;
  }, [currentStepProps]);

  return (
    <div
      className={cn('p-5 lg:w-[50vw] mx-auto min-h-screen', isStudent && 'p-0')}
    >
      {isLoading && <FullPageLoader />}
      <div className='flex justify-center relative items-center w-full px-2 flex-col gap-5'>
        <MobileHeader>
          <div className='flex justify-center items-center gap-3'>
            {/* <div className='text-gray-400 font-semibold text-xs w-12 h-12 flex justify-center items-center rounded-full border-2 border-solid border-gray-200'>
              {currentStep} of 6
            </div> */}
            <div className='flex items-center justify-center rounded-full bg-gray-100'>
              <div
                className='relative w-14 h-14 rounded-full'
                style={{
                  background: `conic-gradient(#004ab0 calc(16.6% * ${currentStep}), #e5e7eb 0)`,
                }}
              >
                <div className='absolute inset-1 bg-white rounded-full flex items-center justify-center'>
                  <span className='text-gray-400 text-xs font-semibold'>
                    {currentStep} of 6
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-start'>
              <h1 className='text-active text-lg font-satoshi font-bold'>
                Admission {isViewOnly ? 'Details' : 'Form'}
              </h1>
              <p className='text-sm text-gray-400'>
                <span className='text-gray-600 font-medium'>
                  Section {currentStep}:
                </span>{' '}
                {AdmissionSteps[currentStep]}
              </p>
            </div>
          </div>
        </MobileHeader>

        {admissionData && !isViewOnly && (
          <div className='w-full text-start text-lg text-heading'>
            <Heading> Admission Number :- {admissionData.form_number} </Heading>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col items-start w-full self-stretch'>
              {currentStep <= 3 && !isViewOnly && (
                <Alert
                  className='w-full flex flex-row justify-start items-start gap-3'
                  variant='info'
                >
                  <i className='ph-duotone ph-info text-base mt-1'></i>
                  <div>
                    <AlertTitle>Form Fill Instructions</AlertTitle>
                    <AlertDescription>
                      Please use Block Letters while filling the form.
                    </AlertDescription>
                  </div>
                </Alert>
              )}
              {CurrentStepComponent && (
                <CurrentStepComponent isViewOnly={isViewOnly} />
              )}

              <div
                className={cn(
                  'flex gap-4 my-4 w-full',
                  isViewOnly && 'justify-end mt-6',
                  !isViewOnly && 'self-stretch flex-col items-start',
                )}
              >
                {isViewOnly ? (
                  <>
                    {currentStep > 1 && (
                      <Button
                        variant='primary-outlined'
                        className='w-auto'
                        size='small'
                        type='button'
                        onClick={() => {
                          setCurrentStep(currentStep - 1);
                        }}
                      >
                        Back
                      </Button>
                    )}
                    {currentStep <= 5 && (
                      <Button
                        variant='primary-contained'
                        className='w-auto'
                        size='small'
                        type='button'
                        onClick={() => {
                          setCurrentStep(currentStep + 1);
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {currentStep === 6 ? (
                      <ConfirmDialog
                        triggerButton={
                          <Button
                            variant='primary-contained'
                            size='large'
                            disabled={isPending || isPendingDocumentAttached}
                          >
                            {(isPending || isPendingDocumentAttached) && (
                              <Loader2 className='animate-spin' />
                            )}
                            Confirm Admission
                          </Button>
                        }
                        title='Proceed to confirm'
                        description={`Please note: Your child's interview will be confirmed upon payment of the Rs. ${
                          schoolConfig.admission_form_fees || 0
                        }/- form fee. Please pay admission form fee at ${
                          schoolConfig.school_name
                        }'s admin office before interview.`}
                        actionButton='Confirm'
                        onConfirm={() => onSubmit(form.getValues())}
                      />
                    ) : (
                      <Button
                        variant='primary-contained'
                        size='large'
                        type='submit'
                        disabled={isPending || isPendingDocumentAttached}
                      >
                        {(isPending || isPendingDocumentAttached) && (
                          <Loader2 className='animate-spin' />
                        )}
                        {!isViewOnly ? 'Save & Next' : 'Next'}
                      </Button>
                    )}
                    {currentStep > 1 && (
                      <Button
                        variant='primary-outlined'
                        size='large'
                        type='button'
                        onClick={() => {
                          setCurrentStep(currentStep - 1);
                          setSearchParams({
                            currentStep: (currentStep - 1)
                              .toString()
                              .toString(),
                            admissionId: searchParams.get('admissionId') || '',
                            studentId: searchParams.get('studentId') || '',
                          });
                        }}
                      >
                        Back
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
        {showFormNumber && admissionData?.form_number && (
          <ShowFormNumber
            admissionNumber={admissionData?.form_number}
            onClose={() => setShowFormNumber(false)}
          />
        )}
      </div>
    </div>
  );
}
