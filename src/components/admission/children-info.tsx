import { api } from '@/configs/axios';
import { BACKEND_DATE_FORMAT, BLOOD_GROUPS } from '@/constants';
import { PostChildrenInfoInterface } from '@/interfaces';
import { StandardInterface } from '@/interfaces/settings/standard';
import { useQueries, useQuery } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';
import {
  DateInput,
  InputField,
  RadioInput,
  SelectInput,
} from '../form-components';
type Props = {};

export const getChildrenInfoValuesToSubmit = (values: any) => {
  let standard: StandardInterface = values.standard;

  const start = parse(
    standard.age_criteria_start_threshold,
    'dd/MM/yyyy',
    new Date(),
  );

  const end = parse(
    standard.age_criteria_end_threshold,
    'dd/MM/yyyy',
    new Date(),
  );

  const date = new Date(values.dob);

  if (!(date.getTime() >= start.getTime() && date.getTime() <= end.getTime())) {
    toast.error(
      `We regret to inform you that ${
        values.first_name
      } is not eligible for admission. Admission to this standard is open for students born between ${
        standard.age_criteria_start_threshold
      } and ${standard.age_criteria_end_threshold} only.`,
    );

    return;
  }
  const data: PostChildrenInfoInterface = {
    step: 1,
    standard: values.standard.id,
    batch: values.batch.id,
    student: values.student,
    academic_year: values.academic_year.id,
    admission: values.admission,
    phone: values.phone,
    is_update: values.is_update,
    student_data: {
      ...values,
      first_name: values.first_name.toUpperCase(),
      middle_name: values.middle_name.toUpperCase(),
      last_name: values.last_name.toUpperCase(),
      name_as_aadhar: values.name_as_aadhar.toUpperCase(),
      nationality: values.nationality.toUpperCase(),
      place_of_birth: values.place_of_birth.toUpperCase(),
      caste: values.caste.id,
      sub_caste: values.sub_caste.id,
      dob: format(values.dob, BACKEND_DATE_FORMAT),
    },
  };

  return data;
};

export const ChildernInfoDefultValues = {
  academic_year: null,
  standard: null,
  batch: null,
  first_name: '',
  aadhaar_number: '',
  middle_name: '',
  last_name: '',
  name_as_aadhar: '',
  dob: '',
  place_of_birth: '',
  nationality: '',
  mother_tongue: '',
  gender: '',
  religion: null,
  caste: null,
  sub_caste: null,
  blood_group: '',
  transport_facility_required: null,
  admission: null,
  student: null,
  phone: '',
  is_update: false,
};

