"use client";

import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { IStoreQuantity } from "../type/material-qty-store-type";
import { getStoreQuantity } from "../action/material-qty-store-action";

// list material
export const useGetQuantityStore = (searchParams: any) => {
  return useQuery<ApiListResponse<IStoreQuantity>>({
    queryKey: ["STORE_QUANTITY_LIST", searchParams],
    queryFn: () => getStoreQuantity(searchParams),
  });
};
