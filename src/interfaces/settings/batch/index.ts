import { BaseObjectInterface, ExcludeBaseObjectKeys } from "@/interfaces";

export interface BatchInterface extends BaseObjectInterface {
  name: string;
  label: string;
  in_time: string;
  out_time: string;
  batch_rules: Array<Record<string, string>>;
  standards: Array<string>;
}

export interface BatchStoreInterface {
  batches: BatchInterface[];
  admissionBatch: BatchInterface | null;
}

export interface CreateBatchInterface
  extends Omit<BatchInterface, ExcludeBaseObjectKeys> {}
