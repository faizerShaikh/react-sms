export interface LovsStoreInterface {
    data: Record<string, any>;
}

export interface GetLovDataInterface {
    url: string;
    queryParams?: Record<string, any>;
}
