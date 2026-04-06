"use client";

import { useAuth } from "@/hooks/useAuth";
import { useGetBooksData } from "@/services/books/getBooksData";
import { useGetCoupons } from "@/services/clients/getCoupons";
import { IBook } from "@/types/books.interface";
import { ICoupon } from "@/types/coupons.interface";
import { UserData } from "@/types/mock.interface";
import { IOrder } from "@/types/orders.interface";
import { emptyUser } from "@/utils/mask";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem extends IBook {
  quantity: number;
}

interface StoreContextType {
  books: IBook[];
  cart: CartItem[];
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  addToCart: (book: IBook) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  userCoupons: ICoupon[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("bookstore-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [orders, setOrders] = useState<IOrder[]>();
  const [userData, setUserData] = useState<UserData>(emptyUser());
  const [books, setBooks] = useState<IBook[]>([]);
  const [userCoupons, setUserCoupons] = useState<ICoupon[]>([]);

  const { user } = useAuth();
  const { data: coupons } = useGetCoupons(user?.id ?? "");

  const { data } = useGetBooksData();

  useEffect(() => {
    if (data) {
      setBooks(data.books);
    }
  }, [data]);

  useEffect(() => {
    if (coupons) {
      setUserCoupons(coupons.cupons);
    }
  }, [coupons]);
  // Load cart and orders from localStorage
  // useEffect(() => {
  //   const savedCart = localStorage.getItem("bookstore-cart");
  //   const savedOrders = localStorage.getItem("bookstore-orders");
  //   const savedUser = localStorage.getItem("bookstore-user");

  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   }
  //   if (savedOrders) {
  //     setOrders(JSON.parse(savedOrders));
  //     console.log("Loaded orders from localStorage:", JSON.parse(savedOrders));
  //   }
  // }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("bookstore-cart", JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("bookstore-orders", JSON.stringify(orders));
  }, [orders]);

  // useEffect(() => {
  //   localStorage.setItem("bookstore-user", JSON.stringify(loggedUser));
  // }, [loggedUser]);

  const addToCart = (book: IBook) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // const createOrder = () => {
  //   if (cart.length === 0) return;

  //   const newOrder: Order = {
  //     id: `ORD-${Date.now()}`,
  //     date: new Date().toISOString(),
  //     items: [...cart],
  //     total: getCartTotal(),
  //     status: "processing",
  //   };

  //   setOrders((prevOrders) => [newOrder, ...prevOrders]);
  //   clearCart();
  // };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        cart,
        userData,
        setUserData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        couponCode,
        setCouponCode,
        userCoupons,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
