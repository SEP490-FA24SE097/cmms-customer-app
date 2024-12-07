"use server";

import { IStoreQuantity } from "../type/material-qty-store-type";
import { unstable_noStore as noStore } from "next/cache";
import {
  ApiSingleResponse,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";

export async function getStoreQuantity(
  searchParams: any
): Promise<ApiSingleResponse<IStoreQuantity>> {
  const result = await fetchSingleData<IStoreQuantity>(
    `/store-inventories/get-store-product-quantity-list?${new URLSearchParams(
      searchParams
    )}`
  );

  if (!result.success) {
    return { data: null, error: result.error };
  }

  return result.data;
}
