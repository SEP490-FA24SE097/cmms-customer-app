"use client";
import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { useGetInvoice } from "@/lib/actions/invoices/react-query/invoice-quert";
import { IInvoices } from "@/lib/actions/invoices/type/invoice-type";

export default function Order() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5); // Default items per page

  const [searchParams, setSearchParams] = useState<
    Record<string, string | number | boolean>
  >({
    CustomerId: session?.user?.user.id ?? "",
    "defaultSearch.perPage": perPage,
    "defaultSearch.currentPage": currentPage,
  });

  const { data: invoices, isLoading } = useGetInvoice(searchParams);
  console.log(invoices);
  const totalPages = invoices?.totalPages || 1;

  // Update searchParams whenever currentPage changes
  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      "defaultSearch.currentPage": currentPage,
    }));
    console.log(searchParams);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      // Adjusted for zero-based index
      setCurrentPage(page);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-xl sm:col-span-2 px-4 font-bold pb-5">
        Lịch sử đơn hàng
      </h2>
      <div>
        <Table className="text-[18px]">
          {isLoading ? (
            <TableCaption>Vui lòng đợi trong giây lát</TableCaption>
          ) : (
            ""
          )}
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="w-[100px]">Mã đơn</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Tiền</TableHead>
              <TableHead className="text-right w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.data && invoices.data.length > 0 ? (
              invoices.data.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="pl-5">
                    {invoice.invoiceDetails.reduce(
                      (total, details) => total + details.quantity,
                      0
                    )}
                  </TableCell>
                  <TableCell>{invoice.invoiceStatus}</TableCell>
                  <TableCell>
                    {new Date(invoice.invoiceDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {invoice.totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "vnd",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Sheet>
                      <SheetTrigger>
                        <LuEye />
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[600px]">
                        <SheetHeader>
                          <SheetTitle className="text-2xl pb-5">
                            Thông tin đơn hàng
                          </SheetTitle>
                          <SheetDescription></SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {isLoading ? "" : "Bạn chưa có đơn hàng"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={
                  () => currentPage > 0 && handlePageChange(currentPage - 1) // Adjust for zero-based index
                }
                aria-disabled={currentPage === 0}
                className={
                  currentPage === 0
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                Trở lại
              </PaginationPrevious>
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index} // Adjusted for zero-based index
                  onClick={() => handlePageChange(index)}
                  className="cursor-pointer"
                >
                  {index + 1} {/* Display the page number starting from 1 */}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages - 1 && // Adjust for zero-based index
                  handlePageChange(currentPage + 1)
                }
                aria-disabled={currentPage === totalPages - 1} // Adjust for zero-based index
                className={
                  currentPage === totalPages - 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                Tiếp
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
