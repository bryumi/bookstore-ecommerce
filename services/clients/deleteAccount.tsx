import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useDeleteAccount = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async (id: string) => {
      await api.delete(`clients/${id}`);
    },
    onSuccess,
    onError,
  });
};
