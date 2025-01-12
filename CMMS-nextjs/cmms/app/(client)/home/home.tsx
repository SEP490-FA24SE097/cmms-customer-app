"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MdLocationOn } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useGetMaterial,
  useGetMaterialById,
} from "@/lib/actions/materials/react-query/material-query";

import { IMaterial } from "@/lib/actions/materials/type/material-type";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "nextjs-toploader/app";
import { useGetQuantityStore } from "@/lib/actions/material_in_store/react-query/material-qty-store-query";
import { useToast } from "@/hooks/use-toast";
import {
  MaterialStore,
  useShoppingContext,
} from "@/context/shopping-cart-context";
import Link from "next/link";
import { useRole } from "@/providers/role-context";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import SelectLocation from "@/components/select-location/page";

const fakeData = [
  {
    title: "Cơ bản",
    imgSrc:
      "https://gachtrangtridep.net/wp-content/uploads/2021/05/1-bao-xi-mang-nang-bao-nhieu-kg.jpg",
    items: ["Gạch", "Xi măng", "Cát"],
  },
  {
    title: "Kết cấu",
    imgSrc:
      "https://phugiachongtham.net/kcfinder/upload/images/phu-gia-be-tong-phun-PCON-1kg.jpg",
    items: ["Phụ gia xây dựng", "Vữa xây dựng", "Bê tông"],
  },
  {
    title: "Hoàn thiện",
    imgSrc:
      "https://product.hstatic.net/1000288788/product/z2232844194712_ca52107a4642158d6aa441f76762b512_34e0d44951264bc0b24038e47761bfda_master.jpg",
    items: ["Vật tư nội thất", "Tường", "Sàn"],
  },
];
const fakeCategories = [
  { name: "Tất cả", key: "all" },
  { name: "Xi măng", key: "Xi măng" },
  { name: "Cát", key: "cát" },
  { name: "Đá", key: "đá" },
];
const materialsDataParams = {
  isCreatedDateDescending: true,
};

const materialsDataWithPriceParams = {
  isPriceDescending: true,
  isCreatedDateDescending: false,
};

