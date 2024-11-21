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
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

import { IInvoices } from "@/lib/actions/invoices/type/invoice-type";
const getInvoiceStatus = (
  status: number
): { text: string; className: string } => {
  switch (status) {
    case 0:
      return { text: "Đang chờ xác nhận", className: "text-yellow-600" }; // Màu vàng
    case 1:
      return { text: "Đã phê duyệt", className: "text-blue-600" }; // Màu xanh
    case 2:
      return { text: "Đang vận chuyển", className: "text-orange-600" }; // Màu cam
    case 3:
      return { text: "Hoàn tất", className: "text-green-600" }; // Màu xanh lá
    case 4:
      return { text: "Hủy", className: "text-red-600" }; // Màu đỏ
    case 5:
      return { text: "Hoàn tiền", className: "text-purple-600" }; // Màu tím
    default:
      return { text: "Không xác định", className: "text-gray-600" }; // Màu xám
  }
};
const statusSteps = [
  "Đang chờ xác nhận",
  "Đã phê duyệt",
  "Đang vận chuyển",
  "Hoàn tất",
  "Hủy",
  "Hoàn tiền",
];
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
    "defaultSearch.sortBy": "InvoiceDate",
    "defaultSearch.isAscending": false,
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
        <div className="rounded-md border">
          <Table className="text-[18px] ">
            {isLoading ? (
              <TableCaption>Vui lòng đợi trong giây lát</TableCaption>
            ) : (
              ""
            )}
            <TableHeader className="bg-slate-200">
              <TableRow>
                <TableHead className="w-[100px] font-bold">Mã đơn</TableHead>
                <TableHead className="font-bold">Số lượng</TableHead>
                <TableHead className="font-bold">Trạng thái</TableHead>
                <TableHead className="font-bold">Ngày</TableHead>
                <TableHead className="font-bold">Tiền</TableHead>
                <TableHead className="text-right w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.data && invoices.data.length > 0 ? (
                invoices.data.map((invoice) => {
                  const statusInfo = getInvoiceStatus(invoice.invoiceStatus); // Call the function with the status
                  const activeStep = invoice.invoiceStatus;
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell className="pl-5">
                        {invoice.invoiceDetails.reduce(
                          (total, details) => total + details.quantity,
                          0
                        )}
                      </TableCell>
                      <TableCell className={statusInfo.className}>
                        {statusInfo.text}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {invoice.salePrice.toLocaleString("vi-VN", {
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
                              <SheetDescription>
                                <div className="flex mb-5 text-black justify-between">
                                  <div className="text-md">
                                    <h1>
                                      <strong>Mã đơn hàng</strong>: {invoice.id}
                                    </h1>
                                  </div>
                                  <div className="text-md">
                                    <h1>
                                      <strong>Thời gian giao dự kiến</strong>:{" "}
                                      {new Date(
                                        invoice.invoiceDate
                                      ).toLocaleDateString()}
                                    </h1>
                                  </div>
                                </div>
                                <div className="flex mb-5 text-black justify-between">
                                  <div className="text-md">
                                    <h1>
                                      <strong>Địa chỉ</strong>: {invoice.id}
                                    </h1>
                                  </div>
                                  <div className="text-md">
                                    <h1>
                                      <strong>Số điện thoại</strong>: 01235566
                                    </h1>
                                  </div>
                                </div>
                                <div className="text-black">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[100px] font-bold">
                                          Ảnh
                                        </TableHead>
                                        <TableHead className="font-bold">
                                          Tên sản phẩm
                                        </TableHead>
                                        <TableHead className="font-bold">
                                          Số lượng
                                        </TableHead>
                                        <TableHead className="font-bold">
                                          Giá tiền
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {invoice.invoiceDetails.map((product) => (
                                        <TableRow key={product.storeId}>
                                          <TableCell>
                                            {product.imageUrl && (
                                              <img
                                                src={product.imageUrl}
                                                alt=""
                                                className="w-20 h-20 object-cover"
                                              />
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {product.itemName}
                                          </TableCell>
                                          <TableCell>
                                            {product.quantity}
                                          </TableCell>
                                          <TableCell>
                                            {product.itemTotalPrice.toLocaleString(
                                              "vi-VN",
                                              {
                                                style: "currency",
                                                currency: "vnd",
                                              }
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                    <TableFooter>
                                      <TableRow>
                                        <TableCell colSpan={3}>
                                          Tổng tiền
                                        </TableCell>
                                        <TableCell className="text-right">
                                          {invoice.totalAmount.toLocaleString(
                                            "vi-VN",
                                            {
                                              style: "currency",
                                              currency: "vnd",
                                            }
                                          )}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell colSpan={3}>
                                          Giảm giá
                                        </TableCell>
                                        <TableCell className="text-right">
                                          {invoice?.discount !== null
                                            ? invoice.discount.toLocaleString(
                                                "vi-VN",
                                                {
                                                  style: "currency",
                                                  currency: "vnd",
                                                }
                                              )
                                            : "0 ₫"}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell
                                          className="font-bold text-xl"
                                          colSpan={3}
                                        >
                                          Thành tiền
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-xl">
                                          {invoice.salePrice.toLocaleString(
                                            "vi-VN",
                                            {
                                              style: "currency",
                                              currency: "vnd",
                                            }
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    </TableFooter>
                                  </Table>
                                  <Stack className="mt-5" sx={{ width: "100%" }} spacing={4}>
                                    <Stepper
                                      alternativeLabel
                                      activeStep={activeStep}
                                      connector={<StepConnector />}
                                    >
                                      {statusSteps.map((label, index) => (
                                        <Step key={label}>
                                          <StepLabel>{label}</StepLabel>
                                        </Step>
                                      ))}
                                    </Stepper>
                                  </Stack>
                                </div>
                              </SheetDescription>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    {isLoading ? "" : "Bạn chưa có đơn hàng"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
