import { MenuItem } from "@/interfaces";

export const AdminMenus: MenuItem[] = [
  {
    label: "Dashboard",
    icon: "ph-duotone ph-diamonds-four rotate-45",
    routerLink: "/admin",
  },
  {
    label: "Admissions",
    icon: "ph-duotone ph-identification-card",
    items: [
      {
        label: "Admission Requests",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/admission/requests",
      },
      {
        label: "Admission Entries",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/admission/all",
      },
      {
        label: "Enquiries",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/admission/enquiries",
      },
    ],
  },
  {
    label: "Students",
    icon: "ph-duotone ph-student",
    items: [
      {
        label: "All Students",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/student/all",
      },
      {
        label: "Deactivated Students",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/student/deactivated",
      },
      {
        label: "Bulk Import",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/student/bulk-import",
      },
      {
        label: "Submitted ID Card List",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/student/submitted-id-card-list",
      },
    ],
  },
  {
    label: "Teachers",
    icon: "ph-duotone ph-chalkboard-teacher",
    items: [
      {
        label: "All Teachers",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/teacher/all",
      },
      {
        label: "Teachers Attendance",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/teacher/attendance",
        routerLinkActiveOptions: {
          exact: true,
        },
      },
    ],
  },
  {
    label: "Classrooms",
    icon: "ph-duotone ph-users-four",
    items: [
      {
        label: "All Classroom",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/classroom/all",
      },
      {
        label: "Subject",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/classroom/subject",
      },
    ],
  },

  {
    label: "Announcements",
    icon: "ph-duotone ph-megaphone-simple",
    routerLink: "/admin/announcement",
  },

  {
    label: "Reports",
    icon: "ph-duotone ph-clipboard-text",
    items: [
      {
        label: "Student Fees Report",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/reports/student-fees",
      },
    ],
  },

  {
    label: "Settings",
    icon: "ph-duotone ph-gear",
    items: [
      {
        label: "Users",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/user/all",
      },
      {
        label: "Academic Year",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/academic-year/all",
      },
      {
        label: "Batch",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/batch/all",
      },
      {
        label: "Section",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/section/all",
      },
      {
        label: "Standard",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/standard/all",
      },
      {
        label: "Fees",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/fees/all",
      },
      {
        label: "Content Management",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/content-management/all",
      },
      {
        label: "School Config",
        icon: "ph-fill ph-caret-right",
        routerLink: "/admin/settings/school-config",
      },
    ],
  },
];
