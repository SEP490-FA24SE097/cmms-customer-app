"use client";

import {
  IMaterial,
  IMaterialChild,
  IVariants,
} from "@/lib/actions/materials/type/material-type";
import { createContext, useContext, useState, useEffect } from "react";

// tạo type cart
type CartItem = {
  qty: number;
  materialId: string,
  storeId: string,
  variantId: string,
};

// type product
export type MaterialStore = {
  materialId: string,
  storeId: string,
  variantId: string,
}

// tạo return của hook
interface ShoppingContextType {
  cartQty: number;

  cartItem: CartItem[];
  //   inscreateQty: (id: number) => void;
  //   decreateQty: (id: number) => void;
  addCartItem: (item: MaterialStore) => void;
  //   removeCartItem: (id: number) => void;
  //   clearCart: () => void;
}

//create context
const ShoppingContext = createContext<ShoppingContextType>(
  {} as ShoppingContextType
);

// viết hook để để sử dụng provider ở dưới
export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TO DO FUNCTION
  const [cartItem, setCartItem] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const jsonCartData = localStorage.getItem("cartItem");
      if (jsonCartData && typeof jsonCartData === "string") {
        try {
          return JSON.parse(jsonCartData);
        } catch (error) {
          console.error("Error parsing cart data from localStorage:", error);
          return [];
        }
      }
      return [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const cartQty = cartItem?.reduce((qty, item) => qty + item.qty, 0);

  // calculation đơn giản => tính toán price dựa trên rule của m
//   const totalPrice = cartItem.reduce(
//     (total, item) => total + item.material.salePrice * item.qty,
//     0
//   );

const addCartItem = (material: MaterialStore) => {
  if (material) {
    const currentCartItem = cartItem.find(
      (item) => item.materialId === material.materialId && item.variantId === material.variantId
    );

    if (currentCartItem) {
      const newItems = cartItem.map((item) => {
        if (item.materialId === material.materialId && item.variantId === material.variantId) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItem(newItems);
    } else {
      const newItem = { ...material, qty: 1 };
      setCartItem([...cartItem, newItem]);
    }
  }
};

  return (
    <ShoppingContext.Provider
      value={{
        cartQty,
        cartItem,
        addCartItem,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
