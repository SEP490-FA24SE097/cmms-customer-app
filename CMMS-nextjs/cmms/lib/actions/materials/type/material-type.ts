export type IMaterial = {
  material: IMaterialChild;
  variants: IVariants[];
};

export type IMaterialChild = {
  id: string;
  name: string;
  barCode: number;
  category: string;
  unit: string;
  materialCode: string;
  supplier: string;
  description: string;
  salePrice: number;
  costPrice: number;
  weightValue: number;
  minStock: number;
  discount: string;
  afterDiscountPrice: number;
  isActive: boolean;
  brand: string;
  isRewardEligible: boolean;
  imageUrl: string;
  subImages: ISubimage[];
};

export type IVariants = {
  variantId: string;
  sku: string;
  price: number;
  image: string;
  costPrice: number;
  discount: string | null;
  afterDiscountPrice: number | null;
  attributes: IAttribute[];
};

export type IAttribute = {
  name: string;
  value: string;
};
export type ISubimage = {
  id: string;
  subImageUrl: string;
};
