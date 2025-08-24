import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface ContentManagementInterface extends BaseObjectInterface {
  name: string;
  description: string;
  component: string;
  content: string;
}

export interface ContentManagementStoreInterface {
  contentManagementData: ContentManagementInterface | null;
  contentManagementList: ContentManagementInterface[] | null;
}

export interface CreateContentManagementInterface
  extends Omit<ContentManagementInterface, ExcludeBaseObjectKeys> {}
