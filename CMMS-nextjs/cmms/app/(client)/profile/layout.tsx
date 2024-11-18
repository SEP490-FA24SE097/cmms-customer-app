"use client";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiLock, CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children, // Nội dung động từ route con (editprofile, changepassword, order)
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-[85%] xl:max-w-[70%] mx-auto">
        <div className="grid sm:grid-cols-4 gap-10">
          {/* Sidebar Menu */}
          <div className="col-span-1 bg-white w-full h-[40vh] rounded-sm shadow-lg">
            <ul className="text-xl">
              <li>
                <Link href="/profile/editprofile">
                  <div
                    className={`w-full text-xl py-5 flex justify-start px-4 ${
                      pathname === "/profile/editprofile"
                        ? "bg-slate-300 font-bold"
                        : ""
                    }`}
                  >
                    <FaRegUserCircle size={30} />
                    <span className="ml-2">Thông tin</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/profile/order">
                  <div
                    className={`w-full text-xl py-5 flex justify-start px-4 ${
                      pathname === "/profile/order"
                        ? "bg-slate-300 font-bold"
                        : ""
                    }`}
                  >
                    <MdOutlineShoppingBag size={30} />
                    <span className="ml-2">Lịch sử đơn hàng</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/profile/changepassword">
                  <div
                    className={`w-full text-xl py-5 flex justify-start px-4 ${
                      pathname === "/profile/changepassword"
                        ? "bg-slate-300 font-bold"
                        : ""
                    }`}
                  >
                    <CiLock size={30} />
                    <span className="ml-2">Đổi mật khẩu</span>
                  </div>
                </Link>
              </li>
              <li>
                <div
                  className="w-full text-xl py-5 flex justify-start px-4 cursor-pointer"
                  onClick={() => alert("Đăng xuất!")}
                >
                  <CiLogout size={30} />
                  <span className="ml-2">Đăng xuất</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-span-3 bg-white w-full h-auto rounded-sm p-5 shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
