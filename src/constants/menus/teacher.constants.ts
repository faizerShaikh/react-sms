import { MenuItem } from '@/interfaces';
import {
  PiChalkboardDuotone,
  PiHouseDuotone,
  PiMegaphoneDuotone,
  PiUserDuotone,
  PiUserFocusDuotone,
} from 'react-icons/pi';

export const TeacherMenus: MenuItem[] = [
  {
    label: 'Home',
    icon: PiHouseDuotone,
    routerLink: '/teacher',
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: 'Classrooms',
    icon: PiChalkboardDuotone,
    routerLink: '/teacher/classroom',
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: 'Attendane',
    icon: PiUserFocusDuotone,
    routerLink: '/teacher/my-attendance',
    routerLinkActiveOptions: { exact: true },
  },

  {
    label: 'Announcements',
    icon: PiMegaphoneDuotone,
    routerLink: '/teacher/announcement',
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: 'Profile',
    icon: PiUserDuotone,
    routerLink: '/teacher/settings',
    state: {
      hideOnMobile: true,
    },
  },
];
