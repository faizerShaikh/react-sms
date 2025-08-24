import { BaseObjectInterface } from "./base-object.interface";

export type ExcludeBaseObjectKeys = keyof BaseObjectInterface;

export interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  routerLinkActiveOptions?: { exact?: boolean };
  items?: MenuItem[];
  state?: any;
}
