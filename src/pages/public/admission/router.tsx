import { Route, Routes } from 'react-router';
import { AdmissionInstructions } from './admission-instructions';
import { AdmissionLanding } from './admission-landing';
import { MyAdmissions } from './my-admissions';
import { NewAdmission } from './new-admission';
import { PartialAdmissions } from './partial-admissions';

type Props = {};

export function AdmissionRouter({}: Props) {
  return (
    <Routes>
      <Route path='/admission'>
        <Route path='' element={<AdmissionLanding />} />
        <Route path='partial-admissions' element={<PartialAdmissions />} />
        <Route path='my-admissions' element={<MyAdmissions />} />
        <Route path='instructions' element={<AdmissionInstructions />} />
        <Route path='new' element={<NewAdmission />} />
      </Route>
    </Routes>
  );
}
