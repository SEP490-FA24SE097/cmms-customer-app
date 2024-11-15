"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShippoing } from "@/lib/actions/delivery/react-query/delivery-query";
import { IShippingDetails } from "@/lib/actions/delivery/type/delivery-type";

// async function getData(): Promise<Order[]> {
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "m5gr84i9",
//       amount: 316,
//       status: "success",
//       email: "ken99@yahoo.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "3u1reuv4",
//       amount: 242,
//       status: "success",
//       email: "Abe45@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "derv1ws0",
//       amount: 837,
//       status: "processing",
//       email: "Monserrat44@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "5kma453ae",
//       amount: 874,
//       status: "success",
//       email: "Silas22@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "bhqec3j4p",
//       amount: 721,
//       status: "failed",
//       email: "carmella@hotmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "bhqe88c3j4p",
//       amount: 721,
//       status: "failed",
//       email: "carmella@hotmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "bhqej4p",
//       amount: 721,
//       status: "failed",
//       email: "carmella@hotmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "bhqej4p",
//       amount: 721,
//       status: "failed",
//       email: "carmella@hotmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "3u1re2uv4",
//       amount: 242,
//       status: "success",
//       email: "Abe45@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "derv11ws0",
//       amount: 837,
//       status: "processing",
//       email: "Monserrat44@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//     {
//       id: "5kma532ae",
//       amount: 874,
//       status: "success",
//       email: "Silas22@gmail.com",
//       date: "2024-11-15 17:26:30.099776",
//     },
//   ];
// }
export default function OrderPage() {
  const { data: session, status } = useSession();
  const ShipperId = session?.user?.user.id
    ? { ShipperId: session.user.user.id }
    : null;
  const { data: dataShipper, isLoading: isDataShipper } = useShippoing(
    ShipperId || {}
  );

  const [selectedCustomer, setSelectedCustomer] =
    useState<IShippingDetails | null>(null);

  const shippingData: IShippingDetails[] = dataShipper?.data || [];
  const handleViewCustomer = (customer: IShippingDetails) => {
    setSelectedCustomer(customer);
  };

  const closeDialog = () => setSelectedCustomer(null);

  if (!shippingData || shippingData.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <DataTable columns={columns(handleViewCustomer)} data={shippingData} />
      </div>

      {/* Dialog */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {selectedCustomer.address}
              </p>
              <p>
                <strong>Status:</strong> {selectedCustomer.shipperName}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedCustomer.phoneReceive).toLocaleDateString()}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {selectedCustomer.invoice.salePrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "vnd",
                })}
              </p>
            </div>
            <button
              className="mt-4 btn bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeDialog}
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
