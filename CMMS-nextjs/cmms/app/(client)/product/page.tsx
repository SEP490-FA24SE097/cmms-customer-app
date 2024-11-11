"use client";
import React, { useState, useEffect } from "react";
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
import { FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { RiShoppingCart2Line } from "react-icons/ri";

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

import TextField from "@mui/material/TextField";
import { Button } from "@/components/ui/button";

import InputAdornment from "@mui/material/InputAdornment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Slider from "@mui/material/Slider";
import {
  useGetMaterial,
  useGetMaterialById,
} from "@/lib/actions/materials/react-query/material-query";
import {
  MaterialStore,
  useShoppingContext,
} from "@/context/shopping-cart-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBrand } from "@/lib/actions/brand/react-query/brand-query";
import { useGetCategory } from "@/lib/actions/categories/react-query/category-query";

export default function Listing() {
  const router = useRouter();
  const sParams = useSearchParams();
  const brandId = sParams.get("brandId");
  useEffect(() => {
    if (brandId) {
      setSelectedBrand(brandId);

      // Remove brandId from the URL
      const params = new URLSearchParams(window.location.search);
      params.delete("brandId");

      // Use shallow routing to update the URL without refreshing the page
      router.replace(
        `${window.location.pathname}?${params.toString()}`,
        undefined
      );
    }
  }, [brandId, router]);

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrand();
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory();
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<
    Record<string, string | number | boolean>
  >({
    page: currentPage,
    itemPerPage: 2,
    brandId: "",
    categoryId: "",
    lowerPrice: "",
    upperPrice: "",
  });
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [value, setValue] = useState<number[]>([10000, 1000000]); // initial price range

  const { data, isLoading } = useGetMaterial(searchParams);

  const handleSelectChange = (value: string) => {
    setSelectedSort(value); // Update the selected sort option
    setSearchParams((prevParams) => {
      switch (value) {
        case "1":
          return {
            ...prevParams,
            isCreatedDateDescending: true,
            isPriceDescending: false,
          };
        case "2":
          return {
            ...prevParams,
            isCreatedDateDescending: false,
            isPriceDescending: false,
          };
        case "4":
          return {
            ...prevParams,
            isCreatedDateDescending: false,
            isPriceDescending: true,
          };
        case "5":
          return {
            ...prevParams,
            isCreatedDateDescending: false,
            isPriceDescending: false,
          };
        default:
          return prevParams;
      }
    });
  };
  const totalPages = data?.totalPages || 1;
  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
      brandId: selectedBrand,
      categoryId: selectedCategory,
      lowerPrice: value[0],
      upperPrice: value[1],
    }));
  }, [currentPage, selectedBrand, selectedCategory, value]);

  const clearFilters = () => {
    setSearchParams({
      page: 1,
      itemPerPage: 2,
      brandId: "",
      categoryId: "",
      lowerPrice: "",
      upperPrice: "",
    });
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedSort("");
    setValue([10000, 1000000]); // Reset price range to initial values
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
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
    ...(materialData?.data?.variants || []).map((variant, index) => ({
      src: variant.image,
      alt: `Variant image ${index + 1}`,
    })),
  ];

  if (!isLoading) <div>...Loading</div>;
  if (!isLoadingMaterialData) <div>...Loading</div>;
  // console.log(data?.data);
  // console.log(materialData?.data);
  const { addCartItem } = useShoppingContext();
  const handleVariantClick = (variantId: string) => {
    setSelectedVariant(variantId);
  };
  const handleAddToCart = () => {
    if (!materialData) return;
    const materialId = materialData.data?.material.id;
    const storeId = "c73a57e3-12b2-41dc-b150-11a91702ba0a";
    const data = {
      materialId,
      storeId,
      ...(selectedVariant && { variantId: selectedVariant }),
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
                <BreadcrumbLink
                  className="text-xl"
                  onClick={() => router.push("/product")}
                >
                  Sản phẩm
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
              <Button
                className="text-md hover:text-red-500"
                variant="ghost"
                onClick={clearFilters}
              >
                Xóa bộ lọc
              </Button>
              <Select value={selectedSort} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mặc định" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mới nhất</SelectItem>
                  <SelectItem value="2">Cũ nhất</SelectItem>
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
          <div className="flex items-center justify-between px-5 py-4 ">
            <div className="flex items-center space-x-2">
              <Slider
                min={10000}
                step={10000}
                max={1000000}
                getAriaLabel={() => "Khoản tiền"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
              <div className="flex justify-between pl-5 gap-5">
                <TextField
                  label="Từ"
                  size="small"
                  value={value[0]}
                  onChange={(e) => setValue([Number(e.target.value), value[1]])}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">đ</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <TextField
                  label="Đến"
                  size="small"
                  value={value[1]}
                  onChange={(e) => setValue([value[0], Number(e.target.value)])}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">đ</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div>
                <Select
                  value={selectedBrand} // Bind value to selectedBrand for controlled behavior
                  onValueChange={(value) => setSelectedBrand(value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Chọn thương hiệu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Thương hiệu</SelectLabel>
                      {brandData?.data.map((item, index) => (
                        <SelectItem
                          key={index}
                          onClick={() => setSelectedBrand(item.id)}
                          value={item.id}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sản phẩm</SelectLabel>
                      {categoryData?.data.map((item, index) =>
                        item.subCategories.map((subItem, subIndex) => (
                          <SelectItem
                            key={subIndex}
                            onClick={() => setSelectedCategory(subItem.id)}
                            value={subItem.id}
                          >
                            {subItem.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex space-x-10 m-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[350px] w-[280px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 mr-2"
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMaterialId(product.material.id);
                              }}
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
                                  <span className="text-gray-600">
                                    Các loại
                                  </span>
                                  <div className="flex items-center mt-2 space-x-2">
                                    {materialData?.data?.variants.map(
                                      (variant, index) => (
                                        <div
                                          key={index}
                                          onClick={() =>
                                            handleVariantClick(
                                              variant.variantId
                                            )
                                          }
                                          className={`flex items-center border p-3 mb-3 ${
                                            selectedVariant ===
                                            variant.variantId
                                              ? "bg-red-100 text-red-600"
                                              : "hover:bg-red-100 hover:text-red-600"
                                          } `}
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
                                                  {attribute.name}:
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
                                      className="w-12 text-center border-l border-r"
                                    />
                                    <button
                                      className="px-3 py-2"
                                      onClick={increment}
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    onClick={handleAddToCart}
                                    className="flex items-center px-6 py-2 bg-red-500 text-white rounded"
                                  >
                                    <i className="fas fa-shopping-cart mr-2"></i>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                          }}
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
        )}
        <div className="py-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Previous Page
                </PaginationPrevious>
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Next Page
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
