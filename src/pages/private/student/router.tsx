import {
  AnnouncementDetail,
  MyAnnouncements,
  StudentWrapper,
} from '@/components';
import { Route, Routes } from 'react-router';
import { AdmissionDetails } from './admission/admission-details';
import { FeesDetail } from './admission/fees-detail';
import { IdCard } from './admission/id-card';
import { UploadDocument } from './admission/upload-document';
import { MyClassroom } from './classroom/my-classrooms';
import { StudentHomeworkDetails } from './classroom/student-homework-details';
import { MyProfile } from './my-profile';
import { StudentHome } from './student-home';

export function StudentRouter() {
  return (
    <Routes>
      <Route path='/student' element={<StudentWrapper />}>
        <Route path='announcements' element={<MyAnnouncements />} />
        <Route path='announcements/:id' element={<AnnouncementDetail />} />
        <Route path='home' element={<StudentHome />} />
        <Route path='my-profile' element={<MyProfile />} />
        <Route path='homework' element={<MyClassroom />} />
        <Route path='homework/:id' element={<StudentHomeworkDetails />} />
        <Route path='admission'>
          <Route path='fees' element={<FeesDetail />} />
          <Route path='id-card-form' element={<IdCard />} />
          <Route path='documents' element={<UploadDocument />} />
          <Route path=':id' element={<AdmissionDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
