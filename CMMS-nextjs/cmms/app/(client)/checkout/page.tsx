"use client";
import React, { useState, useEffect, startTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaStore } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import {
  createAndGetCart,
  GetCartCheckout,
} from "@/lib/actions/cart/action/cart";
import { ICart } from "@/lib/actions/cart/type/cart-type";
import { useShoppingContext } from "@/context/shopping-cart-context";
import Link from "next/link";
import axios from "axios";
import {
  createPayment,
  createPaymentVNPAY,
} from "@/lib/actions/payment/payment";
import { useToast } from "@/hooks/use-toast";
import { ICheckout } from "@/lib/actions/cart/type/cart-checkout-type";

type Location = {
  value: string;
  label: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isBlocking, setIsBlocking] = useState(false);
  const [name, setName] = useState<string | null>(
    session?.user.user.fullName || null
  );
  const [email, setEmail] = useState<string | null>(
    session?.user.user.email || null
  );
  const [phone, setPhone] = useState<string | null>(
    session?.user.user.phoneNumber || null
  );
  const [address, setAddress] = useState<string | null>(
    session?.user.user.address || null
  );
  const [note, setNote] = useState<string | null>(
    session?.user.user.note || null
  );
  const [paymentType, setPaymentType] = useState<number>(3);
  const [cartData, setCartData] = useState<ICheckout>();
  const [cartQty1, setCartQty] = useState<number>();
  const { cartQty, cartItem } = useShoppingContext();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // const [openProvince, setOpenProvince] = useState(false);
  // const [openDistrict, setOpenDistrict] = useState(false);
  // const [openWard, setOpenWard] = useState(false);
  // const fullAddress = `${address ?? ""}, ${
  //   selectedWard
  //     ? wards.find((ward) => ward.value === selectedWard)?.label + ", "
  //     : ""
  // }${
  //   selectedDistrict
  //     ? districts.find((district) => district.value === selectedDistrict)
  //         ?.label + ", "
  //     : ""
  // }${
  //   selectedProvince
  //     ? provinces.find((province) => province.value === selectedProvince)?.label
  //     : ""
  // }`.trim();

  // console.log(paymentType);
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) =>
        setProvinces(
          response.data.map((item: any) => ({
            value: item.code,
            label: item.name,
          }))
        )
      )
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Fetch districts based on selected province
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) =>
          setDistricts(
            response.data.districts.map((item: any) => ({
              value: item.code,
              label: item.name,
            }))
          )
        )
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince]);

  // Fetch wards based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) =>
          setWards(
            response.data.wards.map((item: any) => ({
              value: item.code,
              label: item.name,
            }))
          )
        )
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict]);

  const handlePaymentClick = async () => {
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phone || !phoneRegex.test(phone)) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập số điện thoại hợp lệ (8-15 chữ số).",
        variant: "destructive",
      });
      return;
    }

    // Validate address
    // if (!address) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Vui lòng nhập địa chỉ.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // // Validate province
    // if (!selectedProvince) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Vui lòng chọn tỉnh/thành phố.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // // Validate district
    // if (!selectedDistrict) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Vui lòng chọn quận/huyện.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // // Validate ward
    // if (!selectedWard) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Vui lòng chọn phường/xã.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // Prepare payment data
    const paymentData = {
      note: note,
      salePrice: cartData?.salePrice,
      paymentType: paymentType,
      preCheckOutItemCartModel: cartData?.items,
      phoneReceive: phone,
    };

    // If validation passes, proceed with the API call
    try {
      setPaymentLoading(true);

      if (paymentType === 4) {
        // Call createPaymentVNPAY when paymentType is 4
        const response = await createPaymentVNPAY(paymentData);

        if (response.data) {
          // Redirect to the VNPAY URL
          router.push(response.data);
        } else {
          // Handle error when the URL is not returned
          toast({
            title: "Lỗi",
            description:
              "Không thể thực hiện thanh toán qua VNPAY. Vui lòng thử lại.",
            variant: "destructive",
          });
          console.error("VNPAY Payment Error:", response.error);
        }
      } else {
        // For other payment types, call the regular createPayment function
        const response = await createPayment(paymentData);

        if (response.data?.success) {
          toast({
            title: "Thanh toán đã được thực hiện thành công.",
            description: "Cảm ơn bạn vì đã chọn mua hàng ở chúng tôi!",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });

          setPaymentLoading(false);
          setIsBlocking(true);
          localStorage.removeItem("cartItem");
          // Redirect to the home page after a short delay
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          // Handle failure case for regular payments
          toast({
            title: "Lỗi",
            description: "Đã xảy ra lỗi không xác định. Vui lòng thử lại.",
            variant: "destructive",
          });
          console.error("Unexpected Payment Response:", response);
        }
      }
    } catch (error) {
      // Handle network or unexpected errors
      toast({
        title: "Lỗi",
        description: "Thanh toán thất bại. Vui lòng thử lại.",
        variant: "destructive",
      });
      console.error("Payment failed with exception:", error);
    } finally {
      setPaymentLoading(false);
    }
  };
  const handleOpenCartModal = () => {
    const dataToSend = { cartItems: cartItem };

    startTransition(async () => {
      const result = await GetCartCheckout(dataToSend);

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
    handleOpenCartModal();
  }, [cartItem]);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(Number(event.target.value));
  };

  const handleButtonClick = (value: number) => {
    setPaymentType(value);
  };
  return (
    <div className="bg-gray-100 py-5">
      <div className="max-w-[85%] 2xl:max-w-[70%] mx-auto">
        {isBlocking && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              cursor: "not-allowed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={(e) => e.preventDefault()} // Chặn mọi sự kiện nhấp chuột
          >
            <div
              className="w-12 h-12 rounded-full animate-spin
                  border-8 border-solid border-blue-500 border-t-transparent"
            ></div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        <div className="grid xl:flex gap-10">
          <div className="bg-white lg:w-2/3 py-5 shadow-xl px-8 rounded-md">
            <div className="grid xl:flex gap-10">
              <div className="xl:w-1/2">
                <h2 className="text-2xl font-bold border-b pb-3">
                  Tổng hóa đơn
                </h2>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="w-full"
                    type="email"
                    id="email"
                    readOnly
                    value={email ?? ""}
                    placeholder="Email"
                  />
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]" htmlFor="Họ và tên">
                    Họ và tên
                  </Label>
                  <Input
                    className="w-full"
                    type="text"
                    id="name"
                    readOnly
                    value={name ?? ""}
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Số điện thoại nhận hàng</Label>
                  <Input
                    className="w-full"
                    type="tel"
                    id="phone"
                    value={phone ?? ""}
                    onChange={handlePhoneChange}
                    placeholder="Số điện thoại"
                  />
                </div>

                {/* <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Địa chỉ</Label>
                  <Input
                    className="w-full"
                    type="text"
                    id="adress"
                    value={address ?? ""}
                    onChange={handleAddressChange}
                    placeholder="Địa chỉ"
                  />
                </div>
                <div className="grid items-center gap-1.5">
                  <Label className="text-[16px]">Tỉnh thành</Label>
                  <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvince}
                        className="w-full justify-between"
                      >
                        {selectedProvince
                          ? provinces.find(
                              (province) => province.value === selectedProvince
                            )?.label
                          : "Chọn tỉnh..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm tỉnh..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!</CommandEmpty>
                          <CommandGroup>
                            {provinces.map((province) => (
                              <CommandItem
                                key={province.value}
                                onSelect={() => {
                                  setSelectedProvince(province.value);
                                  setOpenProvince(false);
                                }}
                              >
                                <Check
                                  className={
                                    selectedProvince === province.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }
                                />
                                {province.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div> */}

                {/* District Selector */}
                {/* <div className="grid items-center gap-1.5">
                  <Label className="text-[16px]">Quận huyện</Label>
                  <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDistrict}
                        className="w-full justify-between"
                        disabled={!selectedProvince}
                      >
                        {selectedDistrict
                          ? districts.find(
                              (district) => district.value === selectedDistrict
                            )?.label
                          : "Chọn quận/huyện..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm quận/huyện..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!</CommandEmpty>
                          <CommandGroup>
                            {districts.map((district) => (
                              <CommandItem
                                key={district.value}
                                onSelect={() => {
                                  setSelectedDistrict(district.value);
                                  setOpenDistrict(false);
                                }}
                              >
                                <Check
                                  className={
                                    selectedDistrict === district.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }
                                />
                                {district.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div> */}

                {/* Ward Selector */}
                {/* <div className="grid items-center gap-1.5">
                  <Label className="text-[16px]">Phường xã</Label>
                  <Popover open={openWard} onOpenChange={setOpenWard}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openWard}
                        className="w-full justify-between"
                        disabled={!selectedDistrict}
                      >
                        {selectedWard
                          ? wards.find((ward) => ward.value === selectedWard)
                              ?.label
                          : "Chọn phường/xã..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm phường/xã..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!</CommandEmpty>
                          <CommandGroup>
                            {wards.map((ward) => (
                              <CommandItem
                                key={ward.value}
                                onSelect={() => {
                                  setSelectedWard(ward.value);
                                  setOpenWard(false);
                                }}
                              >
                                <Check
                                  className={
                                    selectedWard === ward.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }
                                />
                                {ward.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div> */}

                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Ghi chú</Label>
                  <Textarea
                    value={note ?? ""}
                    onChange={handleNoteChange}
                    placeholder="Nhập ghi chú vào đây."
                  />
                </div>
              </div>
              <div className="xl:w-1/2">
                <div className="">
                  <h2 className="text-2xl font-bold border-b pb-3">
                    Phương thức thanh toán
                  </h2>
                  <div>
                    <FormControl className="w-full mt-4">
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={paymentType}
                        name="radio-buttons-group"
                        className="gap-4"
                        onChange={handleRadioChange}
                      >
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick(3)}
                        >
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="Thanh toán COD"
                            className="w-full"
                          />
                          <img src="/money.png" className="w-10 h-10" alt="" />
                        </Button>
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick(4)}
                        >
                          <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label="Thanh toán qua VNPAY"
                            className="w-full"
                          />
                          <img
                            src="/vnpay-logo-inkythuatso.svg"
                            className="w-16 h-16 object-cover"
                            alt=""
                          />
                        </Button>
                        {/* <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick(4)}
                        >
                          <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Thanh toán qua Zalo"
                            className="w-full"
                          />
                          <img
                            src="/Icon_of_Zalo.svg.png"
                            className="w-10 h-10"
                            alt=""
                          />
                        </Button>
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick(5)}
                        >
                          <FormControlLabel
                            value="momo"
                            control={<Radio />}
                            label="Thanh toán qua Momo"
                            className="w-full"
                          />
                          <img
                            src="/momo_square_pinkbg.svg"
                            className="w-10 h-10"
                            alt=""
                          />
                        </Button> */}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white lg:w-1/3 py-5 shadow-xl px-8 rounded-md">
            <h2 className="text-2xl font-bold border-b pb-3">Tổng hóa đơn</h2>
            <div className="flex justify-center items-center">
              <div className="w-full mx-auto ">
                <h2 className="text-lg font-semibold my-4">
                  Đơn hàng ({cartQty1} sản phẩm)
                </h2>
                <div
                  className="grid gap-4 overflow-y-auto max-h-96 [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  {cartData?.items.map((item) => (
                    <div key={item.storeId} className="py-2 border-b">
                      <div className="flex gap-7 items-center p-2 border-b">
                        <FaStore size={20} />
                        <h1 className="text-xs capitalize">{item.storeName}</h1>
                      </div>
                      <div
                        className={`${
                          item.storeItems.length === 1 ? "" : "border mt-2"
                        }`}
                      >
                        {item.storeItems.map((product, index) => (
                          <div
                            key={product.materialId} // Add a key for each product
                            className={`flex gap-5 items-center p-5 ${
                              index < item.storeItems.length - 1
                                ? "border-b"
                                : ""
                            }`}
                          >
                            <img
                              className="w-12 h-12 object-cover"
                              src={product.imageUrl}
                              alt=""
                            />
                            <div>
                              <h1 className="text-[15px] capitalize font-medium overflow-hidden line-clamp-2 text-ellipsis">
                                {product.itemName} dsf sdf asdf asdf asdf asdf
                              </h1>
                              {product.isChangeQuantity === true ? (
                                <h1 className="capitalize text-sm w-20 text-red-500 font-medium">
                                  Sản phẩm không đủ số lượng
                                </h1>
                              ) : (
                                ""
                              )}
                              <div className="flex justify-between items-center">
                                <h1 className="text-[14px] text-slate-400">
                                  {product.salePrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "vnd",
                                  })}
                                </h1>
                                <h1 className="w-[100px] flex justify-end">
                                  x{product.quantity}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t">
                  <div className="text-sm my-2">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>
                        {cartData?.totalAmount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span>
                        {cartData?.shippingFee.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giảm giá</span>
                      <span>
                        -
                        {cartData?.discount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="text-lg font-semibold mb-4">
                    <div className="flex justify-between">
                      <span>Tổng cộng</span>
                      <span className="text-blue-500">
                        {cartData?.salePrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "vnd",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href="/cart" className="text-blue-500 text-sm">
                      &lt; Quay về giỏ hàng
                    </Link>

                    {paymentLoading ? (
                      <button
                        disabled
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded text-lg px-4 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 me-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Đang tải...
                      </button>
                    ) : (
                      <button
                        onClick={handlePaymentClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        ĐẶT HÀNG
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
