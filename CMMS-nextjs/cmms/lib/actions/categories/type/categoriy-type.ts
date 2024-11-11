export type ICategory = {
  id: string;
  name: string;
  subCategories: ISubCategories[];
};

export type ISubCategories = {
  id: string;
  name: string;
};
