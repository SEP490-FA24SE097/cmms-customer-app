"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { IStore } from "../type/store-type";
import { getStores } from "../action/store-action";

export const useGetStore = () => {
  return useQuery<ApiListResponse<IStore>>({
    queryKey: ["STORE_LIST"],
    queryFn: () => getStores(),
  });
};
