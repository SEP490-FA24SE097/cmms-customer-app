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
export interface PaymentResponse {
  success: boolean;
  message: string;
}
export async function createPayment(
  data: any
): Promise<ApiSingleResponse<PaymentResponse>> {
  noStore();
  const result = await apiRequest(() => axiosAuth.post("/payment", data));
  console.log(data);
  if (!result.success) {
    return { data: null, error: result.error || undefined };
  }
  console.log(result);
  // Ensure the response data conforms to the expected structure
  return {
    data: result.data as PaymentResponse, // Type assertion if you are sure about the structure
    error: undefined,
  };
}

export async function createPaymentVNPAY(
  data: any
): Promise<ApiSingleResponse<string>> {
  noStore();
  const result = await apiRequest(() => axiosAuth.post("/payment", data));

  if (!result.success) {
    return { data: null, error: result.error || undefined };
  }

  // Ensure the response data conforms to the expected structure
  return {
    data: result.data, // Type assertion if you are sure about the structure
    error: undefined,
  };
}
