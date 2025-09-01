import { api } from '@/configs/axios';
import { BACKEND_DATE_FORMAT, BLOOD_GROUPS } from '@/constants';
import { useAuth } from '@/context/auth-context';
import { toFormData } from '@/lib/to-form-data-helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as yup from 'yup';
import { calculateAge } from '../../lib/utils';
import {
  DateInput,
  FileInput,
  InputField,
  RadioInput,
  SelectInput,
  TextareaField,
} from '../form-components';
import { Button } from '../ui';
import { Form } from '../ui/form';

type Props = {};

const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  middle_name: yup.string().required('Middle name is required'),
  last_name: yup.string().required('Last name is required'),
  dob: yup.string().required('Date of birth is required'),
  age: yup.string().required('Age is required'),
  academic_year: yup
    .mixed()
    .required('Academic year is required')
    .nonNullable('Academic year is required'),
  standard: yup
    .mixed()
    .required('Standard is required')
    .nonNullable('Standard is required'),
  fathers_name: yup.string().required('Fathers name is required'),
  fathers_contact_no: yup.string().required('Fathers contact no. is required'),
  mothers_name: yup.string().required('Mothers name is required'),
  mothers_contact_no: yup.string().required('Mothers contact no. is required'),
  address: yup.string().required('Address is required'),
  guardians_name_relation: yup
    .string()
    .required('Guardians name & relation is required'),
  guardians_contact_no: yup
    .string()
    .required('Guardians contact no. is required'),
  photo: yup
    .mixed()
    .required('Photo is required')
    .nonNullable('Photo is required'),
  blood_group: yup.string().required('Blood group is required'),
  gender: yup.string().required('Gender is required'),
});

export function IdCardForm({}: Props) {
  const {
    state: { userData },
    setIdCardFilled,
  } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      age: '',
      academic_year: '',
      standard: '',
      fathers_name: '',
      fathers_contact_no: '',
      mothers_name: '',
      mothers_contact_no: '',
      address: '',
      guardians_name_relation: '',
      guardians_contact_no: '',
      photo: '',
      blood_group: '',
      gender: '',
    },
    resolver: yupResolver(schema),
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

  const { data: studentData } = useQuery({
    queryKey: ['student-data', userData?.student_id],
    queryFn: () =>
      api
        .get(`/admin/student-api/${userData?.student_id}/`)
        .then((res) => res.data),
    enabled: !!userData?.student_id,
  });

  useEffect(() => {
    if (studentData) {
      form.setValue('first_name', studentData?.first_name);
      form.setValue('middle_name', studentData?.middle_name);
      form.setValue('last_name', studentData?.last_name);
      form.setValue('dob', studentData?.dob);
      form.setValue('age', studentData?.age);
      form.setValue('blood_group', studentData?.blood_group);
      form.setValue('gender', studentData?.gender);
      form.setValue(
        'academic_year',
        studentData?.active_admission?.academic_year,
      );
      form.setValue('standard', studentData?.standard);
      form.setValue('fathers_name', studentData?.father?.name);
      form.setValue('fathers_contact_no', studentData?.father?.phone_number);
      form.setValue('mothers_name', studentData?.mother?.name);
      form.setValue('mothers_contact_no', studentData?.mother?.phone_number);
      form.setValue('address', studentData?.studentotherdetail?.address);
    }
  }, [studentData]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => api.post('/student-id-card/create/', data),
    onSuccess: () => {
      toast.success('ID card form submitted successfully');

      if (userData) {
        setIdCardFilled();
      }
      navigate('/student/home');
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    const formData = toFormData(data, ['photo']);
    formData.append('standard', data.standard.id);
    formData.append('student', userData?.student_id || '');
    formData.append('academic_year', data.academic_year.id);
    formData.append('dob', formatDate(data.dob, BACKEND_DATE_FORMAT));
    mutate(formData);
  };
  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mt-6 gap-4 grid grid-cols-1 w-full'>
          <FileInput
            required
            label='Student Photo'
            name='photo'
            accept='image/*'
          ></FileInput>
          <InputField
            required
            label='First Name'
            name='first_name'
          ></InputField>
          <InputField
            required
            label='Middle Name'
            name='middle_name'
          ></InputField>
          <InputField required label='Last Name' name='last_name'></InputField>
          <DateInput
            required
            maxDate={new Date()}
            label='Date of Birth'
            name='dob'
          ></DateInput>
          <InputField
            required
            isReadOnly
            disabled
            label='Age'
            name='age'
          ></InputField>
          <SelectInput
            required
            options={BLOOD_GROUPS}
            getOptionLabel={(item: any) => item}
            label='Blood Group'
            name='blood_group'
          ></SelectInput>
          <RadioInput
            orientation='vertical'
            required
            options={[
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
            ]}
            label='Gender'
            name='gender'
          ></RadioInput>
          <SelectInput
            required
            options={academicYears || []}
            getOptionLabel={(item: any) => item?.name}
            label='Academic Year'
            name='academic_year'
          ></SelectInput>
          <SelectInput
            required
            options={standards || []}
            getOptionLabel={(item: any) => item?.label}
            label='Standard'
            name='standard'
          ></SelectInput>
          <InputField
            required
            label='Fathers Name'
            name='fathers_name'
          ></InputField>
          <InputField
            required
            label='Fathers Contact No.'
            name='fathers_contact_no'
            type='number'
          ></InputField>
          <InputField
            required
            label='Mothers Name'
            name='mothers_name'
          ></InputField>
          <InputField
            required
            label='Mothers Contact No.'
            name='mothers_contact_no'
            type='number'
          ></InputField>
          <TextareaField
            required
            rows={3}
            label='Address'
            name='address'
          ></TextareaField>
          <InputField
            required
            label='guardians Name & Relation'
            name='guardians_name_relation'
          ></InputField>
          <InputField
            required
            label='guardians Contact No.'
            name='guardians_contact_no'
            type='number'
          ></InputField>
        </div>
        <div className='flex gap-4 justify-end self-stretch my-4'>
          {/* // <button (click)="onBack()" size="small" smsButton color="primary" variant="outlined" type="button">
        //     <i className="ph-bold ph-caret-left"></i> Back
        // </button>
        // <button [loading]="isLoading$ | async" smsButton color="primary" size="small" type="submit">
        //     Save <i className="ph-bold ph-caret-right"></i>
        // </button> */}
        </div>
        <div className='w-full flex justify-center items-center flex-col gap-5 mt-5'>
          <Button
            disabled={isPending}
            type='submit'
            variant='primary-contained'
            size='large'
            className='w-full'
          >
            {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
