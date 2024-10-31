"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const products = [
  {
    id: 1,
    quantity: 2,
    name: "KHAKI PANTS - CREAM",
    size: "S",
    price: "1.160.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/09/NEM-CAO-SU-THIEN-NHIEN-GREEN-TEA.png",
  },
  {
    id: 2,
    quantity: 1,
    name: "KHAKI PANTS - BLACK",
    size: "S",
    price: "580.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/10/enjoy-light-grey-36-enjoy-roller-blind-1.jpg",
  },
  {
    id: 3,
    quantity: 1,
    name: "PUFF SWEATSHORTS",
    size: "S",
    price: "395.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2023/05/VAN-PHONG-VIATRIS-VIEW.jpg",
  },
  {
    id: 4,
    quantity: 1,
    name: "PATCH TEE - BLACK",
    size: "M",
    price: "420.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/05/AM-SIEU-TOC-WMF-STELIO-0413020012.jpg",
  },
  {
    id: 5,
    quantity: 1,
    name: "TOWN TEE - BLACK",
    size: "S",
    price: "395.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/10/enjoy-thunder-grey-36-enjoy-roller-blind-a2.jpg",
  },
  {
    id: 3,
    quantity: 1,
    name: "PUFF SWEATSHORTS",
    size: "S",
    price: "395.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2023/05/VAN-PHONG-VIATRIS-VIEW.jpg",
  },
  {
    id: 4,
    quantity: 1,
    name: "PATCH TEE - BLACK",
    size: "M",
    price: "420.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/05/AM-SIEU-TOC-WMF-STELIO-0413020012.jpg",
  },
  {
    id: 5,
    quantity: 1,
    name: "TOWN TEE - BLACK",
    size: "S",
    price: "395.000đ",
    imageUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/10/enjoy-thunder-grey-36-enjoy-roller-blind-a2.jpg",
  },
];

export default function CheckoutPage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState("");
  const [open3, setOpen3] = React.useState(false);
  const [value3, setValue3] = React.useState("");
  const [selectedValue, setSelectedValue] = useState("cod");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div className="bg-gray-100 py-5">
      <div className="max-w-[70%] mx-auto">
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
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Số điện thoại</Label>
                  <Input
                    className="w-full"
                    type="tel"
                    id="phone"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Địa chỉ</Label>
                  <Input
                    className="w-full"
                    type="text"
                    id="adress"
                    placeholder="Địa chỉ"
                  />
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Tỉnh thành</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!!</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Quận huyện</Label>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className="w-full justify-between"
                      >
                        {value2
                          ? frameworks.find(
                              (framework) => framework.value === value2
                            )?.label
                          : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!!</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue2(
                                    currentValue === value2 ? "" : currentValue
                                  );
                                  setOpen2(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value2 === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid mt-4 items-center gap-1.5">
                  <Label className="text-[16px]">Phường xã</Label>
                  <Popover open={open3} onOpenChange={setOpen3}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open3}
                        className="w-full justify-between"
                      >
                        {value3
                          ? frameworks.find(
                              (framework) => framework.value === value3
                            )?.label
                          : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy!!</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue3(
                                    currentValue === value3 ? "" : currentValue
                                  );
                                  setOpen3(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value3 === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {framework.label}
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
                  <Textarea placeholder="Type your message here." />
                </div>
              </div>
              <div className="xl:w-1/2">
                <h2 className="text-2xl font-bold border-b pb-3">Vận chuyển</h2>
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
                        value={selectedValue}
                        name="radio-buttons-group"
                        className="gap-4"
                        onChange={handleRadioChange}
                      >
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick("cod")}
                        >
                          <FormControlLabel
                            value="cod"
                            control={<Radio />}
                            label="Thanh toán khi giao hàng (COD)"
                            className="w-full"
                          />
                          <img src="/money.png" className="w-10 h-10" alt="" />
                        </Button>
                        <Button
                          variant="outline"
                          className="flex w-full justify-between text-xl h-14"
                          onClick={() => handleButtonClick("zalo")}
                        >
                          <FormControlLabel
                            value="zalo"
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
                          onClick={() => handleButtonClick("momo")}
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
                  Đơn hàng ({products.length} sản phẩm)
                </h2>
                <div className="grid gap-4 overflow-y-auto h-96">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center p-2">
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={`Image of ${product.name}`}
                          className="w-20 h-20 object-cover mr-2"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm mr-2">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500">
                          Size: {product.size}
                        </div>
                      </div>
                      <div className="text-sm">{product.price}</div>
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
                    <a href="#" className="text-blue-500 text-sm">
                      &lt; Quay về giỏ hàng
                    </a>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
