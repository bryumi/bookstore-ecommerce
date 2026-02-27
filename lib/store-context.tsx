"use client";

import { books } from "@/data/mockProducts";
import { Book, UserData } from "@/types/mock.interface";
import { emptyUser } from "@/utils/mask";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  use,
} from "react";

interface CartItem extends Book {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered";
}

interface StoreContextType {
  books: Book[];
  cart: CartItem[];
  orders: Order[];
  userData: UserData;
  loggedUser: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userData, setUserData] = useState<UserData>(emptyUser());
  const [loggedUser, setLoggedUser] = useState<UserData | null>(null);
  // Load cart and orders from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("bookstore-cart");
    const savedOrders = localStorage.getItem("bookstore-orders");
    const savedUser = localStorage.getItem("bookstore-user");

    if (savedUser) {
      setLoggedUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("bookstore-cart", JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("bookstore-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("bookstore-user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  const addToCart = (book: Book) => {
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

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
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

  const createOrder = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      status: "processing",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        cart,
        orders,
        userData,
        loggedUser,
        setUserData,
        setLoggedUser,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createOrder,
        getCartTotal,
        getCartCount,
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
