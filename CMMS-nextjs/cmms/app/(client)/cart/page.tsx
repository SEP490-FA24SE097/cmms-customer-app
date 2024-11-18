"use client";
import React, { useState, useEffect, useTransition } from "react";
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
import Link from "next/link";
import { ICart } from "@/lib/actions/cart/type/cart-type";
import { useShoppingContext } from "@/context/shopping-cart-context";
import { createAndGetCart } from "@/lib/actions/cart/action/cart";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [cartData, setCartData] = useState<ICart[]>([]);
  const [cartQty1, setCartQty] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const subtotal = cartData.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const shipping = 0;
  const tax = 0.0;
  const total = subtotal + shipping + tax;
  const { toast } = useToast();
  const {
    cartQty,
    cartItem,
    inscreateQty,
    decreateQty,
    removeCartItem,
    updateQuantity,
  } = useShoppingContext();

  const showWarningToast = () => {
    toast({
      title: "Không đủ sản phẩm",
      description: "Vui lòng xóa sản phẩm không đủ và không thể chuyển trang",
      variant: "destructive", // This sets the toast style to destructive (error style)
      duration: 3000, // 3 seconds duration
    });
  };

  // Check if there is any item with insufficient quantity
  const hasInsufficientQuantity = cartData.some(
    (item) => item.isChangeQuantity
  );

  // Prevent checkout if any item has insufficient quantity
  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (hasInsufficientQuantity) {
      e.preventDefault();
      showWarningToast();
    }
  };
  useEffect(() => {
    // Calculate total itemTotalPrice whenever cartData changes
    const total = cartData.reduce((sum, item) => sum + item.itemTotalPrice, 0);
    setTotalItemPrice(total);
  }, [cartData]);
  const handleOpenCartModal = () => {
    const dataToSend = { cartItems: cartItem };

    startTransition(async () => {
      const result = await createAndGetCart(dataToSend);

      if (result && result.data) {
        // Update cartData and reset total price based on response
        setCartData(result.data);
      } else {
        console.log("Failed to fetch cart data");
      }
    });
  };
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    setCartQty(cartQty);
    handleOpenCartModal();
  }, [cartItem]);

  return (
    <div className="bg-gray-100">
      <div className="max-w-[85%] mx-auto">
        <div className="p-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-xl">
                  Trang chủ
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl">Giỏ hàng</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-white-100 p-4 pb-10">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Giỏ hàng của bạn
            </h1>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Cart Items */}
              {cartData.length === 0 ? (
                <div className="mx-auto">
                  <img src="/empty_cart.png" alt="Empty cart" />
                  <h2 className="text-[25px] mt-10">
                    Bạn chưa có sản phẩm nào trong vỏ hàng
                  </h2>
                  <div className="mt-5 flex justify-center">
                    <Link href="/product">
                      <Button className="bg-red-500 hover:bg-red-300">
                        Tiếp tục mua hàng
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full lg:w-3/4 bg-white p-4 rounded shadow">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="py-2">Ảnh</th>
                          <th className="py-2">Sản phẩm</th>
                          <th className="py-2">Giá</th>
                          <th className="py-2">Số lượng</th>
                          <th className="py-2">Tổng tiền</th>
                          <th className="py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartData.map((item) => (
                          <tr key={item.materialId} className="border-t">
                            <td className="py-4">
                              <img
                                src={item.imageUrl}
                                alt={item.itemName}
                                width={100}
                                height={100}
                              />
                            </td>
                            <td className="py-4">
                              <div className="capitalize">{item.itemName}</div>
                              {item.isChangeQuantity && (
                                <span className="text-sm text-red-500">
                                  Không đủ sản phẩm
                                </span>
                              )}
                            </td>
                            <td className="py-4">{item.basePrice}đ</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className=" border rounded-sm w-12 lg:w-auto bg-gray-100 hover:bg-white group">
                                  <button
                                    onClick={() =>
                                      decreateQty(
                                        item.materialId,
                                        item.variantId ?? null
                                      )
                                    }
                                    className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateQuantity(
                                        item.materialId,
                                        item.variantId ?? null,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-12 text-center bg-gray-100 group-hover:bg-white lg:border-l lg:border-r"
                                  />
                                  <button
                                    onClick={() =>
                                      inscreateQty(
                                        item.materialId,
                                        item.variantId ?? null
                                      )
                                    }
                                    className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">{item.itemTotalPrice}đ</td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() =>
                                  removeCartItem(
                                    item.materialId,
                                    item.variantId ?? null
                                  )
                                }
                                className="text-gray-500 hover:text-black mr-5"
                              >
                                <RiDeleteBin6Line />
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
                          placeholder="Code giảm giá"
                        />

                        <Button className="bg-red-300 font-bold text-white px-4 py-2">
                          Áp dụng
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Cart Totals */}
                  <div className="w-full lg:w-1/4">
                    <div className="bg-white p-4 rounded shadow">
                      <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                      <div className="flex justify-between py-2 border-t">
                        <span>Tổng tiền</span>
                        <span>{subtotal}đ</span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span>Shipping</span>
                        <span>{shipping}đ</span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span>Giảm giá</span>
                        <span>{tax}đ</span>
                      </div>
                      <div className="flex justify-between py-2 border-t font-bold">
                        <span>Total</span>
                        <span>{total}đ</span>
                      </div>
                      <Button
                        disabled={hasInsufficientQuantity}
                        onClick={handleCheckoutClick}
                        className="bg-red-300 text-2xl text-white w-full py-7 mt-4"
                      >
                        <Link href="/checkout">Tiến hành thanh toán</Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
