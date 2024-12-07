export type IStoreQuantity = {
  totalQuantityInAllStore: number;
  items: IDetailQuantity[];
};
export type IDetailQuantity = {
  storeId: string;
  storeName: string;
  quantity: number;
};
