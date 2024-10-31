import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  return (
    <div className="py-2 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
      <h2 className="text-xl sm:col-span-2 font-bold">Thông tin tài khoản</h2>
      <div className="w-full flex flex-col gap-1.5">
        <h5 className="">Họ và tên</h5>
        <Input className="h-12 text-[18px]" type="text" id="name" placeholder="Họ và tên" />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Email</h5>
        <Input className="h-12 text-[18px]" type="email" id="email" placeholder="Email" />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Số điện thoại</h5>
        <Input className="h-12 text-[18px]" type="tel" id="tel" placeholder="Số điện thoại" />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Ngày sinh nhật</h5>
        <Input className="h-12 text-[18px]" type="date" id="date" placeholder="Ngày sinh nhậti" />
      </div>
      
      <Button className="text-xl bg-red-500 hover:bg-red-400 w-2/5 py-6">Cập nhật</Button>
    </div>
  );
}
