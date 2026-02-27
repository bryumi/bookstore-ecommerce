'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface CartItem extends Book {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
}

interface StoreContextType {
  books: Book[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bookstore-cart');
    const savedOrders = localStorage.getItem('bookstore-orders');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('bookstore-cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('bookstore-orders', JSON.stringify(orders));
  }, [orders]);

  const books: Book[] = [
    {
      id: 1,
      title: "A Sombra do Vento",
      author: "Carlos Ruiz Zafón",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      category: "Ficção",
      description: "Um romance literário ambientado na Barcelona pós-guerra.",
      rating: 4.7
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: 38.50,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      category: "Distopia",
      description: "Uma distopia clássica sobre totalitarismo e vigilância.",
      rating: 4.9
    },
    {
      id: 3,
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      category: "Infantil",
      description: "Uma fábula poética sobre amor, amizade e perda.",
      rating: 4.8
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 54.90,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      category: "Não-ficção",
      description: "Uma breve história da humanidade desde a pré-história.",
      rating: 4.6
    },
    {
      id: 5,
      title: "O Código Da Vinci",
      author: "Dan Brown",
      price: 42.90,
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
      category: "Thriller",
      description: "Um thriller repleto de mistérios e conspirações.",
      rating: 4.3
    },
    {
      id: 6,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      price: 39.90,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
      category: "Fantasia",
      description: "O primeiro livro da saga mágica mais famosa do mundo.",
      rating: 4.9
    },
    {
      id: 7,
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
      category: "Fantasia",
      description: "A épica trilogia da Terra Média em volume único.",
      rating: 4.9
    },
    {
      id: 8,
      title: "A Menina que Roubava Livros",
      author: "Markus Zusak",
      price: 44.90,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      category: "Ficção Histórica",
      description: "Uma história comovente narrada pela Morte durante a Segunda Guerra.",
      rating: 4.7
    },
    {
      id: 9,
      title: "O Hobbit",
      author: "J.R.R. Tolkien",
      price: 42.90,
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
      category: "Fantasia",
      description: "A aventura de Bilbo Bolseiro pela Terra Média.",
      rating: 4.8
    },
    {
      id: 10,
      title: "Orgulho e Preconceito",
      author: "Jane Austen",
      price: 35.90,
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
      category: "Romance",
      description: "Um clássico da literatura inglesa sobre amor e sociedade.",
      rating: 4.6
    },
    {
      id: 11,
      title: "Crime e Castigo",
      author: "Fiódor Dostoiévski",
      price: 49.90,
      image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop",
      category: "Clássico",
      description: "Um romance psicológico profundo sobre culpa e redenção.",
      rating: 4.8
    },
    {
      id: 12,
      title: "Cem Anos de Solidão",
      author: "Gabriel García Márquez",
      price: 52.90,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      category: "Realismo Mágico",
      description: "A saga da família Buendía em Macondo.",
      rating: 4.7
    }
  ];

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
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
      status: 'processing'
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
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
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
