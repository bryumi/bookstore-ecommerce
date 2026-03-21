import * as yup from "yup";

export type IChangePassword = yup.InferType<typeof ChangePasswordSchema>;
export const ChangePasswordSchema = yup.object({
  oldPassword: yup.string().required("Senha atual é obrigatória"),

  password: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .matches(
      /[^A-Za-z0-9]/,
      "A senha deve conter ao menos um caractere especial",
    )
    .test(
      "password-different",
      "A nova senha deve ser diferente da senha atual",
      function (value) {
        const { oldPassword } = this.parent;
        if (!value || !oldPassword) return true; // evita erro quando ainda não preenchido
        return value !== oldPassword;
      },
    ),

  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});
