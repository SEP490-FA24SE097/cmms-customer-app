"use client";
import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { FaRegUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiStoneTablet } from "react-icons/gi";
import { GiConcreteBag } from "react-icons/gi";
import { LuLampFloor } from "react-icons/lu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useShoppingContext } from "@/context/shopping-cart-context";
import { createAndGetCart } from "@/lib/actions/cart/action/cart";
import { ICart } from "@/lib/actions/cart/type/cart-type";
import { useGetBrand } from "@/lib/actions/brand/react-query/brand-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetCategory } from "@/lib/actions/categories/react-query/category-query";
import SelectLocation from "../select-location/page";
import { FaMapLocationDot } from "react-icons/fa6";
interface Category {
  title: string;
  icon: React.ReactNode;
  items: { name: string; id: string }[]; // Mỗi phần tử của `items` là một đối tượng
}
// const categories: Category[] = [
//   {
//     title: "Vật liệu cơ bản",
//     icon: <GiStoneTablet />,
//     items: ["Xi măng", "sắt", "thép", "cát", "đá", "gạch"],
//   },
//   {
//     title: "Vật liệu kêt cấu",
//     icon: <GiConcreteBag />,
//     items: ["bê tông", "phụ gia xây dựng"],
//   },
//   {
//     title: "Vật liệu hoàn thiện",
//     icon: <LuLampFloor />,
//     items: ["Tường", "trần", "sàn", "vật tư nội thất", "vật tư ngoại thất"],
//   },
// ];

