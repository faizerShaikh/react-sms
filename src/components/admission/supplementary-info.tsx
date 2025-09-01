import * as yup from 'yup';
import { InputField, TextareaField } from '../form-components';

type Props = {};

export const supplementryInfoDefaultValues = {
  previous_school: '',
  previous_class: '',
  reason_of_leaving: '',
  history_of_disease: '',
  allergy_details: '',
};

export const supplementryInfoSchema = yup.object().shape({
  previous_school: yup.string(),
  previous_class: yup.string(),
  reason_of_leaving: yup.string(),
  history_of_disease: yup.string(),
  allergy_details: yup.string(),
});

export const getSupplementryInfoValuesToSubmit = (values: any) => {
  return {
    supplementary_data: {
      previous_school: values.previous_school.toUpperCase(),
      previous_class: values.previous_class.toUpperCase(),
      reason_of_leaving: values.reason_of_leaving.toUpperCase(),
      history_of_disease: values.history_of_disease.toUpperCase(),
      allergy_details: values.allergy_details.toUpperCase(),
    },
    is_update: values.is_update,
  };
};

export function SupplementaryInfo({}: Props) {
  return (
    <div className='gap-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <InputField name='previous_school' label='Previous School'></InputField>
      <InputField
        name='previous_class'
        label='Previous Class Attended'
      ></InputField>
      <TextareaField
        rows={4}
        name='reason_of_leaving'
        label='Reason of Leaving'
      ></TextareaField>
      <TextareaField
        rows={4}
        name='history_of_disease'
        label='History of Disease'
      ></TextareaField>
      <TextareaField
        rows={4}
        name='allergy_details'
        label='Any Allergy'
      ></TextareaField>
    </div>
  );
}
