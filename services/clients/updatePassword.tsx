import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { UserData } from "@/types/mock.interface";
import { IChangePassword } from "@/validations/ChangePasswordSchema";

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useChangePassword = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["change-password-client"],
    mutationFn: async ({ form, id }: { form: IChangePassword; id: string }) => {
      await api.patch(`clients/${id}/changePassword`, {
        currentPassword: form.oldPassword,
        newPassword: form.password,
        confirmPassword: form.confirmPassword,
      });
    },
    onSuccess,
    onError,
  });
};