export const childernInfoSchema = yup.object({
  academic_year: yup
    .mixed()
    .required('Academic Year is required')
    .nonNullable('Academic Year is required'),
  standard: yup
    .mixed()
    .required('Standard is required')
    .nonNullable('Standard is required'),
  batch: yup
    .mixed()
    .required('Batch is required')
    .nonNullable('Batch is required'),
  first_name: yup.string().required('First Name is required'),
  aadhaar_number: yup.string().when('standard', {
    is: (standard: any) => standard?.is_aadhaar_required,
    then: (schema) => schema.required('Aadhar Number is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  middle_name: yup.string().required('Middle Name is required'),
  last_name: yup.string().required('Last Name is required'),
  name_as_aadhar: yup.string().required('Name as Aadhar is required'),
  dob: yup.string().required('Date of Birth is required'),
  place_of_birth: yup.string().required('Place of Birth is required'),
  nationality: yup
    .string()
    .required('Nationality is required')
    .nonNullable('Nationality is required'),
  mother_tongue: yup.string().required('Mother Tongue is required'),
  gender: yup.string().required('Gender is required'),
  religion: yup
    .mixed()
    .required('Religion is required')
    .nonNullable('Religion is required'),
  caste: yup
    .mixed()
    .required('Caste is required')
    .nonNullable('Caste is required'),
  sub_caste: yup
    .mixed()
    .required('Sub Caste is required')
    .nonNullable('Sub Caste is required'),
  blood_group: yup.string().required('Blood Group is required'),
  transport_facility_required: yup
    .string()
    .required('Transport Facility is required'),
  admission: yup.string().notRequired(),
  student: yup.string().notRequired(),
  phone: yup.string().required('Phone is required'),
  is_update: yup.boolean(),
});

export function ChildrenInfo({}: Props) {
  const { watch } = useFormContext();

  const [academicYears, religion, castes, motherTongue] = useQueries({
    queries: [
      {
        queryKey: ['academic-years'],
        queryFn: () => api.get('/academic-year/').then((res) => res.data),
      },
      {
        queryKey: ['religion'],
        queryFn: () => api.get('/religion/').then((res) => res.data),
      },
      {
        queryKey: ['castes'],
        queryFn: () => api.get('/castes/').then((res) => res.data),
      },
      {
        queryKey: ['mother-tongue'],
        queryFn: () => api.get('/mother-tongue/').then((res) => res.data),
      },
    ],
  });

  const academicYear: any = watch('academic_year');

  const { data: standards } = useQuery({
    queryKey: ['standards', academicYear],
    queryFn: () =>
      api
        .get(`/standards-for-admission/?academic_year=${academicYear.id}`)
        .then((res) => res.data),
    enabled: !!academicYear,
  });

  const caste = watch('caste');
  const standard = watch('standard');

  return (
    <div className='mt-6 gap-3 grid sm:grid-cols-1 w-full'>
      <InputField
        label='Phone Number'
        name='phone'
        placeholder='9999999999'
        required
        helpText='Please enter whatsapp number, we will be sending notifications to this number.'
      ></InputField>
      <SelectInput
        required
        options={academicYears?.data || []}
        label='Academic Year'
        getOptionLabel={(item: any) => item.name}
        name='academic_year'
      ></SelectInput>
      <SelectInput
        required
        options={standards || []}
        label='Select Class'
        getOptionLabel={(item: any) => item.label}
        name='standard'
      ></SelectInput>
      <SelectInput
        options={standard?.batches || []}
        required
        label='Select Batch'
        getOptionLabel={(item: any) => item.label}
        name='batch'
      ></SelectInput>
      <InputField
        required={standard?.is_aadhaar_required}
        helpText={
          standard?.is_aadhaar_required
            ? "Please Enter a valid aadhar number, if aadhar number is not available then add '9' 12 times"
            : undefined
        }
        label='Aadhar ID'
        name='aadhaar_number'
        placeholder='9999 9999 9999'
      ></InputField>

      <InputField
        label='First Name'
        name='first_name'
        required
        helpText='First Name should be as per Aadhar.'
      ></InputField>
      <InputField
        label='Middle Name'
        name='middle_name'
        required
        helpText='Middle Name should be as per Aadhar.'
      ></InputField>
      <InputField
        label='Last Name'
        name='last_name'
        required
        helpText='Last Name should be as per Aadhar.'
      ></InputField>
      <InputField
        label='Name as per Aadhar'
        name='name_as_aadhar'
        helpText='Full Name should be as per Aadhar.'
      ></InputField>
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

      <DateInput required label='Date of Birth' name='dob'></DateInput>
      <InputField required label='Nationality' name='nationality'></InputField>
      <InputField
        required
        label='Place of Birth'
        name='place_of_birth'
      ></InputField>
      <SelectInput
        options={motherTongue?.data || []}
        label='Mother Tongue'
        name='mother_tongue'
        required
        getOptionLabel={(item: string) => item}
      ></SelectInput>
      <RadioInput
        orientation='vertical'
        required
        options={[
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ]}
        label='Transport Facility'
        name='transport_facility_required'
      ></RadioInput>
      <SelectInput
        options={religion?.data || []}
        label='Select Religion'
        required
        getOptionLabel={(item: string) => item}
        name='religion'
      ></SelectInput>
      <SelectInput
        options={castes?.data || []}
        label='Select Caste'
        required
        getOptionLabel={(item: any) => item.label}
        name='caste'
      ></SelectInput>
      <SelectInput
        options={caste?.sub_castes || []}
        label='Sub Caste'
        required
        getOptionLabel={(item: any) => item.label}
        name='sub_caste'
      ></SelectInput>
      <SelectInput
        options={BLOOD_GROUPS || []}
        required
        getOptionLabel={(item: string) => item}
        label='Blood Group'
        name='blood_group'
      ></SelectInput>
    </div>
  );
}
