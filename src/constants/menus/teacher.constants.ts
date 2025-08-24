import { MenuItem } from "@/interfaces";

export const TeacherMenus: MenuItem[] = [
  {
    label: "Home",
    icon: "ph-duotone ph-house",
    routerLink: "/teacher",
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: "Classrooms",
    icon: "ph-duotone ph-chalkboard",
    routerLink: "/teacher/classroom",
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: "Attendane",
    icon: "ph-duotone ph-user-focus",
    routerLink: "/teacher/my-attendance",
    routerLinkActiveOptions: { exact: true },
  },

  {
    label: "Announcements",
    icon: "ph-duotone ph-megaphone",
    routerLink: "/teacher/announcement",
    routerLinkActiveOptions: { exact: true },
  },
  {
    label: "Profile",
    icon: "ph-duotone ph-user",
    routerLink: "/teacher/settings",
    state: {
      hideOnMobile: true,
    },
  },
];