const paginatedMaterialsParams = {
  page: 1,
  itemPerPage: 3,
  // categoryId: "85a4f0e6-3f44-42ba-b2fe-3cff6fdc99be",
};
const HomePage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const { role } = useRole();
  const { toast } = useToast();
  const { addCartItem } = useShoppingContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [materialId, setMaterialId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(
    null
  );
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  );
  const [selectedVariantValue, setSelectedVariantValue] = useState<
    number | null
  >(null);

  const searchParamsquantity = {
    materialId: materialId,
    variantId: selectedVariant,
  };
  const { data: materialData, isLoading: isLoadingMaterialData } =
    useGetMaterialById(materialId ?? "");

  const { data: dataMaterials, isLoading: isLoadingMaterials } =
    useGetMaterial(materialsDataParams);
  const {
    data: dataMaterialsWithPrice,
    isLoading: isLoadingMaterialsWithPrice,
  } = useGetMaterial(materialsDataWithPriceParams);
  const {
    data: dataPaginatedMaterials,
    isLoading: isLoadingPaginatedMaterials,
  } = useGetMaterial(paginatedMaterialsParams);
  const { data: storeQuantityData, isLoading: isLoadingStoreQuantity } =
    useGetQuantityStore(searchParamsquantity);

  // const handleNavigation = (path: string) => {
  //   setIsLoadingPage(true);
  //   router.push(path);
  // };
  const handleVariantNameClick = (variantName: string) => {
    setSelectedVariantName(variantName);
  };
  const handleVariantValueClick = (variantValue: number) => {
    setSelectedVariantValue(variantValue);
  };
  const handleStoreClick = (storeId: string, quantity: number) => {
    setSelectedStoreId(storeId);
    setAvailableQuantity(quantity);
  };
  const handleMateridIdClick = (productMaterialId: string) => {
    setMaterialId(productMaterialId);
  };
  const handleVariantClick = (variantId: string) => {
    setSelectedVariant(variantId);
    setSelectedStoreId("");
  };
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setCount(value);
    } else {
      setCount(1); // Reset to 1 if input is zero or negative
    }
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

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const sliders = [
    { url: "/banner1.jpg" },
    { url: "/banner2.jpg" },
    { url: "/banner3.jpg" },
    { url: "/banner4.jpg" },
    { url: "/banner5.jpg" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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

  const [count, setCount] = useState(1);
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? dataMaterialsWithPrice?.data
      : dataMaterialsWithPrice?.data.filter(
          (product) => product.material.category === selectedCategory
        );

  const [radioValue, setRadioValue] = useState("default");
  const addressFull =
    session?.user.user.province +
    ", " +
    session?.user.user.district +
    ", " +
    session?.user.user.ward;
  return (
    <section className="bg-gray-100 pb-10">
      <div className="w-full sm:h-[700px] h-[40vh] m-auto py-5 relative group">
        <div
          style={{ backgroundImage: `url(${sliders[currentIndex].url})` }}
          className="w-full h-full rounded-xl bg-center bg-cover duration-500"
        >
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <FaChevronLeft onClick={prevSlide} size={30} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <FaChevronRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex absolute bottom-7 left-1/2 transform -translate-x-1/2 justify-center py-2 gap-5">
            {sliders.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`hidden group-hover:block p-2 border-2 rounded-full cursor-pointer ${
                  currentIndex === slideIndex ? "bg-red-300 border-red-300" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
          <h2 className="text-xl sm:text-xl lg:text-3xl font-bold">
            Vật liệu xây dựng
          </h2>
        </div>
        <div className="my-5 py-5 max-w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeData.map((category, index) => (
              <div
                key={index}
                className="bg-white flex justify-around p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-center">
                  <img
                    alt={`Image for ${category.title}`}
                    className="mx-auto mb-4 object-cover"
                    height="200"
                    src={category.imgSrc}
                    width="200"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <Link className="text-blue-600" href="/product">
                    Xem
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Sản phẩm mới
          </h2>
        </div>
        <div className="my-5 py-5 max-w-[85%] mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-full"
          >
            {isLoadingMaterials ? (
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
              <CarouselContent className="-ml-5">
                {dataMaterials?.data.map((product, index) => (
                  <CarouselItem
                    key={product.material.id}
                    onClick={() =>
                      router.push(`/product/${product.material.id}`)
                    }
                    className="pl-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 cursor-pointer"
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
                            <div className="bg-blue-400 text-white px-2 py-1 rounded-sm my-1">
                              {product.material.discount}
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
                                    handleVariantValueClick(
                                      product.variants[0]?.price
                                    );
                                    handleVariantDiscountClick(
                                      product.variants[0]?.discount || ""
                                    );
                                    handleVariantAfterClick(
                                      product.variants[0]?.afterDiscountPrice ||
                                        0
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
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column */}
                                  <div className="space-y-4">
                                    {/* <div className="flex items-center space-x-2">
                                      <span className="bg-pink-200 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                                        Sale Off
                                      </span>
                                    </div> */}
                                    <h1 className="text-3xl font-bold capitalize">
                                      {selectedVariantName
                                        ? selectedVariantName
                                        : materialData?.data?.material?.name ||
                                          "Product Name Not Available"}
                                    </h1>

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
                                                      giao hàng cùng phí đóng
                                                      gói, vận chuyển một cách
                                                      chính xác nhất.
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
                                                          {session?.user.user
                                                            .ward
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
                                        materialData.data.variants.length >
                                          0 ? (
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
                                                  handleVariantValueClick(
                                                    variant.price
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
                                                    ? "bg-red-100 text-red-600"
                                                    : "hover:bg-red-100 hover:text-red-600"
                                                } `}
                                              >
                                                <img
                                                  src={variant.image}
                                                  alt={`Variant ${index + 1}`}
                                                  className="w-12 h-12 object-cover"
                                                />
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
                                          <p></p>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      {storeQuantityData?.data && (
                                        <h2>
                                          Hiện tại có{" "}
                                          <span className="font-bold">
                                            {storeQuantityData?.data
                                              ?.variantItems?.length ||
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
                                <div className="mx-auto">Xem chi tiet</div>
                              </DialogContent>
                            </Dialog>

                            <HoverCard>
                              <HoverCardTrigger>
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

                        <div className="flex w-full justify-between items-center mt-3">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="max-w-[85%] mx-auto">
        <div className="flex justify-between border-b-2 pb-5 mb-8">
          <h2 className="text-xl sm:text-xl lg:text-3xl font-bold">
            Háng bán chạy
          </h2>
          <div>
            <ul className="flex gap-1">
              {fakeCategories.map((category, index) => (
                <li key={index}>
                  <Button
                    onClick={() => handleCategoryChange(category.key)}
                    className={`bg-transparent shadow-none font-bold ${
                      selectedCategory === category.key
                        ? "bg-black text-white"
                        : "text-black hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full"
        >
          {isLoadingMaterialsWithPrice ? (
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
            <CarouselContent className="-ml-5">
              {filteredProducts?.map((product, index) => (
                <CarouselItem
                  key={product.material.id}
                  onClick={() => router.push(`/product/${product.material.id}`)}
                  className="pl-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 cursor-pointer"
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
                          <div className="bg-blue-400 text-white px-2 py-1 rounded-sm my-1">
                            {product.material.discount}
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
                                  handleVariantValueClick(
                                    product.variants[0]?.price
                                  );
                                  handleVariantDiscountClick(
                                    product.variants[0]?.discount || ""
                                  );
                                  handleVariantAfterClick(
                                    product.variants[0]?.afterDiscountPrice || 0
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
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                  {/* <div className="flex items-center space-x-2">
                                    <span className="bg-pink-200 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                                      Sale Off
                                    </span>
                                  </div> */}
                                  <h1 className="text-3xl font-bold capitalize">
                                    {selectedVariantName
                                      ? selectedVariantName
                                      : materialData?.data?.material?.name ||
                                        "Product Name Not Available"}
                                  </h1>

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
                                                handleVariantValueClick(
                                                  variant.price
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
                                                  ? "bg-red-100 text-red-600"
                                                  : "hover:bg-red-100 hover:text-red-600"
                                              } `}
                                            >
                                              <img
                                                src={variant.image}
                                                alt={`Variant ${index + 1}`}
                                                className="w-12 h-12 object-cover"
                                              />
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
                                        <p></p>
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
                              <div className="mx-auto">Xem chi tiet</div>
                            </DialogContent>
                          </Dialog>

                          <HoverCard>
                            <HoverCardTrigger>
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

                      <div className="flex w-full justify-between items-center">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="max-w-[85%] mx-auto py-5">
        <div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Top Selling */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Lựa chọn nhiều nhất</h2>
                <div className="border-b-2 border-stone-300 mb-4"></div>
                <div className="space-y-10">
                  {isLoadingPaginatedMaterials ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-42 w-42 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-7 w-[250px]" />
                        <Skeleton className="h-7 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    dataPaginatedMaterials?.data.map((product, index) => (
                      <Link
                        key={index}
                        href={`/product/${product.material.id}`}
                      >
                        <div
                          key={index}
                          className="group bg-white mt-3 shadow-sm flex items-center p-1 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300"
                        >
                          <img
                            alt={`Image of ${product.material.name}`}
                            className="w-32 h-32 rounded object-cover"
                            src={product.material.imageUrl}
                          />
                          <div className="ml-8">
                            <h3 className="text-lg capitalize font-semibold group-hover:text-blue-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                              {product.material.name}
                            </h3>

                            <div className="flex w-full justify-between items-center mt-3">
                              <div className="flex flex-col gap-0 sm:gap-0">
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
                                  <div className="text-xl sm:text-[18px] font-semibold">
                                    {product.material.salePrice.toLocaleString(
                                      "vi-VN",
                                      {
                                        style: "currency",
                                        currency: "vnd",
                                      }
                                    )}
                                  </div>
                                )}

                                <div className="ml-1 text-lg sm:text-[14px] font-normal text-stone-400 line-through">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Trending Products */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Thịnh hành</h2>
                <div className="border-b-2 border-stone-300 mb-4"></div>
                <div className="space-y-10">
                  {isLoadingPaginatedMaterials ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-42 w-42 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-7 w-[250px]" />
                        <Skeleton className="h-7 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    dataPaginatedMaterials?.data.map((product, index) => (
                      <Link
                        key={index}
                        href={`/product/${product.material.id}`}
                      >
                        <div
                          key={index}
                          className="group bg-white mt-3 shadow-sm flex items-center p-1 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300"
                        >
                          <img
                            alt={`Image of ${product.material.name}`}
                            className="w-32 h-32 rounded object-cover"
                            src={product.material.imageUrl}
                          />
                          <div className="ml-8">
                            <h3 className="text-lg capitalize font-semibold group-hover:text-blue-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                              {product.material.name}
                            </h3>

                            <div className="flex w-full justify-between items-center mt-3">
                              <div className="flex flex-col gap-0 sm:gap-0">
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
                                  <div className="text-xl sm:text-[18px] font-semibold">
                                    {product.material.salePrice.toLocaleString(
                                      "vi-VN",
                                      {
                                        style: "currency",
                                        currency: "vnd",
                                      }
                                    )}
                                  </div>
                                )}
                                <div className="ml-1 text-lg sm:text-[14px] font-normal text-stone-400 line-through">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Recently Added */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Mua nhiều nhất</h2>
                <div className="border-b-2 border-stone-300 mb-4"></div>
                <div className="space-y-10">
                  {isLoadingPaginatedMaterials ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-42 w-42 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-7 w-[250px]" />
                        <Skeleton className="h-7 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    dataPaginatedMaterials?.data.map((product, index) => (
                      <Link
                        key={index}
                        href={`/product/${product.material.id}`}
                      >
                        <div
                          key={index}
                          className="group bg-white mt-3 shadow-sm flex items-center p-1 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300"
                        >
                          <img
                            alt={`Image of ${product.material.name}`}
                            className="w-32 h-32 rounded object-cover"
                            src={product.material.imageUrl}
                          />
                          <div className="ml-8">
                            <h3 className="text-lg capitalize font-semibold group-hover:text-blue-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                              {product.material.name}
                            </h3>

                            <div className="flex w-full justify-between items-center mt-3">
                              <div className="flex flex-col gap-0 sm:gap-0">
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
                                  <div className="text-xl sm:text-[18px] font-semibold">
                                    {product.material.salePrice.toLocaleString(
                                      "vi-VN",
                                      {
                                        style: "currency",
                                        currency: "vnd",
                                      }
                                    )}
                                  </div>
                                )}
                                <div className="ml-1 text-lg sm:text-[14px] font-normal text-stone-400 line-through">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
