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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaStore } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { ICart } from "@/lib/actions/cart/type/cart-type";
import { useShoppingContext } from "@/context/shopping-cart-context";
import {
  createAndGetCart,
  GetCartCheckout,
} from "@/lib/actions/cart/action/cart";

import { useToast } from "@/hooks/use-toast";
import { ICheckout } from "@/lib/actions/cart/type/cart-checkout-type";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import "react-tooltip";
export default function CartPage() {
  const { data: session } = useSession();
  // console.log(session?.user.accessToken);

  const isLogin = session?.user;
  const [cartData, setCartData] = useState<ICheckout>();
  const [cartQty1, setCartQty] = useState<number>();
  const [isloading, setIsloading] = useState(false);
  const [isPending, startTransition] = useTransition();

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
  const hasInsufficientQuantity = cartData?.items.some(
    (item) =>
      item.storeItems.some((storeItem) => storeItem.isChangeQuantity) ||
      item.isOver200km
  );

  // Prevent checkout if any item has insufficient quantity
  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (!isLogin) {
      toast({
        title: "Bạn không có tài khoản vui lòng đăng nhập!!!",
        variant: "destructive", // This sets the toast style to destructive (error style)
        duration: 3000, // 3 seconds duration
      });
      e.preventDefault();
      return;
    }
    if (hasInsufficientQuantity) {
      e.preventDefault();
      showWarningToast();
    }
  };
  useEffect(() => {
    // Call handleOpenCartModal when session.user.ward changes
    if (session?.user.user.ward) {
      handleOpenCartModal();
    }
  }, [session?.user.user.ward]);
  const handleOpenCartModal = async () => {
    const dataToSend = { cartItems: cartItem }; // Sử dụng cartItem mới nhất

    setIsloading(true);

    try {
      const result = await GetCartCheckout(dataToSend);
      if (result && result.data) {
        setCartData(result.data);
        console.log("Data fetched successfully");
      } else {
        console.log("Failed to fetch cart data");
        toast({
          title: "Có lỗi xảy ra vui lòng thử lại sau!!!",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast({
        title: "Có lỗi xảy ra vui lòng thử lại sau!!!",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    setCartQty(cartQty);
    handleOpenCartModal();
  }, []);
  //[cartItem]
  type Quantities = {
    [key: string]: number; // Key là chuỗi, value là số
  };

  const [quantities, setQuantities] = useState<Quantities>({});

  useEffect(() => {
    const initialQuantities: Quantities = {}; // Khai báo kiểu rõ ràng
    cartItem.forEach((product) => {
      const key = `${product.materialId}-${product.variantId ?? "null"}`;
      initialQuantities[key] = product.quantity; // Lưu giá trị quantity ban đầu
    });
    setQuantities(initialQuantities);
  }, [cartItem]);

  const handleQuantityChange = (
    materialId: string,
    variantId: string | null,
    newQuantity: number
  ) => {
    const key = `${materialId}-${variantId ?? "null"}`;

    // Find the corresponding product in cartData
    const product = cartData?.items
      .flatMap((item) => item.storeItems) // Flatten the storeItems array
      .find(
        (p) =>
          p.materialId === materialId &&
          (p.variantId ?? "null") === (variantId ?? "null")
      );

    if (product) {
      // Adjust to inStock if exceeded
      if (newQuantity > product.inStock) {
        newQuantity = product.inStock; // Set to max stock
        updateQuantity(materialId, variantId, newQuantity, product.inStock);
        toast({
          title: "Thông báo",
          description: `Số lượng không được vượt quá ${product.inStock}.`,
          variant: "destructive",
        });
      }
    }

    setQuantities((prev) => ({
      ...prev,
      [key]: newQuantity,
    }));
  };
  const handleRemoveCartItem = async (
    materialId: string,
    variantId: string | null
  ) => {
    // Gọi removeCartItem để xóa sản phẩm
    removeCartItem(materialId, variantId);

    // Không cần setTimeout, chỉ cần chờ cartItem được cập nhật
  };
  useEffect(() => {
    if (cartItem.length === 0) {
      handleOpenCartModal();
    } else {
      // Nếu cartItem có sản phẩm, mở modal với dữ liệu mới
      handleOpenCartModal();
    }
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
              {isloading ? (
                <div className="w-full lg:w-3/4 bg-white p-4 rounded shadow">
                  <Skeleton className="h-[30px] w-full rounded-xl" />
                  <Skeleton className="h-[170px] mt-5 w-full rounded-xl" />
                  <Skeleton className="h-[30px] mt-5 w-full rounded-xl" />
                </div>
              ) : cartData?.items.length === 0 ? (
                <div className="mx-auto">
                  <img src="/empty_cart.png" alt="Empty cart" />
                  <h2 className="text-[25px] mt-10">
                    Bạn chưa có sản phẩm nào trong vỏ hàng
                  </h2>
                  <div className="mt-5 flex justify-center">
                    <Link href="/product">
                      <Button className="bg-blue-500 hover:bg-blue-300">
                        Tiếp tục mua hàng
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full lg:w-3/4 bg-white p-4 rounded shadow">
                    {cartData?.items.map((item) => (
                      <div
                        key={item.storeId}
                        className="border mb-10 rounded-sm shadow-md py-2"
                      >
                        {/* Store Header */}
                        <div className="flex gap-7 items-center p-2 px-10 border-b">
                          <FaStore size={30} />
                          <h1 className="text-xl capitalize">
                            {item.storeName}
                          </h1>
                        </div>
                        {/* Store Items */}
                        <div
                          className={`m-5 ${
                            item.storeItems.length === 1 ? "" : "border"
                          }`}
                        >
                          {item.storeItems.map((product, index) => {
                            const productKey = `${product.materialId}-${
                              product.variantId ?? "null"
                            }`;
                            return (
                              <div
                                key={productKey} // Ensure a unique key
                                className={`flex justify-between gap-5 items-center p-5 ${
                                  index < item.storeItems.length - 1
                                    ? "border-b"
                                    : ""
                                }`}
                              >
                                <img
                                  className="w-20 h-20 object-cover"
                                  src={product.imageUrl}
                                  alt={product.itemName}
                                />
                                <HoverCard openDelay={100} closeDelay={200}>
                                  <HoverCardTrigger>
                                    <h1 className="text-md w-40 capitalize font-medium overflow-hidden line-clamp-2 text-ellipsis">
                                      {product.itemName}
                                    </h1>
                                  </HoverCardTrigger>
                                  <HoverCardContent>
                                    {product.itemName}
                                  </HoverCardContent>
                                </HoverCard>

                                {product.isChangeQuantity && (
                                  <h1 className="capitalize text-sm w-20 text-red-500 font-medium">
                                    Sản phẩm không đủ số lượng
                                  </h1>
                                )}
                                <h1>
                                  {product.salePrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "vnd",
                                  })}
                                </h1>
                                <div className="flex items-center">
                                  <div className="border rounded-sm w-12 lg:w-auto bg-gray-100 hover:bg-white group">
                                    <button
                                      onClick={() => {
                                        decreateQty(
                                          product.materialId,
                                          product.variantId ?? null
                                        );
                                        handleQuantityChange(
                                          product.materialId,
                                          product.variantId,
                                          (quantities[productKey] ||
                                            product.quantity) - 1
                                        );
                                      }}
                                      className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      value={
                                        quantities[productKey] ||
                                        product.quantity
                                      } // Using state
                                      onChange={(e) => {
                                        const newQuantity = Number(
                                          e.target.value
                                        );
                                        handleQuantityChange(
                                          product.materialId,
                                          product.variantId,
                                          newQuantity
                                        );
                                        updateQuantity(
                                          product.materialId,
                                          product.variantId ?? null,
                                          newQuantity,
                                          product.inStock
                                        );
                                      }}
                                      className="w-12 text-center bg-gray-100 group-hover:bg-white lg:border-l lg:border-r"
                                    />
                                    <button
                                      onClick={() => {
                                        inscreateQty(
                                          product.materialId,
                                          product.variantId ?? null
                                        );
                                        handleQuantityChange(
                                          product.materialId,
                                          product.variantId,
                                          (quantities[productKey] ||
                                            product.quantity) + 1
                                        );
                                      }}
                                      disabled={
                                        (quantities[productKey] ||
                                          product.quantity) >= product.inStock
                                      }
                                      className="px-3 py-2 w-full lg:w-auto text-gray-400 hover:text-black font-bold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <h1 className="w-[100px] flex justify-end">
                                  {product.itemTotalPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "vnd",
                                    }
                                  )}
                                </h1>
                                <div>
                                  <HoverCard openDelay={50} closeDelay={100}>
                                    <HoverCardTrigger>
                                      <RiDeleteBin6Line
                                        onClick={() =>
                                          handleRemoveCartItem(
                                            product.materialId,
                                            product.variantId ?? null
                                          )
                                        }
                                        className="text-red-400 hover:text-red-500 cursor-pointer"
                                        size={25}
                                      />
                                    </HoverCardTrigger>
                                    <HoverCardContent
                                      side="top"
                                      className="w-fit p-2 bg-slate-950 text-white border-none"
                                    >
                                      Xóa
                                    </HoverCardContent>
                                  </HoverCard>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Store Footer */}
                        <div className="flex gap-7 justify-around items-center p-2 px-10 border-t">
                          {item.isOver200km ? (
                            <h1 className="mt-1 text-red-500 capitalize">
                              Địa chỉ của bạn đã vượt quá khoảng cách giao hàng.
                              Nếu bạn muốn tiếp tục, hãy liên hệ 0902011122.
                            </h1>
                          ) : (
                            <div className="flex gap-7 justify-around items-center p-2 px-10">
                              <div className="flex gap-2 mt-2">
                                <h1>Tổng tiền: </h1>
                                <h1>
                                  {item.totalStoreAmount.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </h1>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <h1>Phí vận chuyển: </h1>
                                <h1>
                                  {item.shippngFree.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </h1>
                              </div>
                              <div className="flex font-bold gap-2 mt-2">
                                <h1>Thành tiền: </h1>
                                <h1>
                                  {item.finalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </h1>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Totals */}
                  <div className="w-full lg:w-1/4">
                    <div className="bg-white p-4 rounded shadow">
                      <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
                      <div className="flex justify-between py-2 border-t">
                        <span>Tổng tiền</span>
                        <span>
                          {cartData?.totalAmount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "vnd",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span>Phí vận chuyển</span>
                        <span>
                          {cartData?.shippingFee.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "vnd",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-t">
                        <span>Giảm giá</span>
                        <span>
                          -
                          {cartData?.discount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "vnd",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-t font-bold">
                        <span>Thành tiền</span>
                        <span>
                          {cartData?.salePrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "vnd",
                          })}
                        </span>
                      </div>
                      <Button
                        disabled={hasInsufficientQuantity}
                        onClick={handleCheckoutClick}
                        className="bg-blue-500 font-bold hover:bg-blue-600 text-2xl text-white w-full py-7 mt-4"
                      >
                        <Link href={isLogin ? "/checkout" : "/login"}>
                          Tiến hành thanh toán
                        </Link>
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
