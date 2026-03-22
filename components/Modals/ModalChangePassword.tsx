import ModalInput from "./ModalInput";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  IChangePassword,
} from "@/validations/ChangePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword } from "@/services/clients/updatePassword";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useAuth } from "@/hooks/useAuth";

const ModalChangePassword = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IChangePassword>({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { mutate: mutateChangePassword } = useChangePassword({
    onSuccess: () => {
      showSnackbar("Senha alterada com sucesso!", "success");
      onClose();
    },
    onError(error) {
      console.log(error.response.data.error);
      showSnackbar(error.response.data.error, "error");
    },
  });
  const onSubmit = (data: IChangePassword) => {
    mutateChangePassword({ form: data, id: user.id });
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Alterar senha"
      subtitle="Altere sua senha de acesso."
    >
      <div className="items-center-column space-y-4">
        <ModalInput
          label="Senha atual"
          placeholder="Insira a senha atual"
          type="password"
          required
          error={errors.oldPassword?.message}
          onChange={(v) => setValue("oldPassword", v, { shouldValidate: true })}
        />
        <ModalInput
          label="Nova senha"
          type="password"
          placeholder="Insira a nova senha"
          required
          onChange={(v) => setValue("password", v, { shouldValidate: true })}
          error={errors.password?.message}
        />

        <ModalInput
          label="Confirmar senha"
          type="password"
          placeholder="Confirme a nova senha"
          onChange={(v) =>
            setValue("confirmPassword", v, { shouldValidate: true })
          }
          required
          error={errors.confirmPassword?.message}
        />

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-charcoal/6 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-charcoal/18 text-charcoal font-sans text-[11px] uppercase tracking-[0.18em] py-3 hover:border-charcoal/35 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="flex-1 bg-charcoal text-cream font-sans text-[11px] uppercase tracking-[0.18em] py-3 hover:bg-burgundy transition-colors duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangePassword;
