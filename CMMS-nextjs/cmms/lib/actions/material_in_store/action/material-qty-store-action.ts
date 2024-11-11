"use server";

import { IStoreQuantity } from "../type/material-qty-store-type";
import { unstable_noStore as noStore } from "next/cache";
import { ApiListResponse, fetchListData } from "@/lib/api/api-handler/generic";

export async function getStoreQuantity(
  searchParams: any
): Promise<ApiListResponse<IStoreQuantity>> {
  noStore();
  const result = await fetchListData<IStoreQuantity>(
    "/store-inventories/get-store-product-quantity-list",
    searchParams
  );
  if (!result.success) {
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
