"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function Home() {

  const router =useRouter();

  return (
    
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2 box-animate">

        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="my-4 flex items-center flex-col">
            <h1 className="text-3xl font-bold lg:text-4xl">Tạo tài khoản mới</h1>
 
            </div>
          <form className="w-1/3">

                <Label htmlFor="fullname">Họ và tên</Label>
              <Input className="mt-2 mb-4 bg-transparent"
                id="fullname" placeholder="Họ và tên"/>

              <Label htmlFor="username">Tài khoản</Label>
              <Input className="mt-2 mb-4 bg-transparent"
                id="username" placeholder="Username"/>

              <Label htmlFor="password">Mật khẩu</Label>
              <Input className="mt-2 mb-2 bg-transparent"
                type="password" id="password" placeholder="Password"/>

                <Label htmlFor="phone">Số điện thoại</Label>
              <Input className="mt-2 mb-2 bg-transparent"
                type="tel" id="phone" placeholder="Số điện thoại"/>
              
              <Button className="flex ml-auto text-slate-400" variant="link">Tôi đã có tài khoản trước đó</Button>

              <Button type="submit" className="w-full mt-5 rounded-full font-bold  bg-indigo-600 hover:bg-indigo-700 ">
                Đăng ký
              </Button>
          </form>
          
        </div>
        <div className="relative hidden md:block">
        <Image
            src="/bg.jpg"
            className="object-cover" fill={true}
            alt="Picture of the author"
          />
        </div>
      </div>
    </main>
  );
}
