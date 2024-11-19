"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { ICart } from "./../type/cart-type";
import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { axiosAuth } from "@/lib/api/api-interceptor/api";
import { ICheckout } from "../type/cart-checkout-type";

export async function createAndGetCart(
  data: any
): Promise<ApiSingleResponse<ICart>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.post("/store-inventories", data)
  );

  if (!result.success) {
    return { data: null, error: result.error };
  }

  return result.data;
}
export async function GetCartCheckout(
  data: any
): Promise<ApiSingleResponse<ICheckout>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.post("/payment/pre-checkout", data)
  );

  if (!result.success) {
    return { data: null, error: result.error };
  }

  return result.data;
}
