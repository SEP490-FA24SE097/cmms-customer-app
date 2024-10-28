import React, { useState,useEffect } from "react";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { FaRegUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiStoneTablet } from "react-icons/gi";
import { GiConcreteBag } from "react-icons/gi";
import { LuLampFloor } from "react-icons/lu";




import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
interface Category {
    title: string;
    icon: React.ReactNode;
    items: string[];
  }
  
  const categories: Category[] = [
    {
      title: "Vật liệu cơ bản",
      icon: <GiStoneTablet/>,
      items: [
        "Xi măng",
        "sắt",
        "thép",
        "cát",
        "đá",
        "gạch",
      ],
    },
    {
      title: "Vật liệu kêt cấu",
      icon: <GiConcreteBag/>,
      items: [
        "bê tông",
        "phụ gia xây dựng",
      ],
    },
    {
      title: "Vật liệu hoàn thiện",
      icon: <LuLampFloor/>,
      items: [
        "Tường",
        "trần",
        "sàn",
        "vật tư nội thất",
        "vật tư ngoại thất",
      ],
    },
  ];
  
export default function Header() {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
          id: 1,
          name: "Apple iMac 20”",
          description: "512GB, 32GB RAM",
          price: 2999,
          imageUrl: "https://storage.googleapis.com/a1aa/image/b03xUCTxEnYdENMDkFyp2FXnooJCgNS9FTbAaDK273qRYx6E.jpg",
        },
        {
          id: 2,
          name: "Apple iPhone 15",
          description: "Gold Edition, 256GB",
          price: 599,
          imageUrl: "https://storage.googleapis.com/a1aa/image/JKj8hdxNLD57HBv5aU4vC8kmWGoMVtVJI4AirZtefi6FhFrTA.jpg",
        },
        {
          id: 3,
          name: "Apple iPad Air",
          description: "Silver, 64GB",
          price: 38599,
          imageUrl: "https://storage.googleapis.com/a1aa/image/EUVgaQbCY3onEBQzyMqU83uzgBP1SepjCOIRDB56Q49hwi1JA.jpg",
        },
        {
          id: 4,
          name: "Apple Watch SE",
          description: "Purple, GPS",
          price: 199,
          imageUrl: "https://storage.googleapis.com/a1aa/image/z6vJ0Jgwy2rkIR3XUnXP7X6mcTfJsV8AK00llwNnwpKhwi1JA.jpg",
        },
      ]);
    
      const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
      };
    
      const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    
    <nav className="bg-[#fff]">
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex flex-row gap-2 items-center">
                        <Image
                            src="/logo.svg"
                            width={80}
                            height={80}
                            alt="Picture of the author"
                        />
                        <a href="" className="text-[15px] text-black font-bold lg:text-3xl">CMMS</a>
                    </div>
                </div>
                <div className="max-w-lg mr-auto ml-8">
                    <form className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="hidden sm:flex bg-slate-100 lg:h-10 hover:bg-slate-200 text-[18px] rounded-s font-bold border-blue-300" variant="outline">Vật liệu xây dựng <IoIosArrowDown /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Các loại vật liệu</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>Vật liệu xây dựng cơ bản</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Vật liệu xây dựng kết cấu</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Vật liệu xây dựng hoàn thiện</span>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex w-full max-w-sm items-center">
                            <Input type="" placeholder="Search" className="hidden sm:block w-1/2 lg:h-10 lg:text-2xl lg:w-[200px] xl:w-[500px]"/>
                            <Button variant="outline" type="submit" className="bg-blue-300 lg:h-10">
                                <FaSearch className="h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="ml-auto">
                    <div className="inline-flex gap-5">
                        <Button className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium">
                            <div className="relative">
                                <FaRegHeart size={25}/> 
                                <span className="absolute top-0 right-0 grid min-h-[5px] min-w-[18px] text-[12px] font-bold translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-400 text-white">
                                    5
                                </span>
                            </div>
                            <h3 className="hidden sm:block">Yêu thích</h3>
                        </Button>
                    
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium">
                                    <div className="relative">
                                        <TbShoppingCart size={25}/> 
                                        <span className="absolute top-0 right-0 grid min-h-[10px] min-w-[18px] text-[12px] font-bold translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-400 text-white">
                                            4
                                        </span>
                                    </div>
                                    <h3 className="hidden sm:block">Vỏ hàng</h3>
                                    <IoIosArrowDown className="hidden sm:block"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                            <div className="flex justify-center items-center">
                                <div className="w-80">
                                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                                    <h2 className="text-lg font-semibold">Vỏ hang của bạn</h2>
                                    <span className="text-gray-500">{cartItems.length} Sản phẩm</span>
                                    </div>
                                    <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={item.imageUrl} alt={item.name} className="w-10 h-10" />
                                            <div>
                                            <h3 className="text-sm font-medium">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium">{item.price}đ</span>
                                            <HoverCard>
                                                <HoverCardTrigger><RiDeleteBin6Line color="red"/></HoverCardTrigger>
                                                <HoverCardContent side="top" className="w-fit p-2 bg-slate-950 text-white border-none">
                                                    Remove
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Tổng tiền</span>
                                        <span className="text-lg font-semibold">{total}đ</span>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg">
                                        Tiến đến vỏ hàng
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-white text-black hover:bg-slate-200 text-[18px] font-medium">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback className="w-5 h-5">CN</AvatarFallback>
                                        </Avatar>
                                        <h3 className="hidden sm:block">Cuong</h3>
                                        <IoIosArrowDown className="hidden sm:block"/>
                                    </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Xin chào, Cường</DropdownMenuLabel>
                                <DropdownMenuLabel className="text-[12px] mt-0 pt-0 font-normal text-slate-500">cuong@gmail.com</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="font-semibold">
                                        <FaRegUser />
                                        <span>Thông tin</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="font-semibold">
                                        <FaHistory />
                                        <span>Lịch sử đơn hàng</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="font-semibold">
                                        <FaHistory />
                                        <span>chưa bt</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="font-semibold">
                                        <FaHistory />
                                        <span>Chưa bt luôn</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="font-semibold text-red-500">
                                <MdLogout size={25}/>
                                <span className="text-[20px]">Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b">
            <div className="flex items-center justify-center h-14">
                <ul className="flex">
                    <li><Button size="lg" className="text-xl font-semibold text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none py-7">Trang chủ</Button></li>
                    <li>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button size="lg" className="text-xl font-semibold text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none py-7">Sản phẩm <IoIosArrowDown/></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-screen">
                                <div>
                                    <div className="bg-white mx-10">
                                <div className="flex justify-between p-5">
                                    <div className="flex space-x-24">
                                    {categories.map((category, index) => (
                                        <div key={index}>
                                        <Button variant="ghost" className="font-bold text-2xl hover:bg-white hover:text-red-300 mb-4 flex items-center">
                                            <span className="mr-2">{category.icon}</span>
                                            {category.title}
                                        </Button>
                                        <ul className="space-y-2">
                                            {category.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                <Label className="ml-8 text-[18px] hover:text-red-200 capitalize    ">{item}</Label>
                                            </li>
                                            ))}
                                        </ul>
                                        </div>
                                    ))}
                                    </div>
                                    <div>
                                    <img
                                        alt="Construction worker on a wooden frame structure under a blue sky"
                                        src="https://storage.googleapis.com/a1aa/image/FyvX4XAnwBrUIR3M8yUkJ1s9jBof1uQAITjOU39QarvIoj1JA.jpg"                       
                                        className="object-cover w-[500px] h-[300px] rounded-md mr-10"
                                    />
                                    </div>
                                </div>
                                </div>
                                </div>
                            </PopoverContent>
                        </Popover>                      
                    </li>
                    <li>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button size="lg" className="text-xl font-semibold text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none py-7">Thương hiệu <IoIosArrowDown/></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60">
                                <div className="max-h-[400px] overflow-y-auto">
                                    <ul className="flex flex-col">
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                        <li className="border-b"><Button className="w-full text-[18px] font-normal text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none">SamSung</Button></li>
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </li>
                    <li><Button size="lg" className="text-xl font-semibold text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none py-7">Giới thiệu</Button></li>
                    <li><Button size="lg" className="text-xl font-semibold text-black hover:text-red-400 bg-white hover:bg-slate-100 border-none shadow-none py-7">Liên hệ</Button></li>
                </ul>
            </div>
        </div>
    </nav>
  );
}
