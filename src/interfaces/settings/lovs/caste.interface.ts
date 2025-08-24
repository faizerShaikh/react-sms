import { BaseObjectInterface } from "@/interfaces";

export interface SubCasteInterface extends BaseObjectInterface {
  name: string;
  label: string;
  parent_caste: string;
}

export interface CasteInterface extends BaseObjectInterface {
  sub_castes: Array<SubCasteInterface>;
  name: string;
  label: string;
}

export interface MotherTongueInterface extends BaseObjectInterface {
  name: string;
  label: string;
}

export interface ReligionInterface extends BaseObjectInterface {
  label: string;
  name: string;
}
