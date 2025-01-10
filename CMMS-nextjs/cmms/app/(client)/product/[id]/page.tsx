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
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdLocationOn } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "@mui/material/Rating";
import { useToast } from "@/hooks/use-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import {
  useGetMaterial,
  useGetMaterialById,
} from "@/lib/actions/materials/react-query/material-query";
import { useGetQuantityStore } from "@/lib/actions/material_in_store/react-query/material-qty-store-query";

import {
  CartItem,
  MaterialStore,
  useShoppingContext,
} from "@/context/shopping-cart-context";
import { useSession } from "next-auth/react";
import SelectLocation from "@/components/select-location/page";

export default function DetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<
    Record<string, string | number | boolean>
  >({
    page: currentPage,
    itemPerPage: 3,
    brandId: "",
    categoryId: "",
    lowerPrice: "",
    upperPrice: "",
  });
  const { data, isLoading } = useGetMaterial(searchParams);

  const reviews = [
    {
      name: "Sienna",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://cdn.oneesports.vn/cdn-data/sites/4/2022/11/t1-faker-thumb.jpg",
    },
    {
      name: "Brenna",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://cdn.oneesports.vn/cdn-data/sites/4/2023/03/LeagueofLegends_LCK_Faker_Rose_Wallpaper-1536x864-1-450x253.jpg",
    },
    {
      name: "Gemma",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://phunuso.mediacdn.vn/603486343963435008/2023/11/3/faker-instagram-1-169898142287573429224-1698982303099-1698982303212197077047.png",
    },
  ];

  const { toast } = useToast();
  const { addCartItem } = useShoppingContext();
  const [backgroundImage, setBackgroundImage] = useState("");
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

  const { id } = useParams();
  const { data: materialData, isLoading: isLoadingMaterialData } =
    useGetMaterialById(id.toString());
  if (!isLoadingMaterialData) <div>...Loading</div>;

  const images = [
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
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  // Once materialData is available and variants are not null, set the selectedVariant to the first variantId
  useEffect(() => {
    if (materialData?.data?.variants && materialData.data.variants.length > 0) {
      setSelectedVariant(materialData.data.variants[0].variantId);
    } else {
      setSelectedVariant(null); // Handle the case when variants are null or empty
    }
  }, [materialData]); // Re-run when materialData changes

  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(
    materialData?.data?.variants[0]?.sku ?? null
  );
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<
    number | null
  >(materialData?.data?.variants[0]?.price ?? null);
  const [selectedVariantDiscount, setSelectedVariantDiscount] = useState<
    string | null
  >(materialData?.data?.variants[0]?.discount ?? null);
  const [selectedVariantAfter, setSelectedVariantAfter] = useState<
    number | null
  >(materialData?.data?.variants[0]?.afterDiscountPrice ?? null);
  // const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

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

  const handleVariantClick = (variantId: string) => {
    setSelectedVariant(variantId);
  };
  const handleVariantNameClick = (variantName: string) => {
    setSelectedVariantName(variantName);
  };
  const handleVariantPriceClick = (variantPrice: number) => {
    setSelectedVariantPrice(variantPrice);
  };
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

  const materialId = materialData?.data?.material.id;
  const searchParamsquantity = {
    materialId: materialId,
    variantId: selectedVariant || undefined,
  };

  const { data: storeQuantityData, isLoading: isLoadingStoreQuantity } =
    useGetQuantityStore(searchParamsquantity);

  const [radioValue, setRadioValue] = useState("default");
  const addressFull =
    session?.user.user.province +
    ", " +
    session?.user.user.district +
    ", " +
    session?.user.user.ward;
  return (
    <div className="bg-gray-100">
      <div className="max-w-[85%] mx-auto lg:w-[70%]">
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
                <BreadcrumbPage className="text-xl">
                  {materialData?.data?.material.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-lg">
          <div className="container mx-auto grid gap-8 md:grid-cols-2 ">
            <div>
              <div className="w-full sm:h-[55vh] h-[40vh] m-auto py-5 relative group">
                {isLoadingMaterialData ? (
                  <Skeleton className="h-[350px] w-[450px] rounded-xl" />
                ) : (
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
                    className="w-full h-full rounded-xl bg-center duration-500 cursor-pointer"
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
                          onClick={() => setBackgroundImage("")}
                        >
                          <img
                            src={slide.src}
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
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
              <h1 className="text-3xl font-bold">
                {selectedVariantName
                  ? selectedVariantName
                  : materialData?.data?.material.name}
              </h1>

              {/* <div className="flex items-center">
                <Rating
                  name="half-rating-read"
                  defaultValue={4}
                  precision={0.5}
                  readOnly
                />
                <span className="text-gray-600 ml-2">(32 reviews)</span>
              </div> */}

              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-red-500">
                  {materialData?.data?.variants.length === 0
                    ? materialData.data.material.discount
                      ? materialData.data.material.afterDiscountPrice?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "vnd",
                          }
                        )
                      : materialData.data.material.salePrice?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "vnd",
                          }
                        )
                    : selectedVariantDiscount
                    ? selectedVariantAfter?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "vnd",
                      })
                    : selectedVariantPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "vnd",
                      })}
                </span>
                {materialData?.data?.material.discount ? (
                  <span className="text-gray-500 line-through">
                    {(
                      materialData?.data?.material?.salePrice ||
                      "Giá sản phẩm không có sẵn"
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                ) : (
                  ""
                )}
                {selectedVariantDiscount && selectedVariantDiscount !== "0" ? (
                  <span className="text-gray-500 line-through">
                    {(selectedVariantPrice
                      ? selectedVariantPrice
                      : materialData?.data?.material?.salePrice ||
                        "Giá sản phẩm không có sẵn"
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                ) : (
                  ""
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
                        <Button className="text-blue-500" variant="ghost">
                          Bạn muốn giao tới đâu?
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Địa chỉ giao hàng</DialogTitle>
                          <DialogDescription>
                            <div>
                              <p>
                                Hãy chọn địa chỉ nhận hàng để được dự báo thời
                                gian giao hàng cùng phí đóng gói, vận chuyển một
                                cách chính xác nhất.
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
                                    setIsDialogOpen={setIsDialogOpen1}
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
                  <Dialog open={isDialogOpen2} onOpenChange={setIsDialogOpen2}>
                    <DialogTrigger asChild>
                      <Button className="text-blue-500" variant="ghost">
                        Đổi
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Địa chỉ giao hàng</DialogTitle>
                        <DialogDescription>
                          <div>
                            <p>
                              Hãy chọn địa chỉ nhận hàng để được dự báo thời
                              gian giao hàng cùng phí đóng gói, vận chuyển một
                              cách chính xác nhất.
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
                </div>
              </div>

              <div>
                <span className="text-gray-600">Các loại</span>
                <div className="flex items-center space-x-2">
                  {materialData?.data?.variants.map((variant, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleVariantPriceClick(variant.price);
                        handleVariantDiscountClick(variant.discount || "");
                        handleVariantAfterClick(
                          variant.afterDiscountPrice || 0
                        );
                        handleVariantClick(variant.variantId);
                        handleVariantNameClick(variant.sku);
                        setBackgroundImage(variant.image);
                      }}
                      className={`flex items-center border p-1 ${
                        selectedVariant === variant.variantId
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-blue-100 hover:text-blue-600"
                      } `}
                    >
                      {/* <img
                        src={variant.image}
                        alt={`Variant ${index + 1}`}
                        className="w-12 h-12 object-cover"
                      /> */}
                      <div className="p-2">
                        <h1>{variant.sku}</h1>
                      </div>
                      <div className="flex-col mt-2">
                        {variant?.attributes?.map((attribute, idx) => (
                          <button
                            key={idx}
                            className="flex text-[14px] items-center"
                          >
                            <div className="capitalize font-bold">
                              {attribute.name}:&nbsp;
                            </div>
                            <div className="capitalize">{attribute.value}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <h2>
                    Hiện tại có{" "}
                    <span className="font-bold">
                      {storeQuantityData?.data?.items.length}
                    </span>{" "}
                    chi nhánh còn sản phẩm
                  </h2>
                  <div className="h-32">
                    {storeQuantityData?.data?.items.length === 0 ? (
                      ""
                    ) : (
                      <ul className="max-h-32 text-[12px] text-blue-500 overflow-y-auto mt-1 p-2 border rounded-sm shadow-sm">
                        {storeQuantityData?.data &&
                          storeQuantityData.data.items.map((item, index) => (
                            <li className="w-full" key={index}>
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
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                  <button className="px-3 py-2" onClick={decrement}>
                    -
                  </button>
                  <input
                    type="text"
                    value={count}
                    onChange={handleInputChange}
                    className="w-12 text-center border-l border-r"
                  />
                  <button className="px-3 py-2" onClick={increment}>
                    +
                  </button>
                </div>
                {storeQuantityData?.data &&
                storeQuantityData.data.totalQuantityInAllStore > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i> Thêm vào giỏ
                    hàng
                  </button>
                ) : (
                  <button className="flex items-center px-6 py-2 bg-gray-600 text-white rounded">
                    <i className="fas fa-shopping-cart mr-2"></i> Sản phẩm đã
                    hết hàng
                  </button>
                )}
                <button className="px-2 py-2 border rounded hover:bg-blue-500 hover:text-white transition ease-in-out duration-500 hover:-translate-y-2">
                  <CiHeart size={25} className="font-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-5 rounded-sm shadow-lg">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-2 lg:w-[400px]">
              <TabsTrigger className="font-bold" value="info">
                Mô tả
              </TabsTrigger>
              <TabsTrigger className="font-bold" value="rating">
                Đánh giá
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="max-w-full m-10 mx-8">
                <h1 className="text-red-500 text-2xl font-bold mb-4">
                  {materialData?.data?.material.name}
                </h1>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: materialData?.data?.material.description || "",
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="rating">
              <div className="max-w-full m-10 mx-8">
                <h2 className="text-xl font-semibold mb-4">
                  Customer questions & answers
                </h2>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        alt={`Profile picture of ${review.name}`}
                        className="w-12 h-12 rounded-full object-cover"
                        src={review.imageUrl}
                        width="60"
                        height="60"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-semibold">
                              {review.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <Rating
                            name="half-rating-read"
                            defaultValue={review.rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Add a review
                </h2>
                <form className="space-y-4">
                  <Rating
                    name="half-rating-read"
                    defaultValue={4}
                    precision={0.5}
                  />
                  <textarea
                    className="w-full p-4 border rounded-lg"
                    placeholder="Write Comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg"
                    type="submit"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Sản phẩm liên quan
            </h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-full py-5"
          >
            <CarouselContent className="-ml-1">
              {data?.data.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                >
                  <div className="p-2">
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
                          <div className="bg-blue-400 text-white px-2 py-1 rounded-sm my-1">
                            {/* {product.discount} */} Mới
                          </div>
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 mr-2"
                          >
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
                              {product.material.salePrice.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "vnd",
                                }
                              )}
                            </div>
                            <div className="text-xl sm:text-[16px] 2xl:text-xl font-semibold">
                              {product.material.salePrice.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "vnd",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
