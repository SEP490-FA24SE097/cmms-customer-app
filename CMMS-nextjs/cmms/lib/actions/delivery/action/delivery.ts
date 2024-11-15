"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListDataWithPagi,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { IShippingDetails } from "../type/delivery-type";

// form mẫu fetch list
export async function getShipping(
  searchParams: Record<string, string | number | boolean>
): Promise<ApiListResponse<IShippingDetails>> {
  noStore();

  const result = await fetchListDataWithPagi<IShippingDetails>(
    "/shippingDetails/getShippingDetails",
    searchParams
  );

  if (!result.success) {
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}

