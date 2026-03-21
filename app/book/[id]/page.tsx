"use client";

import { useStore } from "@/lib/store-context";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { books, addToCart, cart } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const book = books.find((b) => b.id === Number(params.id));
  const inCart = cart.some((item) => item.id === book?.id);
  const related = books
    .filter((b) => b.category === book?.category && b.id !== book?.id)
    .slice(0, 3);


  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleAddToCart = () => {
    if (!book) return;
    addToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
            Erro 404
          </p>
          <h1 className="font-display text-4xl text-charcoal font-semibold mb-4">
            Obra não encontrada
          </h1>
          <div className="w-8 h-px bg-gold/40 mx-auto mb-8" />
          <Link
            href="/"
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal border border-charcoal/20 px-6 py-3 hover:bg-charcoal hover:text-cream transition-all duration-300"
          >
            ← Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(book.rating);
    const half = !filled && i < book.rating;
    return { filled, half };
  });

  return (
    <div className="min-h-screen bg-cream">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/35">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Catálogo
          </Link>
          <span className="text-charcoal/20">›</span>
          <span className="text-charcoal/50">{book.category}</span>
          <span className="text-charcoal/20">›</span>
          <span className="text-charcoal/70 truncate max-w-[180px]">
            {book.title}
          </span>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Cover column */}
          <div
            className="lg:col-span-4 xl:col-span-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="relative mx-auto max-w-[280px] lg:max-w-none">
              {/* Shadow pages behind */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-charcoal/10" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-charcoal/6" />


              <div className="relative overflow-hidden shadow-2xl">
                <div
                  className={`bg-charcoal/8 transition-opacity duration-500 ${imageLoaded ? "opacity-0" : "opacity-100"} absolute inset-0`}
                />
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-charcoal/20 to-transparent pointer-events-none" />
              </div>


              <div className="absolute -top-3 -right-3 bg-burgundy text-cream font-sans text-[9px] uppercase tracking-[0.2em] px-3 py-1.5">
                {book.category}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-0.5">
                {stars.map((s, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${s.filled ? "text-gold fill-current" : "text-charcoal/15 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="font-display text-lg font-semibold text-charcoal">
                {book.rating}
              </span>
              <span className="font-body text-xs italic text-charcoal/35">
                /5
              </span>
            </div>
          </div>

          <div
            className="lg:col-span-8 xl:col-span-9"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >

            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
              {book.category}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl text-charcoal font-semibold leading-[1.1] mb-3">
              {book.title}
            </h1>


            <p className="font-body text-lg italic text-charcoal/50 mb-6">
              por{" "}
              <span className="text-charcoal/70 font-semibold not-italic">
                {book.author}
              </span>
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-charcoal/8" />
              <span className="text-gold/40 text-xs">✦</span>
              <div className="h-px flex-1 bg-charcoal/8" />
            </div>


            <p className="font-body text-base text-charcoal/65 leading-relaxed mb-8 max-w-2xl">
              {book.description}
            </p>


            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: "Categoria", value: book.category },
                { label: "Avaliação", value: `${book.rating} / 5,0` },
                { label: "Disponibilidade", value: "Em estoque" },
              ].map(({ label, value }) => (
                <div key={label} className="border-l-2 border-gold/30 pl-3">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/35 mb-0.5">
                    {label}
                  </p>
                  <p className="font-body text-sm text-charcoal font-medium">
                    {value}
                  </p>
                </div>
              ))}
            </div>


            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/35 mb-1">
                  Preço
                </p>
                <p className="font-display text-4xl font-bold text-charcoal">
                  R$ {book.price.toFixed(2).replace(".", ",")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:ml-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300
                    ${
                      isAdded
                        ? "bg-sage text-white cursor-default"
                        : inCart
                          ? "bg-charcoal/8 text-charcoal border border-charcoal/20 hover:bg-charcoal hover:text-cream"
                          : "bg-burgundy text-cream hover:bg-charcoal"
                    }`}
                >
                  {isAdded ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Adicionado!
                    </>
                  ) : inCart ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Adicionar outro
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Adicionar ao carrinho
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] px-6 py-4 border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                >
                  Ver carrinho
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2.5 mt-6 pt-6 border-t border-charcoal/8">
              <svg
                className="w-4 h-4 text-sage flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span className="font-body text-xs text-charcoal/45 italic">
                Frete grátis para todo o Brasil · Entrega em até 7 dias úteis
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y border-charcoal/8 bg-charcoal/2 py-10 my-4"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-gold/20 font-display text-[80px] leading-none select-none -mt-4">
              "
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl text-charcoal/60 italic leading-relaxed max-w-3xl">
                {book.description}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mt-3">
                — {book.author}
              </p>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.5s",
          }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gold/50 text-xs">✦</span>
            <h2 className="font-display text-2xl text-charcoal font-semibold">
              Obras relacionadas
            </h2>
            <div className="flex-1 h-px bg-charcoal/8" />
            <Link
              href="/"
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/35 hover:text-charcoal transition-colors"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rel, i) => (
              <Link
                key={rel.id}
                href={`/book/${rel.id}`}
                className="group flex gap-4 border border-charcoal/8 bg-white p-4 hover:border-charcoal/20 hover:shadow-md transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease ${0.6 + i * 0.1}s, transform 0.6s ease ${0.6 + i * 0.1}s, box-shadow 0.2s ease, border-color 0.2s ease`,
                }}
              >
                <div className="w-16 flex-shrink-0 overflow-hidden shadow-sm relative">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-charcoal/15 to-transparent pointer-events-none" />
                </div>

                <div className="flex-1 min-w-0 py-0.5">
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold mb-1">
                    {rel.category}
                  </p>
                  <p className="font-display text-sm font-semibold text-charcoal group-hover:text-burgundy transition-colors line-clamp-2 leading-snug mb-1">
                    {rel.title}
                  </p>
                  <p className="font-body text-xs italic text-charcoal/40 mb-2 truncate">
                    {rel.author}
                  </p>
                  <p className="font-display text-base font-bold text-charcoal">
                    R$ {rel.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-charcoal/8" />
          <button
            onClick={() => router.back()}
            className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/35 hover:text-charcoal transition-colors flex items-center gap-2"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar ao catálogo
          </button>
          <div className="flex-1 h-px bg-charcoal/8" />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </div>
  );
}
