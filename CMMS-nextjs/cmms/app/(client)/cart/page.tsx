"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RiDeleteBin6Line } from "react-icons/ri";

const sampleCartItems = [
  {
    id: 1,
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/iUIJJeb2XtUlfkPfZxMXVD4SN6ymKToje7Z5N8WF6VnJrOxOB.jpg",
    name: "Glossy Gray 19' Aluminium Wheel AR-19",
    color: "Yellow",
    material: "Aluminium",
    price: 699.0,
    quantity: 2,
  },
  {
    id: 2,
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/LeYtoLw0Qt2xSyBPxJyPNRQ2xhVV7IEngwfwLcxz41ovqTsTA.jpg",
    name: "Brandix Brake Kit BDX-750Z370-S",
    price: 849.0,
    quantity: 1,
  },
  {
    id: 3,
    imageUrl:
      "https://storage.googleapis.com/a1aa/image/CB721fsHyxWdCqbjRa8udqFueqRAyUcqBwvBhIHe1Y1jVnYnA.jpg",
    name: "Twin Exhaust Pipe From Brandix Z54",
    color: "True Red",
    price: 1210.0,
    quantity: 3,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const increment = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: isNaN(value) ? 1 : value } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 25.0;
  const tax = 0.0;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-100">
      <div className="max-w-[85%] mx-auto">
        <div className="p-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/components">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl">Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-white-100 p-4 pb-10">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Shopping Cart
            </h1>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Cart Items */}
              <div className="w-full lg:w-3/4 bg-white p-4 rounded shadow">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">IMAGE</th>
                      <th className="py-2">PRODUCT</th>
                      <th className="py-2">PRICE</th>
                      <th className="py-2">QUANTITY</th>
                      <th className="py-2">TOTAL</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="py-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td className="py-4">
                          <div>{item.name}</div>
                          {item.color && (
                            <div className="text-sm text-gray-500">
                              • Color: {item.color}
                            </div>
                          )}
                          {item.material && (
                            <div className="text-sm text-gray-500">
                              • Material: {item.material}
                            </div>
                          )}
                        </td>
                        <td className="py-4">{item.price.toFixed(2)}đ</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className=" border rounded-sm w-12 lg:w-auto bg-gray-100 hover:bg-white group">
                              <button
                                className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                onClick={() => decrement(item.id)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => handleChange(item.id, e)}
                                className="w-12 text-center bg-gray-100 group-hover:bg-white lg:border-l lg:border-r"
                              />
                              <button
                                className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                onClick={() => increment(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          {(item.price * item.quantity).toFixed(2)}đ
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-500 hover:text-black mr-5"
                          >
                            <RiDeleteBin6Line/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <input
                      className="border p-2 mr-2"
                      type="text"
                      placeholder="Coupon Code"
                    />
                    <Button className="bg-red-300 font-bold text-white px-4 py-2">
                      Apply Coupon
                    </Button>
                  </div>
                  <Button className="hidden lg:block bg-red-300 font-bold text-white px-4 py-2">
                    Update Cart
                  </Button>
                </div>
              </div>

              {/* Cart Totals */}
              <div className="w-full lg:w-1/4">
                <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                <div className="flex justify-between py-2 border-t">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}đ</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>Shipping</span>
                  <span>{shipping.toFixed(2)}đ</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>Tax</span>
                  <span>{tax.toFixed(2)}đ</span>
                </div>
                <div className="flex justify-between py-2 border-t font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)}đ</span>
                </div>
                <Button className="bg-red-300 text-2xl text-white w-full py-7 mt-4">
                  Proceed to checkout
                </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
