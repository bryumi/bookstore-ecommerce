import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { IOrder } from "@/types/orders.interface";

export const useGetOrdersClient = (id: string) => {
  return useQuery({
    queryKey: ["get-orders-client", id],
    queryFn: async () => {
      const { data } = await api.get<IOrder[]>(`clients/${id}/orders`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
