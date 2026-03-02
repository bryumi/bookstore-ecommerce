"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { useState } from "react";

export default function Header() {
  const { getCartCount, loggedUser } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-cream font-display font-bold text-xl">
                L
              </span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-charcoal group-hover:text-burgundy transition-colors">
                Booklovers
              </h1>
              <p className="text-xs text-charcoal/60 font-sans">
                Sua biblioteca pessoal
              </p>
            </div>
          </Link>


          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors relative group"
            >
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/cart"
              className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors relative group"
            >
              Carrinho
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-gold text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300"></span>
            </Link>

            {loggedUser && (
              <Link
                href="/orders"
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors relative group"
              >
                Pedidos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>
          {loggedUser && (
            <Link
              href="/profile"
              className="hidden md:flex items-center space-x-2 btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 21a6 6 0 0 0-12 0" />
                <circle cx="12" cy="11" r="4" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
              </svg>
            </Link>
          )}

          {!loggedUser && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span>|</span>
              <Link
                href="/register"
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors relative group"
              >
                Cadastre-se
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          )}
          <Link
            href="/cart"
            className="hidden md:flex items-center space-x-2 btn-primary"
          >
            <svg
              className="w-5 h-5"
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
            <span>{cartCount}</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-burgundy/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-charcoal/10 animate-slide-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors py-2"
              >
                Catálogo
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors py-2 flex items-center justify-between"
              >
                <span>Carrinho</span>
                {cartCount > 0 && (
                  <span className="bg-gold text-charcoal text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-medium text-charcoal hover:text-burgundy transition-colors py-2"
              >
                Pedidos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
