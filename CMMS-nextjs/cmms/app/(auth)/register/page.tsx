"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2 box-animate">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col pb-10">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="my-4 flex items-center flex-col">
            <h1 className="text-3xl font-bold lg:text-4xl">
              Tạo tài khoản mới
            </h1>
          </div>
          <form className="w-56 lg:w-1/3">
            <Label htmlFor="fullname">Họ và tên</Label>
            <Input
              className="mt-2 mb-1 bg-transparent"
              id="fullname"
              placeholder="Họ và tên"
            />
            <Label htmlFor="Email">Email</Label>
            <Input
              className="mt-2 mb-1 bg-transparent"
              type="email"
              id="email"
              placeholder="Email"
            />

            <Label htmlFor="username">Tài khoản</Label>
            <Input
              className="mt-2 mb-1 bg-transparent"
              id="username"
              placeholder="Username"
            />

            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              className="mt-2 mb-1 bg-transparent"
              type="password"
              id="password"
              placeholder="Password"
            />
            {/* Toggle visibility of the Label and Input based on checkbox state */}
            <div
              className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                isChecked ? "max-h-40" : "max-h-0"
              }`}
            >
              {isChecked && (
                <div>
                  <Label htmlFor="tax-code">Mã số thuế</Label>
                  <Input
                    className="mt-2 mb-1 bg-transparent"
                    id="tax-code"
                    placeholder="Mã số Thuế"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 items-center mt-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={handleCheckboxChange}
                className="border-white checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <h1 className="text-[14px] italic underline underline-offset-2 decoration-1">
                Tài khoản doanh nghiệp
              </h1>
            </div>

            <Button
              type="submit"
              className="w-full mt-5 rounded-full font-bold  bg-indigo-600 hover:bg-indigo-700 "
            >
              Đăng ký
            </Button>
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
