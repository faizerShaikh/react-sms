import { cn } from '@/lib/utils';
import { PiCaretDoubleUp } from 'react-icons/pi';
import * as yup from 'yup';
import { InputField, TextareaField } from '../form-components';
import { Heading } from '../heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
type Props = {
  isViewOnly?: boolean;
};

export const parentInfoDefaultValues = {
  father: {
    name: '',
    educational_qualification: '',
    occupation: '',
    phone_number: '',
    alternate_phone_number: '',
    designation: '',
    email: '',
    annual_income: '',
    aadhaar_number: '',
    pan_number: '',
  },
  mother: {
    name: '',
    educational_qualification: '',
    occupation: '',
    designation: '',
    phone_number: '',
    alternate_phone_number: '',
    email: '',
    annual_income: '',
    aadhaar_number: '',
    pan_number: '',
  },
  other_detail: {
    address: '',
    permanent_address: '',
  },
  is_update: false,
};

export const parentsInfoSchema = yup.object({
  father: yup.object({
    name: yup.string().required("Father's Name is required"),
    educational_qualification: yup
      .string()
      .required('Education Qualification is required'),
    occupation: yup.string().required('Occupation is required'),
    phone_number: yup.string().required('Phone Number is required'),
    alternate_phone_number: yup.string(),
    designation: yup.string().required('Designation is required'),
    email: yup.string().required('Email is required'),
    annual_income: yup.string().required('Annual Income is required'),
    aadhaar_number: yup.string(),
    pan_number: yup.string(),
  }),
  mother: yup.object({
    name: yup.string().required("Mother's Name is required"),
    educational_qualification: yup
      .string()
      .required('Education Qualification is required'),
    occupation: yup.string().required('Occupation is required'),
    designation: yup.string().required('Designation is required'),
    phone_number: yup.string().required('Phone Number is required'),
    alternate_phone_number: yup.string(),
    email: yup.string().required('Email is required'),
    annual_income: yup.string().required('Annual Income is required'),
    aadhaar_number: yup.string(),
    pan_number: yup.string(),
  }),
  other_detail: yup.object({
    address: yup.string().required('Address is required'),
    permanent_address: yup.string().required('Permanent Address is required'),
  }),
});

export const getParentsInfoValuesToSubmit = (values: any) => {
  return {
    is_update: values.is_update,
    father: {
      ...values.father,
      photo: undefined,
      name: values.father.name.toUpperCase(),
      educational_qualification:
        values.father.educational_qualification.toUpperCase(),
      occupation: values.father.occupation.toUpperCase(),
      designation: values.father.designation.toUpperCase(),
      email: values.father.email.toUpperCase(),
    },
    mother: {
      ...values.mother,
      photo: undefined,
      name: values.mother.name.toUpperCase(),
      educational_qualification:
        values.mother.educational_qualification.toUpperCase(),
      occupation: values.mother.occupation.toUpperCase(),
      designation: values.mother.designation.toUpperCase(),
      email: values.mother.email.toUpperCase(),
    },
    other_detail: {
      ...values.other_detail,
      address: values.other_detail.address.toUpperCase(),
      permanent_address: values.other_detail.permanent_address.toUpperCase(),
    },
  };
};

export function ParentsInfo({ isViewOnly }: Props) {
  return (
    <div className='gap-5 grid sm:grid-cols-1 w-full mt-5'>
      <Accordion
        type='multiple'
        defaultValue={['father', 'mother', 'other_detail']}
      >
        <AccordionItem className='rounded-none border-0' value='father'>
          <AccordionTrigger
            className='hover:no-underline border-b py-2 rounded-none'
            Icon={PiCaretDoubleUp}
          >
            <Heading>FATHER'S DETAILS</Heading>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={cn(
                'gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                isViewOnly && 'mt-5',
              )}
            >
              <InputField
                isReadOnly={isViewOnly}
                required
                label="Father's Name"
                name='father.name'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Education Qualification'
                name='father.educational_qualification'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Occupation (Job/Buisness)'
                name='father.occupation'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Designation'
                helpText='Please add your current designation'
                name='father.designation'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Phone Number'
                name='father.phone_number'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Alternative Phone Number'
                name='father.alternate_phone_number'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Email'
                name='father.email'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                name='father.annual_income'
                label='Annual Income'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Aadhar ID'
                name='father.aadhaar_number'
                placeholder='9999 9999 9999'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Pan Number'
                name='father.pan_number'
                placeholder='AAAAA9999A'
              ></InputField>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='rounded-none border-0' value='mother'>
          <AccordionTrigger
            className='hover:no-underline border-b py-2 rounded-none'
            Icon={PiCaretDoubleUp}
          >
            <Heading>MOTHER'S DETAILS</Heading>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={cn(
                'gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                isViewOnly && 'mt-5',
              )}
            >
              <InputField
                isReadOnly={isViewOnly}
                required
                label="Father's Name"
                name='mother.name'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Education Qualification'
                name='mother.educational_qualification'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Occupation (Job/Buisness)'
                name='mother.occupation'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Designation'
                helpText='Please add your current designation'
                name='mother.designation'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Phone Number'
                name='mother.phone_number'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Alternative Phone Number'
                name='mother.alternate_phone_number'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                label='Email'
                name='mother.email'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                required
                name='mother.annual_income'
                label='Annual Income'
                type='number'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Aadhar ID'
                name='mother.aadhaar_number'
                placeholder='9999 9999 9999'
              ></InputField>
              <InputField
                isReadOnly={isViewOnly}
                label='Pan Number'
                name='mother.pan_number'
                placeholder='AAAAA9999A'
              ></InputField>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className='rounded-none border-0' value='mother'>
          <AccordionTrigger
            className='hover:no-underline border-b py-2 rounded-none'
            Icon={PiCaretDoubleUp}
          >
            <Heading>OTHER DETAILS</Heading>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={cn(
                'gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                isViewOnly && 'mt-5',
              )}
            >
              <TextareaField
                isReadOnly={isViewOnly}
                required
                label='Address'
                name='other_detail.address'
                rows={4}
              ></TextareaField>
              <TextareaField
                isReadOnly={isViewOnly}
                required
                label='Permanent Address'
                name='other_detail.permanent_address'
                rows={4}
              ></TextareaField>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
