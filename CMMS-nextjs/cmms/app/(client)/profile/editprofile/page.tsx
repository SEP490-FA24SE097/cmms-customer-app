"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function EditProfile() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [name, setName] = useState<string | null>(
    session?.user.user.fullName || null
  );
  const [email, setEmail] = useState<string | null>(
    session?.user.user.email || null
  );
  const [phone, setPhone] = useState<string | null>(
    session?.user.user.phoneNumber || null
  );
  const [address, setAddress] = useState<string | null>(
    session?.user.user.address || null
  );
  const [dob, setDob] = useState(session?.user?.user?.dob || ""); // Lấy giá trị ban đầu hoặc để trống

  console.log(dob);

  const handleDOBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div className="py-2 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
      <h2 className="text-xl sm:col-span-2 font-bold">Thông tin tài khoản</h2>
      <div className="w-full flex flex-col gap-1.5">
        <h5 className="">Họ và tên</h5>
        <Input
          className="h-12 text-[18px]"
          type="text"
          id="name"
          value={name ?? ""}
          placeholder="Họ và tên"
        />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Email</h5>
        <Input
          className="h-12 text-[18px]"
          type="email"
          id="email"
          value={email ?? ""}
          placeholder="Email"
        />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Số điện thoại</h5>
        <Input
          className="h-12 text-[18px]"
          type="tel"
          id="tel"
          value={phone ?? ""}
          placeholder="Số điện thoại"
        />
      </div>
      <div className="w-full gap-1.5">
        <h5 className="">Ngày sinh nhật</h5>
        <Input
          className="h-12 text-[18px]"
          type="date"
          id="date"
          value={dob.slice(0, 10)} // Cắt chuỗi ISO để hiển thị đúng định dạng
          onChange={handleDOBChange}
          placeholder="Ngày sinh nhật"
        />
      </div>

      <Button className="text-xl bg-red-500 hover:bg-red-400 w-2/5 py-6">
        Cập nhật
      </Button>
    </div>
  );
}
