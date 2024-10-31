import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangePassword() {
  return (
    <form action="">
      <div className="py-2 grid w-full lg:grid-cols-2 gap-5">
        <h2 className="text-xl sm:col-span-2 font-bold">Thông tin tài khoản</h2>
        <div className="w-full gap-1.5">
          <h5 className="">Mật khẩu hiện tại</h5>
          <Input
            className="h-12 text-[18px]"
            type="password"
            id="password"
            placeholder="Mật khẩu hiện tại"
          />
        </div>
        <div className="hidden sm:block"></div>
        <div className="w-full gap-1.5">
          <h5 className="">Mật khẩu mới</h5>
          <Input
            className="h-12 text-[18px]"
            type="password"
            id="newpassword"
            placeholder="Mật khẩu mới"
          />
        </div>
        <div className="w-full gap-1.5">
          <h5 className="">Xác nhận mật khẩu mới</h5>
          <Input
            className="h-12 text-[18px]"
            type="password"
            id="conpassword"
            placeholder="Xác nhận"
          />
        </div>
        <Button
          type="submit"
          className="mt-5 bg-red-500 hover:bg-red-400 text-xl py-6 px-4"
        >
          Đổi mật khẩu
        </Button>
      </div>
    </form>
  );
}
