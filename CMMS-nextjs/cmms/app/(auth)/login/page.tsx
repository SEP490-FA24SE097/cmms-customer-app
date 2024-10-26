"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {

    const router = useRouter();

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2 box-animate">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="my-4 flex items-center flex-col">
            <h1 className="text-3xl font-bold lg:text-4xl">Đăng nhập</h1>
            <p className="mt-2 text-xs text-slate-400">
              Chào mừng bạn đến với trang web của chúng tôi!
            </p>          
          </div>
          <form className="w-1/3">
              <Button className="flex items-center w-full mb-4 gap-4 px-10 bg-transparent" variant="outline">
                <FcGoogle/>
                Đăng nhập bằng google
              </Button>

              <Label htmlFor="username">Tài khoản</Label>
              <Input className="mt-2 mb-4 bg-transparent"
                id="username" placeholder="Username"/>

              <Label htmlFor="password">Mật khẩu</Label>
              <Input className="mt-2 mb-2 bg-transparent"
                type="password" id="password" placeholder="Password"/>
                
              
              <Button onClick={() => router.push('register')} className="flex ml-auto text-slate-400" variant="link">Đăng ký</Button>

              <Button type="submit" className="w-full mt-5 rounded-full font-bold  bg-indigo-600 hover:bg-indigo-700 ">
                Đăng nhập
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
