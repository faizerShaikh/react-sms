import { BaseObjectInterface } from "@/interfaces";

export interface AttachmentInterface extends BaseObjectInterface {
  file: string;
  original_name: string;
  extension: string;
  size_in_kb: number;
}
