export type ICart = {
  total: number;
  storeItems : IStoreItems[];
};

export type IStoreItems = {
  itemName: string;
  imageUrl: string;
  inOrder: number
  salePrice: number;
  itemTotalPrice: number;
  isChangeQuantity: boolean;
  inStock:number,
  quantity: number;
  materialId: string;
  variantId: string;
  storeId: string;
}