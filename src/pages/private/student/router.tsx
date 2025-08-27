import { MyAnnouncements, StudentWrapper } from '@/components';
import { Route, Routes } from 'react-router';
import { FeesDetail } from './admission/fees-detail';
import { MyClassroom } from './classroom/my-classrooms';
import { StudentHomeworkDetails } from './classroom/student-homework-details';
import { MyProfile } from './my-profile';
import { StudentHome } from './student-home';

export function StudentRouter() {
  return (
    <Routes>
      <Route path='/student' element={<StudentWrapper />}>
        <Route path='announcements' element={<MyAnnouncements />} />
        <Route path='home' element={<StudentHome />} />
        <Route path='my-profile' element={<MyProfile />} />
        <Route path='homework' element={<MyClassroom />} />
        <Route path='homework/:id' element={<StudentHomeworkDetails />} />
        <Route path='admission'>
          <Route path='fees' element={<FeesDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
