"use server";

import { unstable_noStore as noStore } from "next/cache";
import { ApiListResponse, fetchListData } from "@/lib/api/api-handler/generic";
import { ICategory } from "../type/categoriy-type";

export async function getCategories(): Promise<ApiListResponse<ICategory>> {
  noStore();
  const result = await fetchListData<ICategory>("/categories");
  if (!result.success) {
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
