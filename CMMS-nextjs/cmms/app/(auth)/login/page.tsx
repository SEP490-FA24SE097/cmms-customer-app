"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/");
  };
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
          <form>
            <Button
              className="flex items-center w-full mb-4 gap-4 px-10 bg-transparent"
              variant="outline"
            >
              <FcGoogle />
              Đăng nhập bằng google
            </Button>

            <Label htmlFor="username">Tài khoản</Label>
            <Input
              className="mt-2 mb-4 bg-transparent"
              id="username"
              placeholder="Username"
            />

            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              className="mt-2 mb-2 bg-transparent"
              type="password"
              id="password"
              placeholder="Password"
            />

            <a className="text-sm flex justify-end font-medium text-primary-600 hover:underline dark:text-primary-500">
              Quên mật khẩu?
            </a>

            <Button
              type="submit"
              className="w-full mt-5 rounded-full font-bold  bg-indigo-600 hover:bg-indigo-700 "
            >
              Đăng nhập
            </Button>
            <p className="mt-3 flex justify-center text-sm font-light text-gray-500 dark:text-gray-400">
              Tôi chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/bg.jpg"
            className="object-cover"
            fill={true}
            alt="Picture of the author"
          />
        </div>
      </div>
    </main>
  );
}
