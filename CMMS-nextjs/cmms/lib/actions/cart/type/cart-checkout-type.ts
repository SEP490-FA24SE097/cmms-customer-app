import { IStoreItems } from "./cart-type";

export type ICheckout = {
  totalAmount: number;
  discount: number;
  salePrice: number;
  shippingFee: number;

  items: IItem[];
};

export type IItem = {
  storeId: string;
  storeName: string;
  isOver200km: boolean;
  totalStoreAmount: number;
  shippngFree: number;
  finalPrice: number;
  shippingDistance: number;
  storeItems: IStoreItems[];
};
