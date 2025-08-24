import { MenuItem } from "@/interfaces";

export const getStudentMenus = (): MenuItem[] => {
  return [
    {
      label: "Dashboard",
      icon: "ph-duotone ph-house",
      routerLink: "/student/home",
    },
    {
      label: "Admission",
      icon: "ph-duotone ph-identification-card",
      routerLink: "/student/admission",
      // queryParams: { view: true },
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: "Fees Details",
      icon: "ph-duotone ph-receipt",
      routerLink: "/student/admission/fees",
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: "Profile",
      icon: "ph-duotone ph-user",
      routerLink: "/student/my-profile",
    },
  ];
};
