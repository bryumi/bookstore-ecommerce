"use client";

import { useStore } from "@/lib/store-context";
import Link from "next/link";
import { useState } from "react";

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

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(book);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Link href={`/book/${book.id}`} className="block group">
      <div className="group bg-white rounded-lg shadow-md overflow-hidden card-hover border border-charcoal/5">
        {/* Book Cover */}
        <div className="relative h-80 overflow-hidden bg-charcoal/5">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-burgundy/90 backdrop-blur-sm text-cream px-3 py-1 rounded-full text-xs font-sans font-medium">
            {book.category}
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-cream/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-xs font-sans font-semibold text-charcoal">
              {book.rating}
            </span>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg text-charcoal mb-1 line-clamp-2 group-hover:text-burgundy transition-colors">
            {book.title}
          </h3>

          <p className="text-sm text-charcoal/60 font-sans mb-3 italic">
            por {book.author}
          </p>

          <p className="text-sm text-charcoal/70 font-sans line-clamp-2 mb-4">
            {book.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-burgundy">
                R$ {book.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-sm font-sans font-medium transition-all duration-300 ${
                isAdded
                  ? "bg-sage text-cream"
                  : "bg-burgundy text-cream hover:bg-opacity-90 hover:shadow-lg"
              }`}
            >
              {isAdded ? (
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Adicionado</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Adicionar</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