export default function Header() {
  // const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
  const isCartOrCheckout = pathname === "/cart" || pathname === "/checkout";
  // Lấy đường dẫn hiện tại
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrand();
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value); // Cập nhật giá trị input
  };

  const mapCategoryData = (data: { data: any[] } | undefined): Category[] => {
    if (!data || !data.data) return []; // Kiểm tra dữ liệu tồn tại và hợp lệ

    return data.data
      .slice(0, 3) // Chỉ lấy 3 phần tử đầu tiên
      .map((category, index) => ({
        title: category.name,
        icon:
          index === 0 ? (
            <GiStoneTablet />
          ) : index === 1 ? (
            <GiConcreteBag />
          ) : (
            <LuLampFloor />
          ),
        items: category.subCategories.slice(0, 3).map((sub: any) => ({
          name: sub.name,
          id: sub.id,
        })), // Đưa cả `name` và `id` vào `items`
      }));
  };

  // Chuyển đổi dữ liệu
  const categories: Category[] = mapCategoryData(categoryData);

  const { data: session } = useSession();
  // console.log(session?.user.accessToken);

  const isLogin = session?.user;
  const TruncatedText = ({ text }: any) => {
    const maxLength = 15;
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return <div>{truncatedText}</div>;
  };
  // const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartData, setCartData] = useState<ICart>();
  const [cartQty1, setCartQty] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const [radioValue, setRadioValue] = useState("default");
  const addressFull =
    session?.user.user.province +
    ", " +
    session?.user.user.district +
    ", " +
    session?.user.user.ward;
  const {
    cartQty,
    cartItem,
    inscreateQty,
    decreateQty,
    removeCartItem,
    updateQuantity,
  } = useShoppingContext();

  const handleOpenCartModal = () => {
    const dataToSend = { cartItems: cartItem };

    startTransition(async () => {
      const result = await createAndGetCart(dataToSend);
      // console.log(result.data);

      if (result && result.data) {
        // Update cartData and reset total price based on response
        setCartData(result.data);
      } else {
        console.log("Failed to fetch cart data");
      }
    });
  };

  // console.log(cartData);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    setCartQty(cartQty);
    handleOpenCartModal(); // Update modal data with latest cart information
  }, [cartItem]);
  return (
    <nav className="bg-[#fff] shadow-lg mb-2">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b">
        <div className="grid grid-cols-1 md:grid-cols-5 space-y-5 md:space-y-0 items-center justify-between md:h-16">
          <div className="flex items-center md:col-span-3">
            <div className="flex items-center">
              <Link
                className="flex-shrink-0 flex flex-row gap-2 items-center"
                href="/"
              >
                <Image
                  src="/logo.svg"
                  width={80}
                  height={80}
                  alt="Picture of the author"
                />
                <h1 className="text-[15px] text-black font-bold lg:text-3xl">
                  CMMS
                </h1>
              </Link>
            </div>
            <div className="max-w-lg mr-auto ml-8">
              <form
                className="flex mx-5 gap-2"
                onSubmit={(e) => e.preventDefault()} // Ngăn chặn form gửi yêu cầu HTTP
              >
                <div className="flex w-full max-w-sm items-center">
                  <Input
                    type="search"
                    value={searchKeyword} // Liên kết trạng thái với input
                    onChange={handleInputChange}
                    placeholder="Tìm kiếm"
                    className="w-full lg:h-10 lg:text-2xl lg:w-[300px] xl:w-[500px] 2xl:w-[700px]"
                  />
                  <Link
                    href={`/product?keyword=${encodeURIComponent(
                      searchKeyword
                    )}`}
                  >
                    <Button
                      variant="outline"
                      type="button"
                      className="bg-blue-500 ml-2 lg:h-10"
                    >
                      <FaSearch className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto sm:ml-auto sm:mr-0   md:col-span-2">
            <div className="inline-flex gap-5 items-center">
              {/* <Button
                variant="ghost"
                className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium"
              >
                <div className="relative">
                  <FaRegHeart size={25} />
                  <span className="absolute top-0 right-0 grid min-h-[5px] min-w-[18px] text-[12px] font-bold translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-400 text-white">
                    5
                  </span>
                </div>
              </Button> */}
              <Dialog open={isDialogOpen2} onOpenChange={setIsDialogOpen2}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FaMapLocationDot className="text-blue-500" size={25} />{" "}
                    {session?.user.user.ward ? (
                      <div className="text-xs">
                        {" "}
                        <TruncatedText text={addressFull} />
                      </div>
                    ) : (
                      "Chọn địa chỉ?"
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Địa chỉ giao hàng</DialogTitle>
                    <DialogDescription>
                      <div>
                        <p>
                          Hãy chọn địa chỉ nhận hàng để được dự báo thời gian
                          giao hàng cùng phí đóng gói, vận chuyển một cách chính
                          xác nhất.
                        </p>
                        <hr className="my-5" />
                        <RadioGroup
                          className="text-black"
                          value={radioValue}
                          onValueChange={(value) => setRadioValue(value)} // Cập nhật state khi thay đổi
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1">
                              {session?.user.user.ward
                                ? `${addressFull}`
                                : "Hãy chọn khu vực giao hàng"}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">
                              Chọn khu vực giao hàng khác
                            </Label>
                          </div>
                        </RadioGroup>
                        {radioValue === "comfortable" && (
                          <div className="mt-5 mx-20">
                            <SelectLocation
                              setIsDialogOpen={setIsDialogOpen2}
                            />
                          </div>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    onClick={() => handleOpenCartModal()}
                    disabled={isCartOrCheckout}
                    className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium"
                  >
                    <div className="relative">
                      <TbShoppingCart size={25} />
                      {cartQty1 === 0 ? undefined : (
                        <span className="absolute top-0 right-0 grid min-h-[10px] min-w-[18px] text-[12px] font-bold translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-blue-400 text-white">
                          {cartQty1}
                        </span>
                      )}
                    </div>
                    <h3 className="hidden md:block">Giỏ hàng</h3>
                    <IoIosArrowDown className="hidden md:block" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[600px]">
                  <SheetHeader>
                    <SheetTitle className="text-2xl pb-5">
                      Giỏ hàng của bạn
                    </SheetTitle>
                    <SheetDescription>
                      <div className="border-t">
                        <div className="max-w-2xl mx-auto bg-white text-black">
                          <div>
                            <div className="max-h-[50vh] 2xl:max-h-[60vh] overflow-hidden overflow-y-auto">
                              <table className="w-full text-left">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="py-2 px-4">Tên sản phẩm</th>
                                    <th className="py-2 px-4">Số lượng</th>
                                    <th className="py-2 px-4">Giá</th>
                                    <th className="py-2 px-4">Xóa</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cartData?.storeItems.length === 0 ? (
                                    <tr>
                                      <td
                                        colSpan={4}
                                        className="text-center py-4"
                                      >
                                        <img
                                          src="/empty_cart.png"
                                          alt="Empty cart"
                                        />
                                        <h2 className="text-[25px] mt-10">
                                          Bạn chưa có sản phẩm nào trong vỏ hàng
                                        </h2>
                                      </td>
                                    </tr>
                                  ) : (
                                    <>
                                      {cartData?.storeItems.map((product) => (
                                        <tr
                                          key={product.materialId}
                                          className="border-b"
                                        >
                                          <td className="py-2 px-4 capitalize flex items-center">
                                            <img
                                              src={product.imageUrl}
                                              alt={product.itemName}
                                              className="w-20 h-20 mr-4"
                                              width="50"
                                              height="50"
                                            />
                                            {product.itemName}
                                            {product.isChangeQuantity && (
                                              <span className="ml-2 text-sm text-red-500">
                                                Không đủ sản phẩm
                                              </span>
                                            )}
                                          </td>
                                          <td className="py-2 px-4">
                                            <div className="flex items-center justify-center">
                                              <button
                                                onClick={() =>
                                                  decreateQty(
                                                    product.materialId,
                                                    product.variantId ?? null
                                                  )
                                                }
                                                className="px-2 py-2"
                                              >
                                                -
                                              </button>
                                              <input
                                                type="text"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                  updateQuantity(
                                                    product.materialId,
                                                    product.variantId ?? null,
                                                    Number(e.target.value)
                                                  )
                                                }
                                                className="w-8 text-center border-l border-r"
                                              />
                                              <button
                                                onClick={() =>
                                                  inscreateQty(
                                                    product.materialId,
                                                    product.variantId ?? null
                                                  )
                                                }
                                                className="px-2 py-2"
                                              >
                                                +
                                              </button>
                                            </div>
                                          </td>
                                          <td className="py-2 px-4">
                                            <div>
                                              <h1>
                                                {(product.isDiscount
                                                  ? product.salePrice
                                                  : product.beforeDiscountPrice
                                                ).toLocaleString("vi-VN", {
                                                  style: "currency",
                                                  currency: "vnd",
                                                })}
                                              </h1>
                                              {product.isDiscount ? (
                                                <h1 className="line-through text-[10px] text-red-500 text-center">
                                                  {product.beforeDiscountPrice.toLocaleString(
                                                    "vi-VN",
                                                    {
                                                      style: "currency",
                                                      currency: "vnd",
                                                    }
                                                  )}
                                                </h1>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-4">
                                            <HoverCard
                                              openDelay={50}
                                              closeDelay={100}
                                            >
                                              <HoverCardTrigger>
                                                <RiDeleteBin6Line
                                                  onClick={() =>
                                                    removeCartItem(
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
                                          </td>
                                        </tr>
                                      ))}
                                    </>
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <div className="mt-6">
                                <hr className="my-2" />
                                <div className="flex justify-between py-1 font-bold">
                                  <span>Thành tiền:</span>
                                  <span>
                                    {cartData?.total.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "vnd",
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-6 flex justify-end space-x-4">
                                {cartData?.storeItems.length === 0 ? (
                                  <button className="bg-slate-400 text-white py-2 px-4 rounded">
                                    Tiền tới thanh toán
                                  </button>
                                ) : (
                                  <Link href="/cart">
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                                      Tiền tới thanh toán
                                    </button>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              {!isLogin ? (
                <Link href="/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-5 h-5">CN</AvatarFallback>
                      </Avatar>
                      <h3 className="hidden sm:block">Tài khoản</h3>
                      <IoIosArrowDown className="hidden sm:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      Xin chào, {session.user.user.fullName}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-[12px] mt-0 pt-0 font-normal text-slate-500">
                      {session.user.user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile/editprofile">
                        <DropdownMenuItem className="font-semibold">
                          <FaRegUser />
                          <span>Thông tin</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/profile/order">
                        <DropdownMenuItem className="font-semibold">
                          <FaHistory />
                          <span>Lịch sử đơn hàng</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/profile/changepassword">
                        <DropdownMenuItem className="font-semibold">
                          <FaHistory />
                          <span>Đổi mật khẩu</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="font-semibold text-red-500"
                    >
                      <MdLogout size={25} />
                      <span className="text-[20px]">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center h-14">
          <ul className="flex">
            <li>
              <Link href="/">
                <Button
                  size="lg"
                  className="text-xl font-semibold text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none py-7"
                >
                  Trang chủ
                </Button>
              </Link>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    // onClick={() => router.push("/product")}
                    size="lg"
                    className="text-xl font-semibold text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none py-7"
                  >
                    Sản phẩm <IoIosArrowDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-screen">
                  <div>
                    <div className="bg-white mx-10">
                      <div className="flex justify-between p-5">
                        <div className="flex space-x-24">
                          {categories.map((category, index) => (
                            <div key={index}>
                              <Button
                                variant="ghost"
                                className="font-bold text-2xl hover:bg-white mb-4 flex items-center"
                              >
                                <span className="mr-2">{category.icon}</span>
                                {category.title}
                              </Button>
                              <ul className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link
                                      href={`/product?categoryId=${item.id}`}
                                    >
                                      <Label className="ml-8 text-[18px] hover:text-blue-200 capitalize    ">
                                        {item.name}
                                      </Label>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div>
                          <img
                            alt="Construction worker on a wooden frame structure under a blue sky"
                            src="https://storage.googleapis.com/a1aa/image/FyvX4XAnwBrUIR3M8yUkJ1s9jBof1uQAITjOU39QarvIoj1JA.jpg"
                            className="object-cover w-[500px] h-[200px] rounded-md mr-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    className="text-xl font-semibold text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none py-7"
                  >
                    Thương hiệu <IoIosArrowDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="max-h-[400px] overflow-y-auto">
                    <ul className="flex flex-col">
                      {isLoadingBrand ? (
                        <div>
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      ) : (
                        brandData?.data.map((item, index) => (
                          <li key={index} id={item.id} className="border-b">
                            <Link href={`/product?brandId=${item.id}`}>
                              <Button className="w-full text-[18px] font-normal text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none">
                                {item.name}
                              </Button>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Button
                size="lg"
                className="text-xl font-semibold text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none py-7"
              >
                Giới thiệu
              </Button>
            </li>
            <li>
              <Button
                size="lg"
                className="text-xl font-semibold text-black hover:text-blue-400 bg-white hover:bg-slate-100 border-none shadow-none py-7"
              >
                Liên hệ
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
