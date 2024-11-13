"use client";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import EditProfile from "./editprofile/page";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import ChangePassword from "./changepassword/page";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Order from "./order/page";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-[85%] xl:max-w-[70%] mx-auto">
        <div className="grid sm:grid-cols-4 gap-10">
          <div className="col-span-1 bg-white w-full h-60 rounded-sm shadow-lg">
            <ul className="text-xl">
              <li>
                <Button
                  variant="ghost"
                  className="w-full text-xl py-7 flex justify-start bg-slate-300 font-bold"
                  onClick={() => router.push("/profile/editprofile")}
                >
                  <FaRegUserCircle size={30} /> Thông tin
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full text-xl py-7 flex justify-start"
                >
                  <MdOutlineShoppingBag size={30} /> Lịch sử đơn hàng
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full text-xl py-7 flex justify-start"
                  onClick={() => router.push("/profile/changepassword")}
                >
                  <CiLock size={30} /> Đổi mật khẩu
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full text-xl py-7 flex justify-start"
                >
                  <CiLogout size={30} /> Đăng xuất
                </Button>
              </li>
            </ul>
          </div>
          <div className="col-span-3 bg-white w-full h-auto rounded-sm p-5 shadow-lg">
            {/* <EditProfile /> */}
            {/* <ChangePassword /> */}
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
}
