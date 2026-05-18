"use client";

import { booksImage } from "@/data/mockProducts";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useStore } from "@/lib/store-context";
import { useGetOrdersClient } from "@/services/clients/getOrdersClient";
import { useRequestExchange } from "@/services/clients/requestExchange";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { string } from "yup";

export default function OrdersPage() {
  const { user } = useAuth();
  const { data } = useGetOrdersClient(user.id);
  const { books } = useStore();
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
    {},
  );

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: mutateRequestExchange } = useRequestExchange({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-orders-client", user.id],
      });
    },
    onError: (error) => {
      showSnackbar((error as any).response.data.error as string, "error");
    },
  });

  const toggleItemSelection = (orderId: string, itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[orderId] || [];

      const exists = current.includes(itemId);

      return {
        ...prev,
        [orderId]: exists
          ? current.filter((id) => id !== itemId)
          : [...current, itemId],
      };
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "inProcessing":
        return "bg-gold/20 text-gold border-gold";
      case "approved":
        return "bg-green-500/20 text-green-600 border-green-500";
      case "failed":
        return "bg-red-500/20 text-red-600 border-red-500";
      case "inTransportation":
        return "bg-blue-500/20 text-blue-500 border-blue-500";
      case "delivered":
        return "bg-sage/20 text-sage border-sage";
      case "InExchange":
        return "bg-white-500/20 text-white-600 border-white-500";
      case "exchangeApproved":
        return "bg-green-500/20 text-green-500 border-green-500";
      case "exchangeFailed":
        return "bg-red-500/20 text-red-500 border-red-500";
      case "exchanged":
        return "bg-sage/20 text-sage border-sage";
      default:
        return "bg-charcoal/20 text-charcoal border-charcoal";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "inProcessing":
        return "Em Processamento";
      case "approved":
        return "Aprovado";
      case "failed":
        return "Rejeitado";
      case "inTransportation":
        return "Em Trânsito";
      case "InExchange":
        return "Em Troca";
      case "exchangeApproved":
        return "Troca Aprovada";
      case "exchangeFailed":
        return "Troca Recusada";
      case "exchanged":
        return "Troca Concluida";
      case "delivered":
        return "Entregue";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (data?.length === 0) {
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
              Nenhum Pedido Ainda
            </h1>
            <p className="font-sans text-lg text-charcoal/60 mb-8">
              Seus pedidos aparecerão aqui após a finalização da compra
            </p>
            <Link href="/" className="btn-primary inline-block">
              Começar a Comprar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-2">
            Meus Pedidos
          </h1>
          <p className="font-sans text-charcoal/60">
            Acompanhe o status dos seus pedidos
          </p>
        </div>

        <div className="space-y-6">
          {data?.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-r from-burgundy to-burgundy/80 text-cream p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-sans text-sm text-cream/80 mb-1">
                      Pedido
                    </p>
                    <p className="font-display text-2xl font-bold">
                      {order.id}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <p className="font-sans text-sm text-cream/80">
                      {formatDate(order.orderDate)}
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xl font-sans font-medium border ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-charcoal/10"
                    >
                      {order.status === "delivered" && (
                        <input
                          type="checkbox"
                          checked={
                            selectedItems[order.id]?.includes(item.id) || false
                          }
                          onChange={() =>
                            toggleItemSelection(order.id, item.id)
                          }
                          className="mt-6 h-5 w-5"
                        />
                      )}

                      <img
                        src={booksImage[index]}
                        alt={item.id}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-display text-lg font-semibold text-charcoal">
                          {item?.book?.title}
                        </h3>
                        <p className="text-sm text-charcoal/60 font-sans italic mb-2">
                          por {item?.book?.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-charcoal/60 font-sans">
                            Quantidade: {item.quantity}
                          </p>
                          <p className="font-display text-lg font-semibold text-burgundy">
                            R${" "}
                            {Number(item.totalItemValue)
                              .toFixed(2)
                              .replace(".", ",")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xl font-semibold text-charcoal">
                      Total do Pedido
                    </span>
                    <span className="font-display text-2xl font-bold text-burgundy">
                      R$ {Number(order.totalPrice).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-charcoal/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "inProcessing" || order.status === "shipped" || order.status === "delivered" ? "bg-sage" : "bg-charcoal/20"}`}
                      >
                        <svg
                          className="w-5 h-5 text-cream"
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
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">
                        Em Processamento
                      </span>
                    </div>

                    <div
                      className={`flex-1 h-1 mx-2 ${order.status === "shipped" || order.status === "delivered" ? "bg-sage" : "bg-charcoal/20"}`}
                    ></div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "inTransportation" || order.status === "delivered" ? "bg-sage" : "bg-charcoal/20"}`}
                      >
                        <svg
                          className="w-5 h-5 text-cream"
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
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">
                        Em Trânsito
                      </span>
                    </div>

                    <div
                      className={`flex-1 h-1 mx-2 ${order.status === "delivered" ? "bg-sage" : "bg-charcoal/20"}`}
                    ></div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-sage" : "bg-charcoal/20"}`}
                      >
                        <svg
                          className="w-5 h-5 text-cream"
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
                      </div>
                      <span className="text-xs font-sans mt-2 text-charcoal/60">
                        Entregue
                      </span>
                    </div>
                  </div>
                </div>
                {order.status === "delivered" && (
                  <div className=" p-6 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <button
                        type="button"
                        className="btn-primary inline-block"
                        onClick={() => {
                          const selected = selectedItems[order.id] || [];

                          if (selected.length === 0) {
                            showSnackbar(
                              "Selecione ao menos um item para troca",
                              "error",
                            );
                            return;
                          }

                          mutateRequestExchange({
                            orderId: order.id,
                            orderItemIds: selected,
                          });
                        }}
                        data-cy={`request-exchange-${order.id}`}
                      >
                        Solicitar Troca
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="btn-secondary inline-block">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
