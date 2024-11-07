"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";
import { TiDeleteOutline } from "react-icons/ti";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdFilterList } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Slider from "@mui/material/Slider";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
const colorfake = [
  { title: "Đỏ(Red)" },
  { title: "Đỏ(Red)" },
  { title: "Đỏ(Red)" },
  { title: "Đỏ(Red)" },
  { title: "Đỏ(Red)" },
  { title: "Đỏ(Red)" },
];
const filter = ["sam sung", "toshiba"];
type Product = {
  category: string;
  discount: string;
  isFavorite: boolean;
  imgSrc: string;
  title: string;
  rating: number;
  reviews: number;
  delivery: string;
  price: string;
  shippingIcon: string;
  priceIcon: string;
};
const fakeProducts: Product[] = [
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title:
      'Apple iMac 27", 1TB HDD, Retina 5K Display, tina 5K Display, M3 Max tina 5K Display, M3 Max M3 Max',
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,699",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,699",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,699",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,699",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,699",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "gach",
    discount: "Up to 15% off",
    isFavorite: true,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/HK1eMFUFPXWtOSupifnfYkSQgwdMqxyU1FzRvDN4kjyR74WnA.jpg",
    title: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
    rating: 4.5,
    reviews: 1233,
    delivery: "Best Seller",
    price: "1,199,199",
    shippingIcon: "fas fa-crown",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/7FaRzFXljfSIZSMnL8Ny6WNdTbyIgMoteB0uhfFJ0QrS74WnA.jpg",
    title: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
    rating: 4,
    reviews: 879,
    delivery: "Shipping Today",
    price: "799,199",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "gach",
    discount: "Up to 10% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/w9j3qd5LMxLjG1P0FaAkJoBScpkxfJJfw5edDawzmJlK74WnA.jpg",
    title: "PlayStation®5 Console – 1TB, PRO Controller",
    rating: 4.5,
    reviews: 2957,
    delivery: "Fast Delivery",
    price: "499,199",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "san",
    discount: "Up to 35% off",
    isFavorite: true,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
    title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    rating: 3.0,
    reviews: 455,
    delivery: "Fast Delivery",
    price: "1,699,199",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 15% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/HK1eMFUFPXWtOSupifnfYkSQgwdMqxyU1FzRvDN4kjyR74WnA.jpg",
    title: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
    rating: 4.5,
    reviews: 1233,
    delivery: "Best Seller",
    price: "1,199,199",
    shippingIcon: "fas fa-crown",
    priceIcon: "fas fa-tag",
  },
  {
    category: "vat_tu_noi_that",
    discount: "Up to 35% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/7FaRzFXljfSIZSMnL8Ny6WNdTbyIgMoteB0uhfFJ0QrS74WnA.jpg",
    title: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
    rating: 4,
    reviews: 879,
    delivery: "Shipping Today",
    price: "799,199",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
  {
    category: "san",
    discount: "Up to 10% off",
    isFavorite: false,
    imgSrc:
      "https://storage.googleapis.com/a1aa/image/w9j3qd5LMxLjG1P0FaAkJoBScpkxfJJfw5edDawzmJlK74WnA.jpg",
    title: "PlayStation®5 Console – 1TB, PRO Controller",
    rating: 3.5,
    reviews: 2957,
    delivery: "Fast Delivery",
    price: "499,199",
    shippingIcon: "fas fa-shipping-fast",
    priceIcon: "fas fa-tag",
  },
];
const addToCart = (product: Product): void => {
  // Retrieve the current cart from localStorage, or initialize an empty array if none exists
  let cart: (Product & { quantity: number })[] = JSON.parse(localStorage.getItem('cart') || '[]');

  // Check if the product is already in the cart
  const productIndex = cart.findIndex((item) => item.title === product.title);

  if (productIndex !== -1) {
    // If product is already in the cart, update its quantity
    cart[productIndex].quantity += 1;
  } else {
    // Add new product with initial quantity of 1
    cart.push({ ...product, quantity: 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
};
const valuetext = (value: number) => {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
};

export default function Listing() {
  const [value, setValue] = useState([100000, 200000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  
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
        <div className="bg-white shadow-xl">
          <div className="flex justify-between items-center px-5 pt-4 pb-2">
            <div className="text-xl font-bold text-red-500">Trang sản phẩm</div>
            <div className="flex items-center gap-2">
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <MdFilterList size={20} />
                      Bộ lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className="pt-5 space-y-5">
                      <div>
                        <h2 className="text-xl text-black font-semibold pb-2">
                          Thương hiệu
                        </h2>
                        <Autocomplete
                          multiple
                          limitTags={2}
                          id="multiple-limit-tags"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[top100Films[1], top100Films[0]]}
                          renderInput={(params) => (
                            <TextField {...params} label="Thương hiệu" />
                          )}
                          sx={{ width: "full" }}
                          disablePortal
                        />
                      </div>
                      <div>
                        <h2 className="text-xl text-black font-semibold pb-2">
                          Phân loại
                        </h2>
                        <Autocomplete
                          multiple
                          limitTags={2}
                          id="multiple-limit-tags"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[top100Films[1], top100Films[0]]}
                          renderInput={(params) => (
                            <TextField {...params} label="Phân loại" />
                          )}
                          sx={{ width: "full" }}
                          disablePortal
                        />
                      </div>
                      <div>
                        <h2 className="text-xl text-black font-semibold pb-2">
                          Màu sắc
                        </h2>
                        <Autocomplete
                          multiple
                          limitTags={2}
                          id="multiple-limit-tags"
                          options={colorfake}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[colorfake[1], colorfake[0]]}
                          renderInput={(params) => (
                            <TextField {...params} label="Màu sắc" />
                          )}
                          sx={{ width: "full" }}
                          disablePortal
                        />
                      </div>
                      <div>
                        <h2 className="text-xl text-black font-semibold pb-2">
                          Giá tiền
                        </h2>
                        <Slider
                          min={10000}
                          step={10000}
                          max={1000000}
                          getAriaLabel={() => "Khoản tiền"}
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                        />
                        <div className="flex justify-between mt-4 gap-5">
                          <TextField
                            label="Từ"
                            size="small"
                            value={value[0]}
                            onChange={(e) =>
                              setValue([Number(e.target.value), value[1]])
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  đ
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                          <TextField
                            label="Đến"
                            size="small"
                            value={value[1]}
                            onChange={(e) =>
                              setValue([value[0], Number(e.target.value)])
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  đ
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                    <SheetClose className="mt-10">
                      <div className="flex space-x-5">
                        <Button
                          className="text-lg font-semibold py-6"
                          type="submit"
                        >
                          Tìm kiếm
                        </Button>
                        <Button
                          className="text-lg font-semibold py-6 bg-gray-200"
                          variant="outline"
                          type="submit"
                        >
                          Xóa bộ lọc
                        </Button>
                      </div>
                    </SheetClose>
                  </SheetContent>
                </Sheet>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mặc định" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mới nhất</SelectItem>
                  <SelectItem value="2">Theo mức độ phổ biến</SelectItem>
                  <SelectItem value="3">Theo mức độ đánh giá</SelectItem>
                  <SelectItem value="4">Giá tiền tăng dần</SelectItem>
                  <SelectItem value="5">Giá tiền giảm dần</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">
              Bộ lọc tìm kiếm
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="flex items-center px-5 py-4 ">
            <div className="space-x-2">
              {filter.map((item, index) => (
                <Button
                  className="bg-slate-200 rounded-full hover:bg-slate-300 h-7 text-black"
                  key={index}
                >
                  {item} <TiDeleteOutline />
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="rounded-full hover:bg-slate-300 h-7 mx-2 text-slate-500"
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-8">
      {fakeProducts.map((product, index) => (
        <div key={index} className="">
          <Card className="pt-6 max-h-[550px] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:w-2 rounded-sm
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300 cursor-pointer group">
            <CardContent className="flex flex-col items-center">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-64 lg:h-60 2xl:h-72 object-cover mb-4 group-hover:scale-110 ease-in-out duration-300"
              />
              <div className="flex w-full justify-between">
                <div className="bg-blue-400 px-2 py-1 rounded-sm my-1">
                  {product.discount}
                </div>
                <div className="flex items-center gap-2 mr-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-stone-500 hover:text-black hover:bg-white"
                      >
                        <HoverCard>
                          <HoverCardTrigger>
                            <FaRegEye size={25} />
                          </HoverCardTrigger>
                          <HoverCardContent
                            side="top"
                            className="w-fit p-2 bg-slate-950 text-white border-none"
                          >
                            Xem nhanh
                          </HoverCardContent>
                        </HoverCard>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <HoverCard>
                    <HoverCardTrigger>
                      {product.isFavorite ? (
                        <CiHeart
                          className="text-stone-500 hover:text-black"
                          size={25}
                        />
                      ) : (
                        <FaHeart className="text-red-300" size={25} />
                      )}
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="top"
                      className="w-fit p-2 bg-slate-950 text-white border-none"
                    >
                      Yêu thích
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-start w-full my-2 lg:h-[55px] hover:text-red-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                {product.title}
              </h2>
              <div className="flex w-full justify-start items-center gap-4">
                <Rating
                  name="product-rating"
                  value={product.rating}
                  precision={0.5}
                  className="text-xl 2xl:text-2xl"
                  readOnly
                />
                <span className="text-black text-sm font-semibold">
                  {product.rating}
                </span>
                <span className="text-gray-600 text-sm">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex w-full justify-between items-center mt-3">
                          <div className="flex gap-2">
                            <div className="text-xl sm:text-[16px] 2xl:text-xl font-normal text-stone-400 line-through">
                              {product.price}đ
                            </div>
                            <div className="text-xl sm:text-[16px] 2xl:text-xl font-semibold">
                              {product.price}đ
                            </div>
                          </div>
                          <div>
                            <button 
                            onClick={() => addToCart(product)}
                            className="px-3 py-2 font-semibold text-sm bg-red-300 hover:bg-red-400 text-white rounded-md shadow-sm group-hover:scale-125 ease-in-out duration-300 ">
                              <RiShoppingCart2Line size={25} />
                            </button>
                          </div>
                        </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
        <div className="py-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
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
    </div>
  );
}
