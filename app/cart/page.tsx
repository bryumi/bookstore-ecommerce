"use client";

import { useStore } from "@/lib/store-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    createOrder,
    loggedUser,
  } = useStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <svg
              className="w-32 h-32 mx-auto text-charcoal/20 mb-8"
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
            <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
              Seu Carrinho Está Vazio
            </h1>
            <p className="font-sans text-lg text-charcoal/60 mb-8">
              Explore nossa coleção e encontre seu próximo livro favorito
            </p>
            <Link href="/" className="btn-primary inline-block">
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-charcoal mb-8 animate-slide-up">
          Carrinho de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-32 h-48 sm:h-auto flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-charcoal mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-charcoal/60 font-sans italic">
                          por {item.author}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-burgundy hover:text-burgundy/70 transition-colors p-2"
                        title="Remover"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-sans text-sm text-charcoal/60">
                          Quantidade:
                        </span>
                        <div className="flex items-center border border-charcoal/20 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-charcoal/5 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-sans font-medium border-x border-charcoal/20">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-charcoal/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-2xl font-bold text-burgundy">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-charcoal/50 font-sans">
                          R$ {item.price.toFixed(2)} cada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 animate-slide-in">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-sans">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-medium">
                    R$ {getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-charcoal/60">Frete</span>
                  <span className="font-medium text-sage">Grátis</span>
                </div>
                <div className="border-t border-charcoal/10 pt-3 mt-3">
                  <div className="flex justify-between font-display text-xl">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-burgundy">
                      R$ {getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <text className="font-semibold text-charcoal mr-4">
                  Cupom de troca (opcional)
                </text>
                <input
                  type="text"
                  placeholder="Digite seu cupom de troca"
                  className="border border-charcoal rounded-sm w-1/3 mb-2 mt-2 p-2"
                />
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mb-4"
              >
                Finalizar Compra
              </button>

              <Link href="/" className="block w-full btn-secondary text-center">
                Continuar Comprando
              </Link>

              {/* Info */}
              <div className="mt-6 p-4 bg-sage/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-sage flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-sans text-charcoal/70">
                    Frete grátis para todo o Brasil. Entrega em até 7 dias
                    úteis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
