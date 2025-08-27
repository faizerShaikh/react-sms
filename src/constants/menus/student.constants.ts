import { MenuItem } from '@/interfaces';
import {
  PiHouseDuotone,
  PiIdentificationCardDuotone,
  PiReceiptDuotone,
  PiUserDuotone,
} from 'react-icons/pi';
export const getStudentMenus = (): MenuItem[] => {
  return [
    {
      label: 'Dashboard',
      icon: PiHouseDuotone,
      routerLink: '/student/home',
    },
    {
      label: 'Admission',
      icon: PiIdentificationCardDuotone,
      routerLink: '/student/admission',
      // queryParams: { view: true },
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Fees Details',
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
