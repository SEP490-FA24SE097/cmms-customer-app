"use server";

import { unstable_noStore as noStore } from "next/cache";
import { ApiListResponse, fetchListData } from "@/lib/api/api-handler/generic";
import { IStore } from "../type/store-type";

export async function getStores(): Promise<ApiListResponse<IStore>> {
  noStore();
  const result = await fetchListData<IStore>("/store");
  if (!result.success) {
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
