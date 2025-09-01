import { api } from '@/configs/axios';
import { ContentManagementComponentEnum } from '@/enum';
import { toFormData } from '@/lib/to-form-data-helper';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { FileInput } from '../form-components';
import { Heading } from '../heading';
import { QuillViewer } from '../quill/quill-viewer';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type Props = {
  isViewOnly?: boolean;
};

export const documentAttachedDefaultValues = {
  medical_certificate: null,
  leaving_certificate: null,
  student_photo: null,
  mother_photo: null,
  father_photo: null,
  birth_certificate: null,
  previous_report_card: null,
  udise_of_preschool: null,
  aadhaar_image: null,
};

const fileSizeValidation = (value: any) => {
  console.log(value);
  if (value && value instanceof File) {
    return value.size <= 150000;
  }
  return true;
};

export const documentAttachedSchema = yup.object().shape({
  medical_certificate: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nonNullable('Medical certificate is required')
    .required('Medical certificate is required'),
  leaving_certificate: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nullable(),
  student_photo: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nonNullable("Student's photo is required")
    .required("Student's photo is required"),
  mother_photo: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nonNullable("Mother's photo is required")
    .required("Mother's photo is required"),
  father_photo: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nonNullable("Father's photo is required")
    .required("Father's photo is required"),
  birth_certificate: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)

    .nonNullable('Birth certificate is required')
    .required('Birth certificate is required'),
  previous_report_card: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nullable(),
  udise_of_preschool: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nullable(),
  aadhaar_image: yup
    .mixed()
    .test('fileSize', 'File size must be less than 150KB', fileSizeValidation)
    .nullable(),
});

export const getDocumentAttachedValuesToSubmit = (values: any) => {
  const fileFields = [
    'medical_certificate',
    'leaving_certificate',
    'student_photo',
    'mother_photo',
    'father_photo',
    'caste_certificate',
    'birth_certificate',
    'previous_report_card',
    'udise_of_preschool',
    'aadhaar_image',
  ];
  return toFormData(values, fileFields);
};

export const getDocumentAttachedDefaultValues = (value: any) => {
  return {
    ...value,
    student_photo:
      value.student_photo === '/media/accounts/profiles/default.png'
        ? null
        : value.student_photo,
    father_photo:
      value.father_photo === '/media/accounts/profiles/default.png'
        ? null
        : value.father_photo,
    mother_photo:
      value.mother_photo === '/media/accounts/profiles/default.png'
        ? null
        : value.mother_photo,
    ...value.other_documents,
    is_update: true,
  };
};
export function DocumentAttached({ isViewOnly }: Props) {
  const {
    formState: { errors },
  } = useFormContext();
  const { data: contentData } = useQuery({
    queryKey: [
      'content-data',
      ContentManagementComponentEnum.DOCUMENT_UPLOAD_RULES,
    ],
    queryFn: () => {
      return api
        .get(
          '/schools/content-management/get/' +
            ContentManagementComponentEnum.DOCUMENT_UPLOAD_RULES,
        )
        .then((res) => res.data);
    },
  });
  return (
    <div>
      {contentData && (
        <div>
          <Heading>Kindly Note:</Heading>
          <QuillViewer content={contentData.content} />
        </div>
      )}
      <div className='mt-5 gap-5 grid sm:grid-cols-1 w-full'>
        <FileInput
          isReadOnly={isViewOnly}
          name='medical_certificate'
          helpText='Choose a file or drag & drop it here'
          label='Medical Certificate'
          required
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          name='leaving_certificate'
          helpText='Choose a file or drag & drop it here'
          label='Leaving/Transfer Certificate Of Previous School'
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          required
          name='student_photo'
          label='Student Photos'
          accept='image/*'
          helpText='Passport Size Photographs With Red
  Background(Student)'
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          required
          accept='image/*'
          name='mother_photo'
          helpText='Choose a file or drag & drop it here'
          label="Mother's Photo"
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          required
          accept='image/*'
          name='father_photo'
          helpText='Choose a file or drag & drop it here'
          label="Father's Photo"
        ></FileInput>

        <FileInput
          isReadOnly={isViewOnly}
          name='caste_certificate'
          helpText='Choose a file or drag & drop it here'
          label='Caste Certificate, If Any'
        ></FileInput>

        <FileInput
          isReadOnly={isViewOnly}
          required
          name='birth_certificate'
          helpText='Choose a file or drag & drop it here'
          label='Birth Certificate
  (Original Or True Copies)'
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          name='previous_report_card'
          helpText='Choose a file or drag & drop it here'
          label='Report Card Of Previous School'
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          name='udise_of_preschool'
          helpText='Choose a file or drag & drop it here'
          label='Udise ID Of Previous School/Student'
        ></FileInput>
        <FileInput
          isReadOnly={isViewOnly}
          name='aadhaar_image'
          helpText='Choose a file or drag & drop it here'
          label='Xerox Copy Of Aadhar Card'
        ></FileInput>
      </div>
      {errors && Object.keys(errors).length > 0 && (
        <Alert
          variant='destructive'
          className='mt-5 flex justify-start items-start gap-2'
        >
          <i className='ph-duotone ph-warning-circle text-error text-lg mt-1'></i>
          <div>
            <AlertTitle>Error Occurred</AlertTitle>
            <AlertDescription className='text-red-400'>
              Please check the fields and try again.
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
