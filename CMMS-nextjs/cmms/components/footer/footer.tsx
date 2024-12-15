"use client";
import { useGetStore } from "@/lib/actions/store/store-query/store-quert";
import Link from "next/link";
import React from "react";
import { FaTruck, FaHeadset, FaLock, FaTags } from "react-icons/fa";

export default function Footer() {
  const { data: storeData, isLoading: isLoadingStore } = useGetStore();
  console.log(storeData);
  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="py-7 border-t-4 w-[80%] mx-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4 items-center space-y-4 md:space-y-0">
          <div className="min-w-[18rem] flex items-center space-x-5 bg-white px-8 py-4 shadow-xl rounded-sm">
            <FaTruck size={50} className="text-blue-500" />
            <div>
              <p className="font-semibold">Miễn phí vận chuyển</p>
              <p className="text-sm text-gray-500">Cho đơn hàng trên 1 triệu</p>
            </div>
          </div>
          <div className="min-w-[16rem] flex items-center space-x-5 bg-white px-8 py-4 shadow-xl rounded-sm">
            <FaHeadset size={50} className="text-blue-500" />
            <div>
              <p className="font-semibold">Hỗ trợ 24/7</p>
              <p className="text-sm text-gray-500">Gọi tôi khi bạn cần</p>
            </div>
          </div>
          <div className="min-w-[16rem] flex items-center space-x-5 bg-white px-8 py-4 shadow-xl rounded-sm">
            <FaLock size={50} className="text-blue-500" />
            <div>
              <p className="font-semibold">Bảo mật thông tin</p>
              <p className="text-sm text-gray-500">Thanh toán an toàn</p>
            </div>
          </div>
          <div className="min-w-[16rem] flex items-center space-x-5 bg-white px-8 py-4 shadow-xl rounded-sm">
            <FaTags size={50} className="text-blue-500" />
            <div>
              <p className="font-semibold">Giảm giá</p>
              <p className="text-sm text-gray-500">Giảm 10% cho doanh nghiệp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-white py-5 pt-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">CMMS</h3>
            <p className="text-sm mb-4">
              Chào mừng đến với trang web của chúng tôi.
            </p>
            <p className="text-sm">
              <strong>Số điện thoại</strong>
              <br />
              0909 223 322
            </p>
            <p className="text-sm mt-4">
              <strong>Địa chỉ Email</strong>
              <br />
              cmms490@gmail.com
            </p>
            <p className="text-sm mt-4">
              <strong>Thời gian làm việc</strong>
              <br />
              Cả tuần 10:00am - 7:00pm
            </p>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Địa chỉ</h3>
            <ul className="text-sm space-y-2">
              {storeData?.data.map((item) => (
                <li>{item.name}</li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-semibold mb-4">My Account</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/profile/editprofile">Thông tin tài khoản</Link>
              </li>
              <li>
                <Link href="/profile/order">Lịch sử đơn hàng</Link>
              </li>
              <li>
                <Link href="/profile/cart">Vỏ hàng</Link>
              </li>
              <li>
                <Link href="/profile/changepassword">Đổi mật khẩu</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Tải ứng dụng tại</h3>
            <p className="text-sm mb-4">
              Ứng dụng có thể tải ở appstore hoặc Google Play
            </p>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 mb-4">
              <div className="max-h-20 overflow-hidden">
                <img
                  src="/app-store.svg"
                  className="object-cover"
                  alt="app store"
                />
              </div>
              <div className="max-h-20 overflow-hidden">
                <img
                  src="/google-play.svg"
                  className="object-cover"
                  alt="app store"
                />
              </div>
            </div>
            <div className="flex gap-10">
              <h1 className="flex items-center">Hình thức thanh toán:</h1>
              <img
                src="/vnpay-logo-inkythuatso-01.jpg"
                className="h-10 w-20 object-cover rounded-2xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
