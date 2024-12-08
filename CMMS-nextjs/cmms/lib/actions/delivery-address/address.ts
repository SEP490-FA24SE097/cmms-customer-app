"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { axiosAuth } from "@/lib/api/api-interceptor/api";
export interface AdressResponse {
  success: boolean;
  message: string;
}


export async function createLocation(
  data: any
): Promise<ApiSingleResponse<AdressResponse>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.post("/customers/delivery-address", data)
  );


  if (!result.success) {
    return { data: null, error: result.error || undefined };
  }

  return {
    data: result.data,
    error: undefined,
  };
}
