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
import { any, z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { createAndGetCart } from "@/lib/actions/cart/action/cart";
import { ICart } from "@/lib/actions/cart/type/cart-type";
import { useShoppingContext } from "@/context/shopping-cart-context";
import Link from "next/link";
import axios from "axios";
import { createPayment } from "@/lib/actions/payment/payment";
import { useToast } from "@/hooks/use-toast";

type Location = {
  value: string;
  label: string;
};

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
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
  const [cartData, setCartData] = useState<ICart[]>([]);
  const [cartQty1, setCartQty] = useState<number>();
  const { cartQty, cartItem } = useShoppingContext();

  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const fullAddress = `${address ?? ""}, ${
    selectedWard
      ? wards.find((ward) => ward.value === selectedWard)?.label + ", "
      : ""
  }${
    selectedDistrict
      ? districts.find((district) => district.value === selectedDistrict)
          ?.label + ", "
      : ""
  }${
    selectedProvince
      ? provinces.find((province) => province.value === selectedProvince)?.label
      : ""
  }`.trim();

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
    const paymentData = {
      note: note,
      address: fullAddress,
      paymentType: paymentType,
      cartItems: cartItem,
    };
    console.log(paymentData);

    // If validation passes, proceed with the API call
    try {
      const response = await createPayment(paymentData);
      toast({
        title: "Thành công",
        description: "Thanh toán đã được thực hiện thành công.",
        variant: "default",
      });
      console.log("Payment Response:", response);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Thanh toán thất bại. Vui lòng thử lại.",
        variant: "destructive",
      });
      console.error("Payment failed:", error);
    }
  };
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
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(Number(event.target.value));
  };

  const handleButtonClick = (value: number) => {
    setPaymentType(value);
  };
  return (
    <div className="bg-gray-100 py-5">
      <div className="max-w-[85%] 2xl:max-w-[70%] mx-auto">
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
                <div className="grid mt-4 items-center gap-1.5">
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
                </div>

                {/* District Selector */}
                <div className="grid items-center gap-1.5">
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
                </div>

                {/* Ward Selector */}
                <div className="grid items-center gap-1.5">
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
                </div>
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
                <h2 className="text-xl font-bold border-b pb-3">Vận chuyển</h2>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="flex w-full justify-between text-xl h-14 "
                  >
                    <div>
                      <Radio />
                      Vận chuyển tận nơi
                    </div>
                    <div className="text-[1rem]">100.000đ</div>
                  </Button>
                </div>
                <div className="mt-8">
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
                            label="Thanh toán khi giao hàng (COD)"
                            className="w-full"
                          />
                          <img src="/money.png" className="w-10 h-10" alt="" />
                        </Button>
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick(2)}
                        >
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Thanh toán ghi nợ"
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
                        </Button>
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
                <div className="grid gap-4 overflow-y-auto max-h-96">
                  {cartData.map((product) => (
                    <div
                      key={product.materialId}
                      className="flex items-center p-2"
                    >
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={`Image of ${product.itemName}`}
                          className="w-20 h-20 object-cover mr-2"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm mr-2">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{product.itemName}</div>
                        {/* <div className="text-xs text-gray-500">
                          Size: {product.size}
                        </div> */}
                      </div>
                      <div className="text-sm">{product.itemTotalPrice}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t">
                  <div className="flex items-center my-4">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="border p-2 flex-1 rounded mr-2"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Áp dụng
                    </button>
                  </div>

                  <div className="text-sm mb-2">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>4.925.000đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span>18.000đ</span>
                    </div>
                  </div>

                  <div className="text-lg font-semibold mb-4">
                    <div className="flex justify-between">
                      <span>Tổng cộng</span>
                      <span className="text-blue-500">4.943.000đ</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href="/cart" className="text-blue-500 text-sm">
                      &lt; Quay về giỏ hàng
                    </Link>
                    <button
                      onClick={handlePaymentClick}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      ĐẶT HÀNG
                    </button>
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
