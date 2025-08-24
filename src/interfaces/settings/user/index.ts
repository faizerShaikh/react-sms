import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";
import { GenderOptions } from "../../student";

export interface UserInterface extends BaseObjectInterface {
  full_name: string;
  email?: string;
  username: string;
  phone: string;
  is_active: boolean;
  is_admin: boolean;
  user_type: string;
  gender: GenderOptions;
}

export interface UserStoreInterface {
  users: UserInterface[];
}

export interface CreateUserInterface
  extends Omit<UserInterface, ExcludeBaseObjectKeys> {}
