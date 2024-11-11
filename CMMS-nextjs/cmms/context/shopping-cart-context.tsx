"use client";

import {
  IMaterial,
  IMaterialChild,
  IVariants,
} from "@/lib/actions/materials/type/material-type";
import { createContext, useContext, useState, useEffect } from "react";

// tạo type cart
export type CartItem = {
  quantity: number;
  materialId: string;
  storeId: string;
  variantId: string;
};

// Material store type definition
export type MaterialStore = {
  materialId: string;
  storeId: string;
  variantId: string;
};

// tạo return của hook
interface ShoppingContextType {
  cartQty: number;
  cartItem: CartItem[];
  inscreateQty: (materialId: string, variantId: string) => void;
  decreateQty: (materialId: string, variantId: string) => void;
  addCartItem: (item: MaterialStore, quantity: number) => void;
  removeCartItem: (materialId: string, variantId: string) => void;
  updateQuantity: (materialId: string, variantId: string, qty: number) => void;
}

// Create Shopping context
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

  const cartQty = cartItem?.reduce((qty, item) => qty + item.quantity, 0);

  const addCartItem = (material: MaterialStore, quantity: number) => {
    if (material && quantity > 0) {
      const currentCartItem = cartItem.find(
        (item) =>
          item.materialId === material.materialId &&
          item.variantId === material.variantId
      );

      if (currentCartItem) {
        const newItems = cartItem.map((item) => {
          if (
            item.materialId === material.materialId &&
            item.variantId === material.variantId
          ) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
        setCartItem(newItems);
      } else {
        const newItem = { ...material, quantity };
        setCartItem([...cartItem, newItem]);
      }
    }
  };

  const inscreateQty = (materialId: string, variantId: string) => {
    setCartItem((currentCart) =>
      currentCart.map((item) =>
        item.materialId === materialId && item.variantId === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreateQty = (materialId: string, variantId: string) => {
    setCartItem((currentCart) =>
      currentCart
        .map((item) =>
          item.materialId === materialId && item.variantId === variantId
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (materialId: string, variantId: string) => {
    setCartItem((currentCart) =>
      currentCart.filter(
        (item) =>
          !(item.materialId === materialId && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (
    materialId: string,
    variantId: string,
    qty: number
  ) => {
    if (qty < 1) return;
    setCartItem((currentCart) =>
      currentCart.map((item) =>
        item.materialId === materialId && item.variantId === variantId
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartQty,
        cartItem,
        inscreateQty,
        decreateQty,
        addCartItem,
        removeCartItem,
        updateQuantity,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
