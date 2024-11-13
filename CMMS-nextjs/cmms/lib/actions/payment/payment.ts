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

export async function createPayment<T>(data: any): Promise<ApiListResponse<T>> {
  noStore();
  const result = await apiRequest(() => axiosAuth.post("/payment", data));
  console.log(result);
  if (!result.success) {
    return { data: [], error: result.error };
  }

  // Assuming the result.data contains the expected fields from the API response
  return {
    data: result.data.data ? [result.data.data] : [],
    pageCount: result.data.pagination?.perPage ?? 0,
    totalPages: result.data.pagination?.total ?? 0,
  };
}
