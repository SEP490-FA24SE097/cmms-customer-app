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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addDays, sub, format } from "date-fns";
import { vi } from "date-fns/locale"; // Import locale tiếng Việt
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
export default function Order(
  {
    // className,
  }
) {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5); // Default items per page
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: sub(new Date(), { days: 7 }),
    to: addDays(new Date(), 7), // +7 ngày từ ngày hiện tại
  });
  const [searchParams, setSearchParams] = useState<
    Record<string, string | number | boolean>
  >({
    CustomerId: session?.user?.user.id ?? "",
    "defaultSearch.perPage": perPage,
    "defaultSearch.currentPage": currentPage,
    "defaultSearch.sortBy": "invoiceDate",
    "defaultSearch.isAscending": false,
    FromDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
    ToDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
  });

  const handleSelectChange = (value: string) => {
    setSelectedSort(value); // Update the selected sort option
    setSearchParams((prevParams) => {
      switch (value) {
        case "1":
          return {
            ...prevParams,
            "defaultSearch.isAscending": false,
          };
        case "2":
          return {
            ...prevParams,
            "defaultSearch.isAscending": true,
          };
        default:
          return prevParams;
      }
    });
  };
  const { data: invoices, isLoading } = useGetInvoice(searchParams);
  // console.log(invoices);
  const totalPages = invoices?.totalPages || 1;
  console.log(invoices);
  // Update searchParams whenever currentPage changes
  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      "defaultSearch.currentPage": currentPage, // Cập nhật trang hiện tại
      FromDate: date?.from ? format(date.from, "yyyy-MM-dd") : "", // Định dạng ngày bắt đầu
      ToDate: date?.to ? format(date.to, "yyyy-MM-dd") : "", // Định dạng ngày kết thúc
    }));
  }, [currentPage, date]); // Thêm `date` vào danh sách phụ thuộc nếu cần

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      // Adjusted for zero-based index
      setCurrentPage(page);
    }
  };
  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  return (
    <div className="w-full">
      <h2 className="text-xl sm:col-span-2 px-4 font-bold pb-5">
        Lịch sử đơn hàng
      </h2>
      <div className="flex justify-end mb-5">
        {/* // hot fix     <div className={cn("grid gap-2", className)}> */}
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[250px] justify-start text-left font-normal mr-5",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {/* Định dạng ngày tháng theo kiểu Việt Nam */}
                      {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                      {format(date.to, "dd/MM/yyyy", { locale: vi })}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy", { locale: vi })
                  )
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Select value={selectedSort} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Mới nhất</SelectItem>
            <SelectItem value="2">Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="rounded-md border">
          <div className="p-5">
            {/* Header */}
            <div className="grid bg-blue-300 p-3 grid-cols-10 grid-rows-1 gap-0">
              <div>STT</div>
              <div className="col-span-4">Ngày</div>
              <div className="col-span-4 col-start-6">Tổng tiền</div>
              <div className="col-start-10"></div>
            </div>

            {invoices?.data && invoices.data.length > 0 ? (
              invoices?.data.map((item, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={String(item.invoiceDate)}>
                    <AccordionTrigger className="grid border p-3 grid-cols-10 grid-rows-1 gap-0">
                      <div>{index + 1}</div>
                      <div className="col-span-4">
                        {new Date(item.invoiceDate).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="col-span-4 col-start-6">
                        {item.totalAmount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table className="text-[18px] ">
                        {isLoading ? (
                          <TableCaption>
                            Vui lòng đợi trong giây lát
                          </TableCaption>
                        ) : (
                          ""
                        )}
                        <TableHeader className="bg-slate-200">
                          <TableRow>
                            <TableHead className="w-[100px] font-bold">
                              Mã đơn
                            </TableHead>
                            <TableHead className="font-bold">
                              Số lượng
                            </TableHead>
                            <TableHead className="font-bold">
                              Trạng thái
                            </TableHead>
                            <TableHead className="font-bold">Ngày</TableHead>
                            <TableHead className="font-bold">Tiền</TableHead>
                            <TableHead className="text-right w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {item.invoices && item.invoices.length > 0 ? (
                            item.invoices.map((invoice) => {
                              const statusInfo = getInvoiceStatus(
                                invoice.invoiceStatus
                              ); // Call the function with the status
                              const activeStep = invoice.invoiceStatus;
                              return (
                                <TableRow key={invoice.id}>
                                  <TableCell className="font-medium">
                                    {invoice.id}
                                  </TableCell>
                                  <TableCell className="pl-5">
                                    {invoice.invoiceDetails.reduce(
                                      (total, details) =>
                                        total + details.quantity,
                                      0
                                    )}
                                  </TableCell>
                                  <TableCell className={statusInfo.className}>
                                    {statusInfo.text}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(
                                      invoice.invoiceDate
                                    ).toLocaleDateString()}
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
                                            <div className="flex mb-2 text-black justify-between">
                                              <div className="text-md flex-[3]">
                                                <h1>
                                                  <strong>Mã đơn hàng</strong>:{" "}
                                                  {invoice.id}
                                                </h1>
                                              </div>
                                              <div className="text-md flex-[2]">
                                                <h1>
                                                  <strong>
                                                    Thời gian giao dự kiến
                                                  </strong>
                                                  :{" "}
                                                  {new Date(
                                                    invoice.shippingDetailVM.estimatedArrival
                                                  ).toLocaleDateString()}
                                                </h1>
                                              </div>
                                            </div>
                                            <div className="flex mb-2 text-black justify-between">
                                              <div className="text-md flex-[3]">
                                                <h1>
                                                  <strong>Tên cửa hàng</strong>:{" "}
                                                  {invoice.storeName}
                                                </h1>
                                              </div>
                                              <div className="text-md flex-[2]">
                                                <h1>
                                                  <strong>Tên nhân viên</strong>
                                                  : {invoice.staffName}
                                                </h1>
                                              </div>
                                            </div>
                                            <div className="flex mb-2 text-black justify-between">
                                              <div className="text-md flex-[3]">
                                                <h1 className="mr-5">
                                                  <strong>Địa chỉ</strong>:{" "}
                                                  {invoice.shippingDetailVM
                                                    ?.address || ""}
                                                </h1>
                                              </div>
                                              <div className="text-md flex-[2]">
                                                <h1>
                                                  <strong>Địa chỉ</strong>:{" "}
                                                  {invoice.shippingDetailVM
                                                    ?.phoneReceive || ""}
                                                </h1>
                                              </div>
                                            </div>
                                            <div className="flex mb-2 text-black justify-between">
                                              <div className="text-md flex-[3]">
                                                <h1 className="mr-5">
                                                  <strong>
                                                    Ngày nhận hàng
                                                  </strong>
                                                  :{" "}
                                                  {
                                                    invoice.shippingDetailVM
                                                      .shippingDate
                                                  }
                                                </h1>
                                              </div>
                                            </div>
                                            <div className="text-black">
                                              <div className="max-h-60 overflow-y-auto">
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
                                                    {invoice.invoiceDetails.map(
                                                      (product) => (
                                                        <TableRow
                                                          key={product.storeId}
                                                        >
                                                          <TableCell>
                                                            {product.imageUrl && (
                                                              <img
                                                                src={
                                                                  product.imageUrl
                                                                }
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
                                                                style:
                                                                  "currency",
                                                                currency: "vnd",
                                                              }
                                                            )}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    )}
                                                  </TableBody>
                                                </Table>
                                              </div>
                                              <div className="w-full bg-gray-100">
                                                <div className="flex justify-between p-2">
                                                  <h1>Tổng tiền</h1>
                                                  <h1>
                                                    {invoice.totalAmount.toLocaleString(
                                                      "vi-VN",
                                                      {
                                                        style: "currency",
                                                        currency: "vnd",
                                                      }
                                                    )}
                                                  </h1>
                                                </div>
                                                <div className="flex justify-between p-2">
                                                  <h1>Giảm giá</h1>
                                                  <h1>
                                                    {invoice?.discount !== null
                                                      ? invoice.discount.toLocaleString(
                                                          "vi-VN",
                                                          {
                                                            style: "currency",
                                                            currency: "vnd",
                                                          }
                                                        )
                                                      : "0 ₫"}
                                                  </h1>
                                                </div>
                                                <div className="flex justify-between p-2">
                                                  <h1 className="font-bold text-xl">
                                                    Thành tiền
                                                  </h1>
                                                  <h1 className="font-bold text-xl">
                                                    {invoice.salePrice.toLocaleString(
                                                      "vi-VN",
                                                      {
                                                        style: "currency",
                                                        currency: "vnd",
                                                      }
                                                    )}
                                                  </h1>
                                                </div>
                                              </div>
                                              <Stack
                                                className="mt-5"
                                                sx={{ width: "100%" }}
                                                spacing={4}
                                              >
                                                <Stepper
                                                  alternativeLabel
                                                  activeStep={activeStep}
                                                  connector={<StepConnector />}
                                                >
                                                  {statusSteps.map(
                                                    (label, index) => (
                                                      <Step key={label}>
                                                        <StepLabel>
                                                          {label}
                                                        </StepLabel>
                                                      </Step>
                                                    )
                                                  )}
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            ) : (
              <p className="flex justify-center border p-5">
                Không tìm thấy hóa đơn nào.
              </p>
            )}
          </div>
        </div>
        <Pagination className="mt-5">
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
