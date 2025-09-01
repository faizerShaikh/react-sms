import { Button, ConfirmDialog, Heading, MobileHeader } from '@/components';
import {
  ChildernInfoDefultValues,
  childernInfoSchema,
  ChildrenInfo,
  DeclarationForm,
  declarationFormDefaultValues,
  declarationFormSchema,
  DocumentAttached,
  documentAttachedDefaultValues,
  documentAttachedSchema,
  FeesStructure,
  getChildrenInfoValuesToSubmit,
  getDeclarationFormValuesToSubmit,
  getDocumentAttachedValuesToSubmit,
  getParentsInfoValuesToSubmit,
  getSupplementryInfoValuesToSubmit,
  parentInfoDefaultValues,
  ParentsInfo,
  parentsInfoSchema,
  ShowFormNumber,
  SupplementaryInfo,
  supplementryInfoDefaultValues,
  supplementryInfoSchema,
} from '@/components/admission';
import {} from '@/components/admission/declaration-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form } from '@/components/ui/form';
import { schoolConfig } from '@/configs/app-config';
import { api } from '@/configs/axios';
import { AdmissionSteps } from '@/constants';
import { PostAdmissionStepResponse } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
type Props = {};

const stepFormMap: Record<
  number,
  {
    value: any;
    schema: any;
    getSubmitValues: any;
    successMessage: string;
    component: any;
  }
> = {
  1: {
    value: ChildernInfoDefultValues,
    schema: childernInfoSchema,
    getSubmitValues: getChildrenInfoValuesToSubmit,
    successMessage: 'Children info saved successfully',
    component: ChildrenInfo,
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

export function NewAdmission({}: Props) {
  const [currentStep, setCurrentStep] = useState(6);
  const [admissionData, setAdmissionData] =
    useState<PostAdmissionStepResponse | null>(null);

  const [showFormNumber, setShowFormNumber] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const currentStepProps = useMemo(() => {
    return stepFormMap[currentStep];
  }, [currentStep]);

  const form = useForm({
    defaultValues: currentStepProps?.value || {},
    resolver: yupResolver(currentStepProps?.schema || {}),
    shouldFocusError: true,
  });

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
        setShowFormNumber(true);
      }

      setSearchParams({
        currentStep: (currentStep + 1).toString(),
        admissionId: data?.admission,
        studentId: data?.student,
      });
    },
  });

  const onSubmit = (data: any) => {
    const submitValues = currentStepProps?.getSubmitValues(data);
    if (currentStep === 4) {
      submitValues.append('admission', searchParams.get('admissionId') || '');
      submitValues.append('student', searchParams.get('studentId') || '');
      submitValues.append('step', currentStep.toString());
      submitValues.append('is_update', 'false');
      mutateDocumentAttached(submitValues);
    } else {
      mutate({
        ...submitValues,
        admission: searchParams.get('admissionId'),
        student: searchParams.get('studentId'),
        step: currentStep,
      });
    }
  };

  useEffect(() => {
    scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  console.log(form.watch());

  const CurrentStepComponent = useMemo(() => {
    return currentStepProps?.component || null;
  }, [currentStepProps]);

  return (
    <div className='p-5 lg:w-[50vw] mx-auto min-h-screen'>
      <div className='flex justify-center relative items-center w-full px-2 flex-col gap-5'>
        <MobileHeader>
          <div className='flex justify-center items-center gap-3'>
            <div className='text-gray-400 font-semibold text-xs w-12 h-12 flex justify-center items-center rounded-full border-2 border-solid border-gray-200'>
              {currentStep} of 6
            </div>
            <div className='flex flex-col items-start'>
              <h1 className='text-active text-lg font-satoshi font-bold'>
                Admission Form
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
        {admissionData && (
          <div className='w-full text-start text-lg text-heading'>
            <Heading> Admission Number :- {admissionData.form_number} </Heading>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col items-start w-full self-stretch'>
              {currentStep <= 3 && (
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
              {CurrentStepComponent && <CurrentStepComponent />}

              <div className='flex flex-col gap-4 items-start self-stretch my-4'>
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
                    {!searchParams.get('preview') ? 'Save & Next' : 'Next'}
                  </Button>
                )}
                {currentStep > 1 && (
                  <Button
                    variant='primary-outlined'
                    size='large'
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setSearchParams({
                        currentStep: (currentStep - 1).toString().toString(),
                        admissionId: searchParams.get('admissionId') || '',
                        studentId: searchParams.get('studentId') || '',
                      });
                    }}
                  >
                    Back
                  </Button>
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

{
  /*   <sms-alert
	// 	className="w-full block"
	// 	[class.mb-4]="currentStep > 1"
	// 	*ngIf="currentStep <= 3"
	// 	>Please use Block Letters while filling the form.</sms-alert
	//   >
	//   <sms-children-info className="w-full" *ngIf="currentStep === 1">
	//   </sms-children-info>
	//   <sms-parents-info className="w-full" *ngIf="currentStep === 2">
	//   </sms-parents-info>
	//   <sms-supplementry-info className="w-full" *ngIf="currentStep === 3">
	//   </sms-supplementry-info>
	//   <sms-documents-attached className="w-full" *ngIf="currentStep === 4">
	//   </sms-documents-attached>
	//   <sms-declaration-form className="w-full" *ngIf="currentStep === 5">
	//   </sms-declaration-form>
	//   <sms-fees-structure className="w-full" *ngIf="currentStep === 6"> 
	//   </sms-fees-structure>*/
}
