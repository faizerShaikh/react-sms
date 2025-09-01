import { Button, MobileHeader } from '@/components';
import {
  DateInput,
  InputField,
  SelectInput,
  TextareaField,
} from '@/components/form-components';
import { Form } from '@/components/ui/form';
import { api } from '@/configs/axios';
import { BACKEND_DATE_FORMAT } from '@/constants';
import { EnquiryInterface, ExcludeBaseObjectKeys } from '@/interfaces';
import { calculateAge } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as yup from 'yup';
type Props = {};

const schema = yup.object({
  full_name: yup
    .string()
    .required('Full name is required')
    .nonNullable('Full name is required'),
  mothers_name: yup
    .string()
    .required('Mothers name is required')
    .nonNullable('Mothers name is required'),
  academic_year: yup
    .mixed()
    .required('Academic year is required')
    .nonNullable('Academic year is required'),
  standard: yup
    .mixed()
    .required('Standard is required')
    .nonNullable('Standard is required'),
  last_attended_school_name: yup
    .string()
    .required('Last attended school name is required')
    .nonNullable('Last attended school name is required'),
  board: yup
    .string()
    .required('Board is required')
    .nonNullable('Board is required'),
  dob: yup
    .string()
    .required('Date of birth is required')
    .nonNullable('Date of birth is required'),
  age: yup.string().required('Age is required').nonNullable('Age is required'),
  contact_no: yup
    .string()
    .required('Contact number is required')
    .nonNullable('Contact number is required'),
  alternate_contact_no: yup
    .string()
    .nullable('Alternate contact number is required'),
  address: yup.string().required('Address is required').nonNullable(),
  reference: yup.string().nonNullable('Reference is required'),
  additional_info: yup
    .string()
    .required('Additional information is required')
    .nonNullable(),
});

export function CreateEnquiry({}: Props) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      academic_year: '',
      standard: '',
      last_attended_school_name: '',
      board: '',
      dob: '',
      age: '',
      contact_no: '',
      alternate_contact_no: '',
      reference: '',
      address: '',
      additional_info: '',
    },
  });

  const dob = form.watch('dob');

  useEffect(() => {
    if (dob) {
      const age = calculateAge(dob);
      form.setValue('age', age.toString());
    } else {
      form.setValue('age', '');
    }
  }, [dob]);

  const { data: academicYears } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => api.get('/academic-year/').then((res) => res.data),
  });

  const academicYear: any = form.watch('academic_year');

  const { data: standards } = useQuery({
    queryKey: ['standards', academicYear],
    queryFn: () =>
      api
        .get(`/standards-for-admission/?academic_year=${academicYear.id}`)
        .then((res) => res.data),
    enabled: !!academicYear,
  });

  const { mutate: createEnquiry, isPending } = useMutation({
    mutationFn: (data: Omit<EnquiryInterface, ExcludeBaseObjectKeys>) =>
      api.post('/enquiries/create/', data),
    onSuccess: () => {
      toast.success(
        'Thank you for filling enquiry, our Admin will contact you soon.',
      );
      navigate('../');
    },
  });

  const onSubmit = (data: any) => {
    createEnquiry({
      ...data,
      dob: formatDate(data.dob, BACKEND_DATE_FORMAT),
      academic_year: data.academic_year.id,
      standard: data.standard.id,
    });
  };

  return (
    <div className='p-5 flex flex-col justify-center relative items-center w-full'>
      <MobileHeader>Admission Related Enquiry</MobileHeader>
      <Form {...form}>
        <form
          className='mt-8 gap-5 grid grid-cols-1 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputField
            required
            name='full_name'
            label='Student Full Name'
            helpText='Please add the name as per the Aadhaar card.'
          ></InputField>
          <InputField
            required
            name='mothers_name'
            label='Mothers Name'
          ></InputField>
          <SelectInput
            required
            options={academicYears || []}
            label='Academic Year'
            name='academic_year'
            getOptionLabel={(option) => option?.name}
          ></SelectInput>
          <SelectInput
            required
            options={standards || []}
            label='Standard'
            name='standard'
            getOptionLabel={(option) => option?.label}
          ></SelectInput>
          <InputField
            required
            name='last_attended_school_name'
            label='Last Attended School Name'
          ></InputField>
          <InputField required name='board' label='Board'></InputField>
          <DateInput
            name='dob'
            helpText='Please add the date of birth as per the Aadhaar card.'
            required
            label='Date of Birth'
            maxDate={new Date()}
          ></DateInput>
          <InputField
            required
            isReadOnly
            name='age'
            type='number'
            label='Age'
          ></InputField>
          <InputField
            required
            type='number'
            name='contact_no'
            label='Contact No'
            placeholder='9999999999'
            inputClassName='phone-input'
          ></InputField>
          <InputField
            type='number'
            name='alternate_contact_no'
            placeholder='9999999999'
            label='Alternative Contact No'
            inputClassName='phone-input'
          ></InputField>
          <InputField name='reference' label='Reference'></InputField>
          <TextareaField
            required
            name='address'
            label='Address'
            rows={3}
          ></TextareaField>
          <TextareaField
            required
            rows={3}
            name='additional_info'
            label='What do you want to know?'
          ></TextareaField>
        </form>
        <div className='w-full flex justify-center items-center flex-col gap-5 mt-5'>
          <Button
            className='w-full'
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
            size='large'
            variant='primary-contained'
            disabled={isPending}
          >
            {isPending && <Loader2 className='animate-spin' />}
            Submit Enquiry
          </Button>
          <Button
            variant='primary-light-contained'
            className='w-full'
            type='button'
            onClick={() => navigate('../')}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
}
