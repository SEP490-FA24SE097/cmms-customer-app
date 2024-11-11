"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { ICategory } from "../type/categoriy-type";
import { getCategories } from "../action/category-action";

export const useGetCategory = () => {
  return useQuery<ApiListResponse<ICategory>>({
    queryKey: ["CATEGORY_LIST"],
    queryFn: () => getCategories(),
  });
};
