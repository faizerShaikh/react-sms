export interface DatagridStoreInterface {
  [key: string]: {
    DatagridData: any[];
    DatagridDataCount: number;
  };
}

export interface DataGridDataKey {
  url: string;
  params?: any;
}
