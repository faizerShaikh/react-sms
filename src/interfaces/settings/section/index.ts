import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface SectionInterface extends BaseObjectInterface {
  name: string;
  label: string;
}

export interface SectionStoreInterface {
  sections: SectionInterface[];
}

export interface CreateSectionInterface
  extends Omit<SectionInterface, ExcludeBaseObjectKeys> {}
