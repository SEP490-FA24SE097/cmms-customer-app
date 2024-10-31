"use client"
import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
const products = [
  {
    id: 1,
    name: "Brandix Spark Plug Kit ASR-400",
    imageUrl: "https://storage.googleapis.com/a1aa/image/kJTZYAAVMeUcPS6KMspHNElXRfKICwj92sxRyMqVX0rTKYsTA.jpg",
    stockStatus: "In Stock",
    price: "$19.00",
    reviews: 3,
  },
  {
    id: 2,
    name: "Brandix Brake Kit BDX-750Z370-S",
    imageUrl: "https://storage.googleapis.com/a1aa/image/CSLnubsT6n7eGqMF2WujhvGhBZ3lCJ03YJIsJY2HJbbJFM2JA.jpg",
    stockStatus: "In Stock",
    price: "$224.00",
    reviews: 22,
  },
  {
    id: 3,
    name: "Left Headlight Of Brandix Z54",
    imageUrl: "https://storage.googleapis.com/a1aa/image/bD2GHLhYkhqrIxu9x1IIaq0IkIYbfiVPVilhU5ZPIgPKFM2JA.jpg",
    stockStatus: "In Stock",
    price: "$349.00",
    reviews: 14,
  },
  // Add more products as needed
];

const WishlistPage: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-[85%] mx-auto">
      <div className="p-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/components">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl">Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Wishlist</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img alt={product.name} className="w-20 h-20 object-cover" src={product.imageUrl} />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.round(product.reviews / 5) ? "text-yellow-500" : "text-gray-400"}>
                          <i className="fas fa-star"></i>
                        </span>
                      ))}
                      <span className="text-gray-600 ml-2">{product.reviews} reviews</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">{product.stockStatus}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add to cart
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-gray-600 ml-4">
                      <RiDeleteBin6Line/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
