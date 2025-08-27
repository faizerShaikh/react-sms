import { MenuItem } from '@/interfaces';
import {
  PiCaretRightDuotone,
  PiChalkboardTeacherDuotone,
  PiClipboardTextDuotone,
  PiDiamondsFourDuotone,
  PiGearDuotone,
  PiIdentificationCardDuotone,
  PiMegaphoneSimpleDuotone,
  PiStudentDuotone,
  PiUsersFourDuotone,
} from 'react-icons/pi';

export const AdminMenus: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: PiDiamondsFourDuotone,
    routerLink: '/admin',
  },
  {
    label: 'Admissions',
    icon: PiIdentificationCardDuotone,
    items: [
      {
        label: 'Admission Requests',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/admission/requests',
      },
      {
        label: 'Admission Entries',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/admission/all',
      },
      {
        label: 'Enquiries',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/admission/enquiries',
      },
    ],
  },
  {
    label: 'Students',
    icon: PiStudentDuotone,
    items: [
      {
        label: 'All Students',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/student/all',
      },
      {
        label: 'Deactivated Students',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/student/deactivated',
      },
      {
        label: 'Bulk Import',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/student/bulk-import',
      },
      {
        label: 'Submitted ID Card List',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/student/submitted-id-card-list',
      },
    ],
  },
  {
    label: 'Teachers',
    icon: PiChalkboardTeacherDuotone,
    items: [
      {
        label: 'All Teachers',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/teacher/all',
      },
      {
        label: 'Teachers Attendance',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/teacher/attendance',
        routerLinkActiveOptions: {
          exact: true,
        },
      },
    ],
  },
  {
    label: 'Classrooms',
    icon: PiUsersFourDuotone,
    items: [
      {
        label: 'All Classroom',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/classroom/all',
      },
      {
        label: 'Subject',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/classroom/subject',
      },
    ],
  },

  {
    label: 'Announcements',
    icon: PiMegaphoneSimpleDuotone,
    routerLink: '/admin/announcement',
  },

  {
    label: 'Reports',
    icon: PiClipboardTextDuotone,
    items: [
      {
        label: 'Student Fees Report',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/reports/student-fees',
      },
    ],
  },

  {
    label: 'Settings',
    icon: PiGearDuotone,
    items: [
      {
        label: 'Users',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/user/all',
      },
      {
        label: 'Academic Year',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/academic-year/all',
      },
      {
        label: 'Batch',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/batch/all',
      },
      {
        label: 'Section',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/section/all',
      },
      {
        label: 'Standard',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/standard/all',
      },
      {
        label: 'Fees',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/fees/all',
      },
      {
        label: 'Content Management',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/content-management/all',
      },
      {
        label: 'School Config',
        icon: PiCaretRightDuotone,
        routerLink: '/admin/settings/school-config',
      },
    ],
  },
];
