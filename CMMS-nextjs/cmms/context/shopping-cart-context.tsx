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
  variantId: string;
};

// Material store type definition
export type MaterialStore = {
  materialId: string;
  variantId: string;
};

// tạo return của hook
interface ShoppingContextType {
  cartQty: number;
  cartItem: CartItem[];
  addCartItem: (item: MaterialStore, quantity: number) => void;
  inscreateQty: (materialId: string, variantId: string | null) => void;
  decreateQty: (materialId: string, variantId: string | null) => void;
  removeCartItem: (materialId: string, variantId: string | null) => void;
  updateQuantity: (
    materialId: string,
    variantId: string | null,
    qty: number
  ) => void;
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

  const inscreateQty = (materialId: string, variantId: string | null) => {
    setCartItem((currentCart) =>
      currentCart.map((item) =>
        item.materialId === materialId &&
        (item.variantId === variantId || variantId === null)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreateQty = (materialId: string, variantId: string | null) => {
    setCartItem((currentCart) =>
      currentCart
        .map((item) =>
          item.materialId === materialId &&
          (item.variantId === variantId || variantId === null)
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (materialId: string, variantId: string | null) => {
    setCartItem((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.materialId === materialId &&
            (item.variantId === variantId || variantId === null)
          )
      )
    );
  };

  const updateQuantity = (
    materialId: string,
    variantId: string | null,
    qty: number
  ) => {
    // Ensure the quantity is valid and greater than or equal to 1

    setCartItem((currentCart) =>
      currentCart.map((item) =>
        // Check for both materialId and variantId (or handle null variantId)
        item.materialId === materialId &&
        (item.variantId === variantId || variantId === null)
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
