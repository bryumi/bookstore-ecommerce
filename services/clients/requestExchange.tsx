import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface RequestExchangeDTO {
  orderId: string;
  orderItemIds: string[];
}

export const useRequestExchange = ({
  onSuccess,
  onError,
}: Props) => {
  return useMutation({
    mutationKey: ["request-exchange-order"],

    mutationFn: async ({
      orderId,
      orderItemIds,
    }: RequestExchangeDTO) => {
      await api.patch(
        `/orders/${orderId}/requestExchange`,
        {
          orderItemIds,
        },
      );
    },

    onSuccess,
    onError,
  });
};