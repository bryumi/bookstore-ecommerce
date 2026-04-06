import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useRequestExchange = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["request-exchange-order"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/requestExchange`);
    },
    onSuccess,
    onError,
  });
};
