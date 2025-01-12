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
import { useToast } from "@/hooks/use-toast";
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
import { FaStore } from "react-icons/fa";
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
  CartItem,
  MaterialStore,
  useShoppingContext,
} from "@/context/shopping-cart-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBrand } from "@/lib/actions/brand/react-query/brand-query";
import { useGetCategory } from "@/lib/actions/categories/react-query/category-query";
import { useGetQuantityStore } from "@/lib/actions/material_in_store/react-query/material-qty-store-query";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import SelectLocation from "@/components/select-location/page";
export default function Listing() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const sParams = useSearchParams();
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const brandId = sParams.get("brandId");
  const categoryId = sParams.get("categoryId");
  const materialName = sParams.get("keyword");
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // const handleNavigation = (path: string) => {
  //   setIsLoadingPage(true);
  //   router.push(path);
  // };

  useEffect(() => {
    if (brandId) {
      setSelectedBrand(brandId);
    }
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    if (materialName) {
      setSelectedName(materialName);
    } else if (materialName === "") {
      setSelectedName("");
    }
  }, [materialName, categoryId, brandId, router]);
  const [materialId, setMaterialId] = useState<string | null>(null);
  const { data: materialData, isLoading: isLoadingMaterialData } =
    useGetMaterialById(materialId ?? "");

  const handleMateridIdClick = (productMaterialId: string) => {
    setMaterialId(productMaterialId);
  };

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrand();
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory();
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<
    Record<string, string | number | boolean>
  >({
    page: currentPage,
    itemPerPage: 12,
  });
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(
    null
  );
  const [selectedVariantValue, setSelectedVariantValue] = useState<
    number | null
  >(null);
  const [selectedVariantDiscount, setSelectedVariantDiscount] = useState<
    string | null
  >(null);
  const [selectedVariantAfter, setSelectedVariantAfter] = useState<
    number | null
  >(null);
  const handleVariantDiscountClick = (discount: string) => {
    setSelectedVariantDiscount(discount);
    // Now you can use parsedDiscount as a number
  };
  const handleVariantAfterClick = (variantAfter: number) => {
    setSelectedVariantAfter(variantAfter);
  };
  const searchParamsquantity = {
    materialId: materialId,
    variantId: selectedVariant,
  };
  const { data: storeQuantityData, isLoading: isLoadingStoreQuantity } =
    useGetQuantityStore(searchParamsquantity);
  const handleVariantNameClick = (variantName: string) => {
    setSelectedVariantName(variantName);
  };
  const handleVariantValueClick = (variantValue: number) => {
    setSelectedVariantValue(variantValue);
  };
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [value, setValue] = useState<number[]>([0, 10000000]); // initial price range

  const { data: data, isLoading: isLoadingMaterial } =
    useGetMaterial(searchParams);

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
      materialName: selectedName,
    }));
  }, [selectedName, currentPage, selectedBrand, selectedCategory, value]);

  const clearFilters = () => {
    // Reset all filter states
    setSelectedBrand(""); // Assuming null is the reset value
    setSelectedCategory("");
    setSelectedName("");
    setValue([0, 10000000]); // Replace with your default price range if applicable
    setCurrentPage(1); // Reset to the first page

    // Update searchParams to reflect cleared filters
    setSearchParams({
      page: 1, // Reset to the first page
      itemPerPage: 12, // Keep default item per page value
    });

    // Update the URL to remove filter-related query params
    const params = new URLSearchParams(window.location.search);
    params.delete("brandId");
    params.delete("categoryId");
    params.delete("keyword");
    router.replace(
      `${window.location.pathname}?${params.toString()}`,
      undefined
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // id => const materialId = "8fcded53-6a10-4219-a938-75f49fe645ec"
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setCount(value);
    } else {
      setCount(1); // Reset to 1 if input is zero or negative
    }
  };
  const images = materialData?.data?.material
    ? [
        {
          src: materialData?.data?.material.imageUrl,
          alt: "Main product image",
        },

        ...(materialData?.data?.material.subImages || []).map(
          (subImage, index) => ({
            src: subImage.subImageUrl,
            alt: `Sub image ${index + 1}`,
          })
        ),
        ...(materialData?.data?.variants || []).map((variant, index) => ({
          src: variant.image,
          alt: `Variant image ${index + 1}`,
        })),
      ]
    : [];

  if (!isLoadingMaterial) <div>...Loading</div>;
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
    if (!session?.user.user.ward) {
      toast({
        title: "Bạn chưa có địa chỉ vui lòng chọn địa chỉ.",
        style: { backgroundColor: "#f87171", color: "#ffffff" }, // Red background for error
      });
      return;
    }
    // Retrieve cart from localStorage and parse it
    const cart = JSON.parse(localStorage.getItem("cartItem") || "[]");

    const currentCartQuantity = cart.reduce((acc: any, item: any) => {
      const matchesMaterial = item.materialId === materialId;
      const matchesVariant =
        item.variantId === selectedVariant ||
        (!selectedVariant && !item.variantId);

      return matchesMaterial && matchesVariant ? acc + item.quantity : acc;
    }, 0);
    const totalQuantity = storeQuantityData?.data?.totalQuantityInAllStore;
    // Check if adding `count` would exceed store's available quantity
    if (
      totalQuantity !== undefined &&
      currentCartQuantity + count > totalQuantity
    ) {
      toast({
        title: "Vượt quá số lượng có sẵn.",
        style: { backgroundColor: "#f87171", color: "#ffffff" }, // Red background for error
      });
      return;
    }

    const data = {
      materialId,
      quantity: count,
      // storeId: selectedStoreId,
      variantId: selectedVariant,
    } as MaterialStore;

    // Add item to cart
    addCartItem(data, count);

    // Display success toast
    toast({
      title: `Đã thêm ${count} sản phẩm vào giỏ hàng.`,
      style: { backgroundColor: "#10b981", color: "#ffffff" }, // Green background for success
    });
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
    setBackgroundImage("");
    if (e.target !== e.currentTarget) {
      return;
    }
    openModal();
  };

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const [radioValue, setRadioValue] = useState("default");
  const addressFull =
    session?.user.user.province +
    ", " +
    session?.user.user.district +
    ", " +
    session?.user.user.ward;
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\./g, ""); // Remove dots for parsing
    setValue([Number(newValue), value[1]]);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\./g, ""); // Remove dots for parsing
    setValue([value[0], Number(newValue)]);
  };
  return (
    <div className="bg-gray-100">
      {isLoadingPage && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500">
          <div
            className="h-full bg-blue-700 transition-all duration-300"
            style={{ width: "100%" }}
          ></div>
        </div>
      )}
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
                <BreadcrumbPage className="text-xl">Sản phẩm</BreadcrumbPage>
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
                min={0}
                step={10000}
                max={10000000}
                getAriaLabel={() => "Khoản tiền"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
              <div className="flex justify-between pl-5 gap-5">
                <TextField
                  label="Từ"
                  size="small"
                  value={value[0].toLocaleString("vi-VN")}
                  onChange={handleFromChange}
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
                  value={value[1].toLocaleString("vi-VN")}
                  onChange={handleToChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">đ</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{ width: "220px" }}
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
                          className="capitalize"
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
                            className="capitalize" // This will apply the uppercase transformation
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
        {isLoadingMaterial ? (
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
            {data && data.data && data.data.length > 0 ? (
              data?.data.map((product, index) => (
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
                        {product.material.discount &&
                        product.material.discount !== "0" ? (
                          <div className="bg-red-400 text-white px-2 py-1 rounded-sm my-1">
                            {product.material.discount.includes("%")
                              ? `-${product.material.discount}`
                              : `-${parseInt(
                                  product.material.discount,
                                  10
                                ).toLocaleString()}`}
                          </div>
                        ) : (
                          <div></div>
                        )}

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
                                  handleMateridIdClick(product.material.id);
                                  handleVariantClick(
                                    product.variants[0]?.variantId
                                  );
                                  handleVariantNameClick(
                                    product.variants[0]?.sku
                                  );
                                  handleVariantDiscountClick(
                                    product.variants[0]?.discount || ""
                                  );
                                  handleVariantAfterClick(
                                    product.variants[0]?.afterDiscountPrice || 0
                                  );
                                  handleVariantValueClick(
                                    product.variants[0]?.price || 0
                                  );
                                  setBackgroundImage("");
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
                                    {isLoadingMaterialData ? (
                                      <Skeleton className="h-[350px] w-[450px] rounded-xl" />
                                    ) : images.length > 0 &&
                                      images[currentIndex] ? (
                                      <div
                                        style={{
                                          backgroundImage: `url(${
                                            backgroundImage
                                              ? backgroundImage
                                              : images[currentIndex].src
                                          })`,
                                          backgroundRepeat: "no-repeat", // Prevent image repeating
                                          backgroundSize: "contain", // Ensure the image covers the container
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
                                    ) : (
                                      <p>Không có ảnh</p>
                                    )}
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
                                              onClick={() =>
                                                setBackgroundImage("")
                                              }
                                            >
                                              <img
                                                src={slide.src}
                                                key={slideIndex}
                                                onClick={() =>
                                                  goToSlide(slideIndex)
                                                }
                                                className={`border-2 h-20 w-20 rounded-sm cursor-pointer ${
                                                  currentIndex === slideIndex
                                                    ? " border-blue-300"
                                                    : ""
                                                }`}
                                              />
                                            </CarouselItem>
                                          ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                      </Carousel>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-2">
                                    {/* <span className="bg-pink-200 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                                      Sale Off
                                    </span> */}
                                  </div>
                                  <h1 className="text-3xl capitalize font-bold">
                                    {selectedVariantName
                                      ? selectedVariantName
                                      : materialData?.data?.material?.name ||
                                        "Product Name Not Available"}
                                  </h1>
                                  {/* 
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
                                  </div> */}

                                  <div className="flex items-center space-x-2">
                                    {materialData?.data?.variants?.length ===
                                    0 ? (
                                      <>
                                        <span className="text-3xl font-bold text-red-500">
                                          {(materialData.data.material
                                            .afterDiscountPrice
                                            ? materialData.data.material
                                                .afterDiscountPrice
                                            : materialData.data.material
                                                .salePrice
                                          ).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "vnd",
                                          })}
                                        </span>
                                        {materialData.data.material
                                          .afterDiscountPrice && (
                                          <span className="text-gray-500 line-through">
                                            {(
                                              materialData.data.material
                                                .salePrice ||
                                              "Giá sản phẩm không có sẵn"
                                            ).toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "vnd",
                                            })}
                                          </span>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-3xl font-bold text-red-500">
                                          {(selectedVariantAfter
                                            ? selectedVariantAfter
                                            : selectedVariantValue
                                          )?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          })}
                                        </span>
                                        {selectedVariantAfter !== null &&
                                          selectedVariantAfter > 0 && (
                                            <span className="text-gray-500 line-through">
                                              {selectedVariantValue?.toLocaleString(
                                                "vi-VN",
                                                {
                                                  style: "currency",
                                                  currency: "vnd",
                                                }
                                              )}
                                            </span>
                                          )}
                                      </>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                      <MdLocationOn size={20} />
                                      <h1>Giao đến:</h1>
                                      {!session?.user?.user?.ward ? (
                                        <Dialog
                                          open={isDialogOpen1}
                                          onOpenChange={setIsDialogOpen1}
                                        >
                                          <DialogTrigger asChild>
                                            <Button
                                              className="text-blue-500"
                                              variant="ghost"
                                            >
                                              Bạn muốn giao tới đâu?
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>
                                                Địa chỉ giao hàng
                                              </DialogTitle>
                                              <DialogDescription>
                                                <div>
                                                  <p>
                                                    Hãy chọn địa chỉ nhận hàng
                                                    để được dự báo thời gian
                                                    giao hàng cùng phí đóng gói,
                                                    vận chuyển một cách chính
                                                    xác nhất.
                                                  </p>
                                                  <hr className="my-5" />
                                                  <RadioGroup
                                                    className="text-black"
                                                    value={radioValue}
                                                    onValueChange={(value) =>
                                                      setRadioValue(value)
                                                    } // Cập nhật state khi thay đổi
                                                  >
                                                    <div className="flex items-center space-x-2">
                                                      <RadioGroupItem
                                                        value="default"
                                                        id="r1"
                                                      />
                                                      <Label htmlFor="r1">
                                                        {session?.user.user.ward
                                                          ? `${addressFull}`
                                                          : "Hãy chọn khu vực giao hàng"}
                                                      </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                      <RadioGroupItem
                                                        value="comfortable"
                                                        id="r2"
                                                      />
                                                      <Label htmlFor="r2">
                                                        Chọn khu vực giao hàng
                                                        khác
                                                      </Label>
                                                    </div>
                                                  </RadioGroup>
                                                  {radioValue ===
                                                    "comfortable" && (
                                                    <div className="mt-5 mx-20">
                                                      <SelectLocation
                                                        setIsDialogOpen={
                                                          setIsDialogOpen1
                                                        }
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              </DialogDescription>
                                            </DialogHeader>
                                          </DialogContent>
                                        </Dialog>
                                      ) : (
                                        <p>{addressFull}</p>
                                      )}
                                    </div>
                                    <div>
                                      <Dialog
                                        open={isDialogOpen2}
                                        onOpenChange={setIsDialogOpen2}
                                      >
                                        <DialogTrigger asChild>
                                          <Button
                                            className="text-blue-500"
                                            variant="ghost"
                                          >
                                            Đổi
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>
                                              Địa chỉ giao hàng
                                            </DialogTitle>
                                            <DialogDescription>
                                              <div>
                                                <p>
                                                  Hãy chọn địa chỉ nhận hàng để
                                                  được dự báo thời gian giao
                                                  hàng cùng phí đóng gói, vận
                                                  chuyển một cách chính xác
                                                  nhất.
                                                </p>
                                                <hr className="my-5" />
                                                <RadioGroup
                                                  className="text-black"
                                                  value={radioValue}
                                                  onValueChange={(value) =>
                                                    setRadioValue(value)
                                                  } // Cập nhật state khi thay đổi
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                      value="default"
                                                      id="r1"
                                                    />
                                                    <Label htmlFor="r1">
                                                      {session?.user.user.ward
                                                        ? `${addressFull}`
                                                        : "Hãy chọn khu vực giao hàng"}
                                                    </Label>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                      value="comfortable"
                                                      id="r2"
                                                    />
                                                    <Label htmlFor="r2">
                                                      Chọn khu vực giao hàng
                                                      khác
                                                    </Label>
                                                  </div>
                                                </RadioGroup>
                                                {radioValue ===
                                                  "comfortable" && (
                                                  <div className="mt-5 mx-20">
                                                    <SelectLocation
                                                      setIsDialogOpen={
                                                        setIsDialogOpen2
                                                      }
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            </DialogDescription>
                                          </DialogHeader>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-gray-600">
                                      Các loại
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      {materialData?.data?.variants &&
                                      materialData.data.variants.length > 0 ? (
                                        materialData.data.variants.map(
                                          (variant, index) => (
                                            <div
                                              key={index}
                                              onClick={() => {
                                                handleVariantClick(
                                                  variant.variantId
                                                );
                                                handleVariantNameClick(
                                                  variant.sku
                                                );
                                                handleVariantDiscountClick(
                                                  variant.discount || ""
                                                );
                                                handleVariantAfterClick(
                                                  variant.afterDiscountPrice ||
                                                    0
                                                );
                                                handleVariantValueClick(
                                                  variant.price || 0
                                                );
                                                setBackgroundImage(
                                                  variant.image
                                                );
                                              }}
                                              className={`flex items-center border p-1 ${
                                                selectedVariant ===
                                                variant.variantId
                                                  ? "bg-blue-100 text-blue-600"
                                                  : "hover:bg-blue-100 hover:text-blue-600"
                                              } `}
                                            >
                                              <div className="p-2">
                                                <h1>{variant.sku}</h1>
                                              </div>
                                              <div className="flex-col mt-2">
                                                {variant?.attributes?.map(
                                                  (attribute, idx) => (
                                                    <button
                                                      key={idx}
                                                      className="flex text-[14px] items-center"
                                                    >
                                                      <div className="capitalize font-bold">
                                                        {attribute.name}
                                                        :&nbsp;
                                                      </div>
                                                      <div className="capitalize">
                                                        {attribute.value}
                                                      </div>
                                                    </button>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    {storeQuantityData?.data && (
                                      <h2>
                                        Hiện tại có{" "}
                                        <span className="font-bold">
                                          {storeQuantityData?.data?.variantItems
                                            ?.length ||
                                            storeQuantityData?.data?.items
                                              ?.length}
                                        </span>{" "}
                                        chi nhánh còn sản phẩm
                                      </h2>
                                    )}
                                    <div className="h-32">
                                      {/* <pre>{JSON.stringify(storeQuantityData, null, 2)}</pre> */}
                                      {storeQuantityData?.data
                                        ?.totalQuantityInAllStore !== 0 && (
                                        <ul className="max-h-32 text-[12px] text-blue-500 overflow-y-auto mt-1 p-2 border rounded-sm shadow-sm">
                                          {storeQuantityData?.data &&
                                            (
                                              storeQuantityData.data
                                                .variantItems ||
                                              storeQuantityData.data.items
                                            )?.map((item, index) => (
                                              <li
                                                className="w-full"
                                                key={index}
                                              >
                                                <p className="flex pl-2 items-center gap-3">
                                                  <FaStore size={30} />
                                                  <div className="flex w-full justify-between">
                                                    {item.storeName}
                                                    &nbsp;
                                                    <span className="text-end font-bold">
                                                      {item.quantity}
                                                    </span>
                                                  </div>
                                                </p>
                                              </li>
                                            ))}
                                        </ul>
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
                                        onChange={handleInputChange}
                                        className="w-12 text-center border-l border-r"
                                      />
                                      <button
                                        className="px-3 py-2"
                                        onClick={increment}
                                      >
                                        +
                                      </button>
                                    </div>
                                    {storeQuantityData?.data &&
                                    storeQuantityData.data
                                      .totalQuantityInAllStore > 0 ? (
                                      <button
                                        onClick={handleAddToCart}
                                        className="flex items-center px-6 py-2 bg-blue-500 text-white rounded"
                                      >
                                        <i className="fas fa-shopping-cart mr-2"></i>{" "}
                                        Thêm vào giỏ hàng
                                      </button>
                                    ) : (
                                      <button className="flex items-center px-6 py-2 bg-gray-600 text-white rounded">
                                        <i className="fas fa-shopping-cart mr-2"></i>{" "}
                                        Sản phẩm đã hết hàng
                                      </button>
                                    )}
                                    <button className="px-2 py-2 border rounded hover:bg-blue-500 hover:text-white transition ease-in-out duration-500 hover:-translate-y-2">
                                      <CiHeart
                                        size={25}
                                        className="font-bold"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-5" />
                              <Button
                                onClick={() =>
                                  router.push(`/product/${product.material.id}`)
                                }
                                variant="ghost"
                                className=""
                              >
                                Xem chi tiết sản phẩm
                              </Button>
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
                      <h2 className="text-lg capitalize font-semibold text-start w-full my-2 lg:h-[55px] hover:text-blue-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                        {product.material.name}
                      </h2>
                      <div className="flex w-full justify-between items-center  ">
                        <div className="flex gap-2">
                          <div className="text-xl sm:text-[16px] 2xl:text-xl font-normal text-stone-400 line-through">
                            {product.material.discount &&
                              product.material.discount !== "0" &&
                              product.material.salePrice.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "vnd",
                                }
                              )}
                          </div>
                          {product.material.discount &&
                          product.material.discount !== "0" ? (
                            <div className="text-xl sm:text-[16px] 2xl:text-xl font-semibold">
                              {product.material.afterDiscountPrice.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "vnd",
                                }
                              )}
                            </div>
                          ) : (
                            <div className="text-xl sm:text-[16px] 2xl:text-xl font-semibold">
                              {product.material.salePrice.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "vnd",
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center mx-auto">
                <h1>Không tìm thấy sản phẩm mà bạn tìm kiếm</h1>
                <img
                  src="no-results.png"
                  alt="not found"
                  className="h-60 w-60"
                />
              </div>
            )}
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
