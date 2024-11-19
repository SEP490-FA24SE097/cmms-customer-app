import { IStoreItems } from "./cart-type";

export type ICheckout = {
    totalAmount: number;
    discount: number;
    salePrice: number;
    items: IItem[];
}

export type IItem = {
    storeId: string,
    storeName: string,
    totalStoreAmount: number,
    storeItems: IStoreItems[],
}