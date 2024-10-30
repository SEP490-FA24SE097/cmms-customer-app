import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
const fakeData = [
  {
    title: "Cơ bản",
    imgSrc:
      "https://gachtrangtridep.net/wp-content/uploads/2021/05/1-bao-xi-mang-nang-bao-nhieu-kg.jpg",
    items: [
      "Headlights",
      "Tail Lights",
      "Fog Lights",
      "Turn Signals",
      "Switches & Relays",
    ],
  },
  {
    title: "Kết cấu",
    imgSrc:
      "https://phugiachongtham.net/kcfinder/upload/images/phu-gia-be-tong-phun-PCON-1kg.jpg",
    items: [
      "Fuel Pumps",
      "Motor Oil",
      "Spark Plugs",
      "Fuel Injector",
      "Control Motor",
    ],
  },
  {
    title: "Hoàn thiện",
    imgSrc:
      "https://product.hstatic.net/1000288788/product/z2232844194712_ca52107a4642158d6aa441f76762b512_34e0d44951264bc0b24038e47761bfda_master.jpg",
    items: ["Bumpers", "Hoods", "Grilles", "Fog Lights", "Door Handles"],
  },
];
const fakeProducts = [
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
const fakeCategories = [
    { name: "Tất cả", key: "all" },
    { name: "Vật tư nội thất", key: "vat_tu_noi_that" },
    { name: "Sàn", key: "san" },
    { name: "Gạch", key: "gach" },
  ];
  const topSelling = [
    {
      title: "Nestle Original Coffee-Mate Coffee Creamer",
      imgSrc: "https://storage.googleapis.com/a1aa/image/oIEjoUxsE8IzBhehnDS6SMfqhsr9OhqbFi4rlpyTm7LGigrTA.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Nestle Original Coffee-Mate Coffee Creamer",
      imgSrc: "https://storage.googleapis.com/a1aa/image/eUse4NslW1nQrUZF55JJdN37zVnQifglErfXZgZkypf7QEcdC.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Nestle Original Coffee-Mate Coffee Creamer",
      imgSrc: "https://storage.googleapis.com/a1aa/image/fLeb6HEdUwhdb0AfUyDafZt5QPY4hjEI57vCWAGl9bOjICuOB.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    }
  ];

  const trendingProducts = [
    {
      title: "Organic Cage-Free Grade A Large Brown Eggs",
      imgSrc: "https://storage.googleapis.com/a1aa/image/MppG6HpIa1IzMpJ8iu5Yg3g71d4k6U2L0znUNhHOQiQgI46E.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
      imgSrc: "https://storage.googleapis.com/a1aa/image/UKuFf2QirtWmCaZOGghKqh3FOPirfxmO5pwDax7qa6UEigrTA.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Naturally Flavored Cinnamon Vanilla Light Roast Coffee",
      imgSrc: "https://storage.googleapis.com/a1aa/image/BREdiMbk087GHNKoz3eYUfcsT9PkgP00MJNHo7NmaueHEBXnA.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    }
  ];

  const recentlyAdded = [
    {
      title: "Pepperidge Farm Farmhouse Hearty White Bread",
      imgSrc: "https://storage.googleapis.com/a1aa/image/84eyYaZTWF3rLiECFOoPYrecF5J7YBJ3PKfSE0lKTlzXEBXnA.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Organic Frozen Triple Berry Blend",
      imgSrc: "https://storage.googleapis.com/a1aa/image/vvKCkp9SJq5NOtemfMlAPRM9nx2el8r8lBSaCe6Ek0woICuOB.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    },
    {
      title: "Oroweat Country Buttermilk Bread",
      imgSrc: "https://storage.googleapis.com/a1aa/image/nluiZf4n6dTFN6kJNjhRWpeOf57Fy7seOHKZMZwEAjMwICuOB.jpg",
      rating: 4.0,
      price: "$32.85",
      oldPrice: "$33.8"
    }
];
const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "all"
    ? fakeProducts
    : fakeProducts.filter(product => product.category === selectedCategory);
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
                  <a className="text-blue-600" href="#">
                    Shop All
                  </a>
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
            <CarouselContent className="-ml-1">
              {fakeProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-2">
                    <Card
                      className="pt-6 max-h-[550px] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:w-2 rounded-xl
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 cursor-pointer group"
                    >
                      <CardContent className="flex flex-col items-center">
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          className="w-full h-72 object-cover mb-4 group-hover:scale-110 ease-in-out duration-300"
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
                                    Make changes to your profile here. Click
                                    save when you're done.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Name
                                    </Label>
                                    <Input
                                      id="name"
                                      defaultValue="Pedro Duarte"
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
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
                                {product.isFavorite && (
                                  <CiHeart
                                    className="text-stone-500 hover:text-black"
                                    size={25}
                                  />
                                )}
                                {!product.isFavorite && (
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
                            <div className="text-2xl font-normal text-stone-400 line-through">
                              {product.price}đ
                            </div>
                            <div className="text-2xl font-semibold">
                              {product.price}đ
                            </div>
                          </div>
                          <div>
                            <button className="px-3 py-2 font-semibold text-sm bg-red-300 hover:bg-red-400 text-white rounded-md shadow-sm group-hover:scale-125 ease-in-out duration-300 ">
                              <RiShoppingCart2Line size={25} />
                            </button>
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
                  className={`bg-transparent shadow-none font-bold ${selectedCategory === category.key ? 'bg-black text-white' : 'text-black hover:bg-slate-700 hover:text-white'}`}
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
          <CarouselContent className="-ml-1">
            {filteredProducts.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-2">
                  <Card
                    className="pt-6 max-h-[550px] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:w-2 rounded-xl
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 cursor-pointer group"
                  >
                    <CardContent className="flex flex-col items-center">
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        className="w-full h-72 object-cover mb-4 group-hover:scale-110 ease-in-out duration-300"
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
                                  Make changes to your profile here. Click save
                                  when you're done.
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
                                  <Label
                                    htmlFor="username"
                                    className="text-right"
                                  >
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
                              {product.isFavorite && (
                                <CiHeart
                                  className="text-stone-500 hover:text-black"
                                  size={25}
                                />
                              )}
                              {!product.isFavorite && (
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
                          <div className="text-2xl font-normal text-stone-400 line-through">
                            {product.price}đ
                          </div>
                          <div className="text-2xl font-semibold">
                            {product.price}đ
                          </div>
                        </div>
                        <div>
                          <button className="px-3 py-2 font-semibold text-sm bg-red-300 hover:bg-red-400 text-white rounded-md shadow-sm group-hover:scale-125 ease-in-out duration-300 ">
                            <RiShoppingCart2Line size={25} />
                          </button>
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
      <div className="max-w-[85%] mx-auto py-5">
      <div >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Top Selling */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Selling</h2>
            <div className="border-b-2 border-stone-300 mb-4"></div>
            <div className="space-y-10">
              {topSelling.map((product, index) => (
                <div key={index} className="group flex items-center p-2 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300">
                  <img alt={`Image of ${product.title}`} className="w-32 h-32 rounded" src={product.imgSrc} />
                  <div className="ml-8">
                    <h3 className="text-lg font-semibold group-hover:text-red-300 transition ease-in-out duration-300">{product.title}</h3>
                    <div className="flex w-full justify-start items-center gap-4">
                        <Rating
                          name="product-rating"
                          value={product.rating}
                          precision={0.5}
                          readOnly
                        />
                        <span className="text-black text-sm font-semibold">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex w-full justify-between items-center mt-3">
                        <div className="flex gap-2">
                          <div className="text-2xl font-normal text-stone-400 line-through">
                            {product.price}đ
                          </div>
                          <div className="text-2xl font-semibold">
                            {product.price}đ
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Products */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
            <div className="border-b-2 border-stone-300 mb-4"></div>
            <div className="space-y-10">
            {trendingProducts.map((product, index) => (
                <div key={index} className="group flex items-center p-2 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300">
                  <img alt={`Image of ${product.title}`} className="w-32 h-32 rounded" src={product.imgSrc} />
                  <div className="ml-8">
                    <h3 className="text-lg font-semibold group-hover:text-red-300 transition ease-in-out duration-300">{product.title}</h3>
                    <div className="flex w-full justify-start items-center gap-4">
                        <Rating
                          name="product-rating"
                          value={product.rating}
                          precision={0.5}
                          readOnly
                        />
                        <span className="text-black text-sm font-semibold">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex w-full justify-between items-center mt-3">
                        <div className="flex gap-2">
                          <div className="text-2xl font-normal text-stone-400 line-through">
                            {product.price}đ
                          </div>
                          <div className="text-2xl font-semibold">
                            {product.price}đ
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
            <div className="border-b-2 border-stone-300 mb-4"></div>
            <div className="space-y-10">
            {recentlyAdded.map((product, index) => (
                <div key={index} className="group flex items-center p-2 rounded-sm transition ease-in-out hover:-translate-y-1 duration-300">
                  <img alt={`Image of ${product.title}`} className="w-32 h-32 rounded" src={product.imgSrc} />
                  <div className="ml-8">
                    <h3 className="text-lg font-semibold group-hover:text-red-300 transition ease-in-out duration-300">{product.title}</h3>
                    <div className="flex w-full justify-start items-center gap-4">
                        <Rating
                          name="product-rating"
                          value={product.rating}
                          precision={0.5}
                          readOnly
                        />
                        <span className="text-black text-sm font-semibold">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex w-full justify-between items-center mt-3">
                        <div className="flex gap-2">
                          <div className="text-2xl font-normal text-stone-400 line-through">
                            {product.price}đ
                          </div>
                          <div className="text-2xl font-semibold">
                            {product.price}đ
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
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
