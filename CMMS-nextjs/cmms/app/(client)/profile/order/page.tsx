import React from "react";
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
const orders = [
  {
    orderNumber: 8631,
    quantity: "5",
    status: "Delivered",
    deliveryTime: "25 May, 2021",
    totalPrice: "$867.00",
    statusColor: "bg-green-500",
  },
  {
    orderNumber: 8632,
    quantity: "5",
    status: "On the way",
    deliveryTime: "18 Mar, 2021",
    totalPrice: "$440.00",
    statusColor: "bg-yellow-500",
  },
  {
    orderNumber: 6504,
    quantity: "5",
    status: "Order placed",
    deliveryTime: "18 Aug, 2021",
    totalPrice: "$555.00",
    statusColor: "bg-gray-500",
  },
  {
    orderNumber: 8487,
    quantity: "5",
    status: "Delivered",
    deliveryTime: "12 Feb, 2020",
    totalPrice: "$486.00",
    statusColor: "bg-green-500",
  },
  {
    orderNumber: 3045,
    quantity: "5",
    status: "On the way",
    deliveryTime: "16 Jun, 2020",
    totalPrice: "$588.00",
    statusColor: "bg-yellow-500",
  },
  // Add more orders as needed
];
const products = [
  {
    id: 1,
    name: "Ocean Mist Farms Green Leaf Lettuce",
    quantity: 5,
    price: "$86.98",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/fSi9N4mCefaf2SdOSSz4v5OKThC5NnH5jFHVPpP5eKaYLcjdC.jpg",
  },
  {
    id: 2,
    name: "Organic Spring Mix",
    quantity: 2,
    price: "$23.90",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/p4pre5oJ7vQvRiJFohUgNRTaeSi06w4eZJ5pQeZSyyn5FuxOB.jpg",
  },
  {
    id: 3,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
  {
    id: 4,
    name: "Freshness Guaranteed Mango Spears",
    quantity: 4,
    price: "$47.35",
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/GdSqZDQuiPpOOp5VNByJFgVymKgMowjxPYte0pbM5thuwN2JA.jpg",
  },
];
const orderSummary = {
  subTotal: "$861.50",
  discount: "-$3.00",
  deliveryFee: "$8.24",
  totalCost: "$867.00",
};
export default function Order() {
  return (
    <div className="w-full">
      <h2 className="text-xl sm:col-span-2 px-4 font-bold pb-5">
        Lịch sử đơn hàng
      </h2>
      <div>
        <Table className="text-[18px]">
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Tiền</TableHead>
              <TableHead className="text-right w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((invoice) => (
              <TableRow key={invoice.orderNumber}>
                <TableCell className="font-medium">
                  {invoice.orderNumber}
                </TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.deliveryTime}</TableCell>
                <TableCell>{invoice.totalPrice}</TableCell>
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
                          <div className="border-t">
                            <div className="max-w-2xl mx-auto bg-white text-black">
                              <div>
                                <div className="h-[50vh] 2xl:h-[60vh] overflow-hidden overflow-y-auto">
                                <table className="w-full text-left">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="py-2 px-4">Items Name</th>
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                      <td className="py-2 px-4 flex items-center">
                                        <img
                                          src={product.imageUrl}
                                          alt={product.name}
                                          className="w-20 h-20 mr-4"
                                          width="50"
                                          height="50"
                                        />
                                        {product.name}
                                      </td>
                                      <td className="py-2 px-4">
                                        {product.quantity}x
                                      </td>
                                      <td className="py-2 px-4">
                                        {product.price}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                                </div>
                              <div>
                                <div className="mt-6">
                                  <div className="flex justify-between py-1">
                                    <span>Sub total:</span>
                                    <span>{orderSummary.subTotal}</span>
                                  </div>
                                  <div className="flex justify-between py-1">
                                    <span>Discount:</span>
                                    <span>{orderSummary.discount}</span>
                                  </div>
                                  <div className="flex justify-between py-1">
                                    <span>Delivery Fee:</span>
                                    <span>{orderSummary.deliveryFee}</span>
                                  </div>
                                  <hr className="my-2" />
                                  <div className="flex justify-between py-1 font-bold">
                                    <span>Total Cost:</span>
                                    <span>{orderSummary.totalCost}</span>
                                  </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
                                    Report Order
                                  </button>
                                  <button className="bg-red-500 text-white py-2 px-4 rounded">
                                    Cancel Order
                                  </button>
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
