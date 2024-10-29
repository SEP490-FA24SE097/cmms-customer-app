import React from 'react';
import { FaTruck, FaHeadset, FaLock, FaTags } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="py-7 border-t-4 w-[80%] mx-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-4 items-center space-y-4 md:space-y-0">
          <div className="min-w-[18rem] flex items-center space-x-5 bg-white px-8 py-4 shadow-xl rounded-sm">
            <FaTruck size={50} className="text-blue-500"/>
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
              <p className="font-semibold">Hot Offers</p>
              <p className="text-sm text-gray-500">Discounts up to 90%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.
            </p>
            <p className="text-sm">
              <strong>Phone Number</strong>
              <br />
              +1 (800) 060-07-30
            </p>
            <p className="text-sm mt-4">
              <strong>Email Address</strong>
              <br />
              red-parts@example.com
            </p>
            <p className="text-sm mt-4">
              <strong>Our Location</strong>
              <br />
              715 Fake Street, New York 10021 USA
            </p>
            <p className="text-sm mt-4">
              <strong>Working Hours</strong>
              <br />
              Mon-Sat 10:00pm - 7:00pm
            </p>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="text-sm space-y-2">
              <li>About Us</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Brands</li>
              <li>Contact Us</li>
              <li>Returns</li>
              <li>Site Map</li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-semibold mb-4">My Account</h3>
            <ul className="text-sm space-y-2">
              <li>Store Location</li>
              <li>Order History</li>
              <li>Wish List</li>
              <li>Newsletter</li>
              <li>Specials</li>
              <li>Gift Certificates</li>
              <li>Affiliate</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Enter your email address below to subscribe to our newsletter and keep up to date with discounts and special offers.
            </p>
            <div className="flex mb-4">
              <input type="email" placeholder="Email Address..." className="p-2 w-full text-gray-800" />
              <button className="bg-blue-500 text-white p-2">Subscribe</button>
            </div>
            <p className="text-sm mb-2">Follow us on social networks</p>
            <div className="flex space-x-2">
              <a href="#" className="text-blue-500">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="text-red-500">
                <i className="fab fa-youtube" />
              </a>
              <a href="#" className="text-blue-400">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="text-pink-500">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="text-yellow-500">
                <i className="fas fa-rss" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
