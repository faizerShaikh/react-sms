import { MenuItem, StudentDataInterface } from '@/interfaces';
import {
  PiHouseDuotone,
  PiIdentificationCardDuotone,
  PiReceiptDuotone,
  PiUserDuotone,
} from 'react-icons/pi';
export const getStudentMenus = (useData: StudentDataInterface): MenuItem[] => {
  return [
    {
      label: 'Dashboard',
      icon: PiHouseDuotone,
      routerLink: '/student/home',
    },
    {
      label: 'Admission',
      icon: PiIdentificationCardDuotone,
      routerLink: `/student/admission/${useData.admission_id}`,
      queryParams: `view=true&admissionId=${useData.admission_id}&studentId=${useData.student_id}`,
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Fees',
      icon: PiReceiptDuotone,
      routerLink: '/student/admission/fees',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Profile',
      icon: PiUserDuotone,
      routerLink: '/student/my-profile',
    },
  ];
};
