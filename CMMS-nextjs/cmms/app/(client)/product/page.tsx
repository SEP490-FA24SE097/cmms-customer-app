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

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import {
  useGetMaterial,
  useGetMaterialById,
} from "@/lib/actions/materials/react-query/material-query";
import {
  MaterialStore,
  useShoppingContext,
} from "@/context/shopping-cart-context";
import { IMaterial } from "@/lib/actions/materials/type/material-type";
import { useRouter } from "next/navigation";

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

const valuetext = (value: number) => {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
};

export default function Listing() {
  const router = useRouter();

  const [value, setValue] = useState([100000, 200000]);
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading } = useGetMaterial();
  const [materialId, setMaterialId] = useState<string>(
    "8fcded53-6a10-4219-a938-75f49fe645ec"
  );
  // id => const materialId = "8fcded53-6a10-4219-a938-75f49fe645ec"
  const { data: materialData, isLoading: isLoadingMaterialData } =
    useGetMaterialById(materialId);
  const images = [
    {
      src: materialData?.data?.material.imageUrl,
      alt: "Main product image",
    },
    // Spread the subImages array, if it exists
    // ...(materialData?.data?.material.subImages || []).map(
    //   (subImage, index) => ({
    //     src: subImage,
    //     alt: `Sub image ${index + 1}`,
    //   })
    // ),
    // Spread the variants array, if it exists
    ...(materialData?.data?.variants || []).map((variant, index) => ({
      src: variant.image,
      alt: `Variant image ${index + 1}`,
    })),
  ];

  // console.log(images);

  if (!isLoading) <div>...Loading</div>;
  if (!isLoadingMaterialData) <div>...Loading</div>;

  // console.log(data?.data);
  // console.log(materialData?.data);

  const { addCartItem } = useShoppingContext();

  const handleAddToCart = (material: IMaterial, variantId?: string) => {
    const materialId = material.material.id;
    const storeId = "c73a57e3-12b2-41dc-b150-11a91702ba0a";
    const data = {
      materialId,
      storeId,
      ...(variantId && { variantId }),
    } as MaterialStore;

    addCartItem(data);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    openModal();
  };
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setCount(value);
    } else {
      setCount(0);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-[85%] mx-auto">
        <div className="p-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-xl"
                  onClick={() => router.push("/")}
                >
                  Trang chủ
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
          {data?.data.map((product, index) => (
            <div
              key={product.material.id}
              onClick={() => router.push(`/product/${product.material.id}`)}
              className="cursor-pointer"
            >
              <Card
                className="pt-6 max-h-[550px] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:w-2 rounded-sm
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300 cursor-pointer group"
              >
                <CardContent className="flex flex-col items-center">
                  <img
                    src={product.material.imageUrl}
                    alt={product.material.name}
                    className="w-full h-64 lg:h-60 2xl:h-72 object-cover mb-4 group-hover:scale-110 ease-in-out duration-300"
                  />
                  <div className="flex w-full justify-between">
                    <div className="bg-blue-400 px-2 py-1 rounded-sm my-1">
                      {/* {product.discount} */} 20%
                    </div>
                    <div className="flex items-center gap-2 mr-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            onClick={() => setMaterialId(product.material.id)}
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
                        <DialogContent className="sm:max-w-[1000px] sm:h-auto h-full overflow-y-auto">
                          <div className="container mx-auto grid gap-8 md:grid-cols-2 ">
                            <div>
                              <div className="w-full sm:h-[55vh] h-[40vh] m-auto py-5 relative group">
                                <div
                                  style={{
                                    backgroundImage: `url(${images[currentIndex].src})`,
                                  }}
                                  onClick={handleClick}
                                  className="w-full h-full rounded-xl bg-center bg-cover duration-500 cursor-pointer"
                                >
                                  {/* Left Arrow */}
                                  <div
                                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                                    onClick={prevSlide}
                                  >
                                    <FaChevronLeft size={30} />
                                  </div>
                                  {/* Right Arrow */}
                                  <div
                                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                                    onClick={nextSlide}
                                  >
                                    <FaChevronRight size={30} />
                                  </div>
                                </div>
                              </div>

                              {/* Full-size Image Modal */}
                              {isModalOpen && (
                                <div
                                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                                  onClick={handleOutsideClick}
                                >
                                  <div className="relative w-full max-w-4xl">
                                    {/* Full-size Image */}
                                    <img
                                      src={images[currentIndex].src}
                                      alt=""
                                      className="w-full h-auto rounded-lg"
                                    />

                                    {/* Prev and Next Buttons */}
                                    <button
                                      className="absolute top-1/2 left-4 text-white text-3xl transform -translate-y-1/2 p-2 bg-black/40 rounded-full"
                                      onClick={prevSlide}
                                    >
                                      <FaChevronLeft />
                                    </button>
                                    <button
                                      className="absolute top-1/2 right-4 text-white text-3xl transform -translate-y-1/2 p-2 bg-black/40 rounded-full"
                                      onClick={nextSlide}
                                    >
                                      <FaChevronRight />
                                    </button>
                                  </div>
                                </div>
                              )}
                              <div>
                                <div className="flex justify-center w-full py-2 gap-5">
                                  <Carousel
                                    opts={{
                                      align: "start",
                                    }}
                                    className="w-full max-w-sm"
                                  >
                                    <CarouselContent className="-ml-1">
                                      {images.map((slide, slideIndex) => (
                                        <CarouselItem
                                          key={slideIndex}
                                          className="pl-1 basis-1/4"
                                        >
                                          <img
                                            src={slide.src}
                                            key={slideIndex}
                                            onClick={() =>
                                              goToSlide(slideIndex)
                                            }
                                            className={`border-2 h-20 w-20 rounded-sm cursor-pointer ${
                                              currentIndex === slideIndex
                                                ? " border-red-300"
                                                : ""
                                            }`}
                                          />
                                        </CarouselItem>
                                      ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                  </Carousel>
                                  {/* {productData.images.map((slide, slideIndex) => (
                    <img
                      src={slide.src}
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className={`border-2 h-20 w-20 rounded-sm cursor-pointer ${
                        currentIndex === slideIndex ? " border-red-300" : ""
                      }`}
                    />
                  ))} */}
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <span className="bg-pink-200 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                                  Sale Off
                                </span>
                              </div>
                              <h1 className="text-3xl font-bold">
                                {materialData?.data?.material.name}
                              </h1>

                              <div className="flex items-center">
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={4}
                                  precision={0.5}
                                  readOnly
                                />
                                <span className="text-gray-600 ml-2">
                                  (32 reviews)
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-3xl font-bold text-red-500">
                                  {materialData?.data?.material.salePrice}đ
                                </span>
                                <span className="text-gray-500 line-through">
                                  {materialData?.data?.material.salePrice}đ
                                </span>
                                <span className="text-red-500 text-sm">
                                  20%
                                </span>
                              </div>

                              <p className="text-gray-600">
                                {materialData?.data?.material.description}
                              </p>

                              <div>
                                <span className="text-gray-600">Các loại</span>
                                <div className="flex items-center mt-2 space-x-2">
                                  {materialData?.data?.variants.map(
                                    (variant, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center border p-3 mb-3 hover:bg-red-100 hover:text-red-600"
                                      >
                                        <img
                                          src={variant.image}
                                          alt={`Variant ${index + 1}`}
                                          className="w-16 h-10 object-cover mb-2"
                                        />
                                        <div className="flex gap-2 mt-2">
                                          {variant.attributes.map(
                                            (attribute, idx) => (
                                              <button
                                                key={idx}
                                                className="flex py-1"
                                              >
                                                {attribute.name}:{" "}
                                                {attribute.value}
                                              </button>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded">
                                  <button
                                    className="px-3 py-2"
                                    onClick={decrement}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={count}
                                    onChange={handleChange1}
                                    className="w-12 text-center border-l border-r"
                                  />
                                  <button
                                    className="px-3 py-2"
                                    onClick={increment}
                                  >
                                    +
                                  </button>
                                </div>
                                <button className="flex items-center px-6 py-2 bg-red-500 text-white rounded">
                                  <i className="fas fa-shopping-cart mr-2"></i>{" "}
                                  Thêm vào vỏ hàng
                                </button>
                                <button className="px-2 py-2 border rounded hover:bg-red-500 hover:text-white transition ease-in-out duration-500 hover:-translate-y-2">
                                  <CiHeart size={25} className="font-bold" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr className="mt-5" />
                          <div className="mx-auto">Xem chi tiet</div>
                        </DialogContent>
                      </Dialog>

                      <HoverCard>
                        <HoverCardTrigger>
                          {/* {product.isFavorite ? (
                            <CiHeart
                              className="text-stone-500 hover:text-black"
                              size={25}
                            />
                          ) : (
                            <FaHeart className="text-red-300" size={25} />
                          )} */}
                          <CiHeart
                            className="text-stone-500 hover:text-black"
                            size={25}
                          />
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
                    {product.material.name}
                  </h2>
                  <div className="flex w-full justify-start items-center gap-4">
                    <Rating
                      name="product-rating"
                      value={4} //{product.rating}
                      precision={0.5}
                      className="text-xl 2xl:text-2xl"
                      readOnly
                    />
                    <span className="text-black text-sm font-semibold">
                      {/* {product.rating} */} 4
                    </span>
                    <span className="text-gray-600 text-sm">
                      {/* ({product.reviews} reviews) */}
                      (10 reviews)
                    </span>
                  </div>
                  <div className="flex w-full justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <div className="text-xl sm:text-[16px] 2xl:text-xl font-normal text-stone-400 line-through">
                        {product.material.salePrice}đ
                      </div>
                      <div className="text-xl sm:text-[16px] 2xl:text-xl font-semibold">
                        {product.material.salePrice}đ
                      </div>
                    </div>
                    <div>
                      <button
                        // onClick={() => handleAddToCart(product)}
                        onClick={() =>
                          handleAddToCart(
                            product,
                            product.variants[0]?.variantId
                          )
                        }
                        className="px-3 py-2 font-semibold text-sm bg-red-300 hover:bg-red-400 text-white rounded-md shadow-sm group-hover:scale-125 ease-in-out duration-300 "
                      >
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
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
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
