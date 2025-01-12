export type IStoreQuantity = {
  totalQuantityInAllStore: number;
  items: IDetailQuantity[];
  variantItems: IDetailQuantity[];
};
export type IDetailQuantity = {
  storeId: string;
  storeName: string;
  quantity: number;
};
