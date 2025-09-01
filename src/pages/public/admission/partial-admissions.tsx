import { Button, MobileHeader, Separator } from '@/components';
import { DateInput, InputField } from '@/components/form-components';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form } from '@/components/ui/form';
import { api } from '@/configs/axios';
import { AdmissionSteps, BACKEND_DATE_FORMAT } from '@/constants';
import { AdmissionInterface } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as yup from 'yup';

type Props = {};

const schema = yup.object({
  form_number: yup.string().required('Form number is required'),
  dob: yup.string().required('Date of birth is required'),
});

export function PartialAdmissions({}: Props) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      form_number: '',
      dob: '',
    },
    resolver: yupResolver(schema),
  });

  const [admissions, setAdmissions] = useState<AdmissionInterface[]>([]);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { form_number: string; dob: string }) => {
      return api
        .get('/get-partial-admissions/', {
          params: data,
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      setAdmissions(data);
      if (data.length === 0) {
        toast.info(
          'No Partially filled admission requests found with the provided Form Number & Date of Birth combination.',
        );
      }
    },
  });

  const findAdmissions = (data: { form_number: string; dob: string }) => {
    mutate({
      form_number: data.form_number,
      dob: formatDate(data.dob, BACKEND_DATE_FORMAT),
    });
  };

  const onAdmissionSelect = (admission: any) => {
    navigate(
      `/admission/new?admissionId=${admission.id}&studentId=${admission.student.id}&currentStep=${admission.admission_step}`,
    );
  };

  return (
    <div className='p-5 flex flex-col justify-center relative items-center w-full'>
      <MobileHeader>Find My Admission</MobileHeader>
      <div className='flex items-start flex-col gap-3 self-stretch'>
        <Alert className='flex items-start gap-3 w-full mt-5' variant='info'>
          <i className='ph-duotone ph-info'></i>
          <div>
            <AlertTitle>Find My Partially Filled Admission Request</AlertTitle>
            <AlertDescription>
              By providing Form Number and Date of Birth, you can find your
              partially filled admission request.
            </AlertDescription>
          </div>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(findAdmissions)}
            className='flex items-start flex-col gap-3 self-stretch'
          >
            <InputField
              label='Enter Form Number'
              rightIcon='ph-duotone ph-hash'
              name='form_number'
              className='w-full'
              placeholder='ADM0000'
            ></InputField>
            <DateInput
              label='Date of Birth'
              name='dob'
              className='w-full'
            ></DateInput>
            <Button
              disabled={isPending}
              onClick={form.handleSubmit(findAdmissions)}
              variant={'primary-contained'}
              size={'large'}
              className='mt-2'
            >
              {isPending && <Loader2 className='animate-spin' />}
              Find Admission
            </Button>
          </form>
        </Form>
        {admissions.length > 0 && (
          <div className='w-full'>
            <Separator orientation='horizontal' className='w-full'></Separator>
            <div className='h-[calc(100vh_-_350px)] overflow-auto flex flex-col gap-4 self-stretch w-full'>
              {admissions.map((admission) => (
                <div
                  className='flex justify-start items-start gap-4 p-4 rounded-lg border-solid border-gray-100 border shadow-xs w-full cursor-pointer hover:bg-primary-light'
                  onClick={() => onAdmissionSelect(admission)}
                >
                  <Avatar className='w-16 h-16'>
                    <AvatarImage
                      className='object-cover object-center'
                      src={
                        import.meta.env.VITE_MEDIA_FOLDER_URL +
                          admission?.student?.photo || ''
                      }
                    />
                    <AvatarFallback>
                      {admission?.student?.first_name?.charAt(0) +
                        (admission?.student?.last_name?.charAt(0) || '')}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col self-stretch gap-1 flex-1 relative'>
                    <h4 className='flex justify-between items-center font-satoshi font-bold text-lg text-active'>
                      {admission.student.first_name}
                    </h4>
                    <div className='flex justify-between items-center w-full'>
                      <div className='text-sm font-satoshi text-placeholder font-semibold'>
                        Standard:- {admission.standard.label}
                      </div>
                      <div className='text-sm font-satoshi text-placeholder font-normal'>
                        {AdmissionSteps[admission.admission_step]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
