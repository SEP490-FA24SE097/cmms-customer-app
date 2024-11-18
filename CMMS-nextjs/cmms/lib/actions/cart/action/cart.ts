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

export async function createAndGetCart(
  data: any
): Promise<ApiListResponse<ICart>> {
  noStore();

  // const fakeData = {
  //   cartItems: [
  //     {
  //       materialId: "3438e83b-dc4e-4ccb-8ece-e72d9ad8d8f2",
  //       storeId: "c73a57e3-12b2-41dc-b150-11a91702ba0a",
  //       quantity: 3,
  //     },
  //     {
  //       materialId: "8fcded53-6a10-4219-a938-75f49fe645ec",
  //       variantId: "f4b4cb78-5129-41ac-bacd-114a4280f9f0",
  //       storeId: "c73a57e3-12b2-41dc-b150-11a91702ba0a",
  //       quantity: 99,
  //     },
  //     {
  //       materialId: "8fcded53-6a10-4219-a938-75f49fe645ec",
  //       storeId: "c73a57e3-12b2-41dc-b150-11a91702ba0a",
  //       quantity: 3,
  //     },
  //   ],
  // };
  const result = await apiRequest(() => axiosAuth.post("/", data));
  if (!result.success) {
    return { data: [], error: result.error };
  }

  return result.data;
}
