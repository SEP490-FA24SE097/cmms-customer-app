"use client";

import {
  ApiListResponse,
  ApiSingleResponse,
} from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { IInvoices } from "../type/invoice-type";
import { getInvoices } from "../action/invoice-action";


// list material
export const useGetInvoice = (
  searchParams: Record<string, string | number | boolean>
) => {
  return useQuery<ApiListResponse<IInvoices>>({
    queryKey: ["INVOICE_LIST", searchParams],
    queryFn: () => getInvoices(searchParams),
  });
};
