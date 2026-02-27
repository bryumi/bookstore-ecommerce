import * as yup from "yup";

// ─── Address ──────────────────────────────────────────────────────────────────

export const addressSchema = yup.object({
  id: yup.string().required(),

  apelido: yup.string().max(50, "Apelido deve ter no máximo 50 caracteres"),

  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-?\d{3}$/, "CEP inválido"),

  rua: yup
    .string()
    .required("Rua é obrigatória")
    .min(3, "Rua deve ter no mínimo 3 caracteres")
    .max(100, "Rua deve ter no máximo 100 caracteres"),

  numero: yup
    .string()
    .required("Número é obrigatório")
    .max(10, "Número deve ter no máximo 10 caracteres"),

  complemento: yup
    .string()
    .max(60, "Complemento deve ter no máximo 60 caracteres"),

  cidade: yup
    .string()
    .required("Cidade é obrigatória")
    .min(2, "Cidade deve ter no mínimo 2 caracteres")
    .max(80, "Cidade deve ter no máximo 80 caracteres"),

  estado: yup
    .string()
    .required("Estado é obrigatório")
    .matches(/^[A-Z]{2}$/, "Use a sigla do estado (ex: SP, RJ)"),

  pais: yup
    .string()
    .required("País é obrigatório")
    .max(60, "País deve ter no máximo 60 caracteres"),

  tipo: yup
    .string()
    .oneOf(["casa", "apartamento", "comercial", "outro"], "Tipo inválido")
    .required("Tipo é obrigatório"),

  isCobranca: yup.boolean().required(),
  isEntrega: yup.boolean().required(),
});

// ─── Card ─────────────────────────────────────────────────────────────────────

export const cardSchema = yup.object({
  id: yup.string().required(),

  numero: yup
    .string()
    .required("Número do cartão é obrigatório")
    .transform((v) => v.replace(/\s/g, ""))
    .matches(/^\d{13,19}$/, "Número do cartão inválido"),

  nomeImpresso: yup
    .string()
    .required("Nome impresso é obrigatório")
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(26, "Nome deve ter no máximo 26 caracteres")
    .matches(/^[A-Z\s]+$/, "Use apenas letras maiúsculas e espaços"),

  apelido: yup.string().max(30, "Apelido deve ter no máximo 30 caracteres"),

  cvv: yup
    .string()
    .required("CVV é obrigatório")
    .matches(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos"),

  validade: yup
    .string()
    .required("Validade é obrigatória")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use o formato MM/AA")
    .test("validade-futura", "Cartão expirado", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const expiry = new Date(2000 + year, month - 1, 1);
      return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
    }),

  isPreferencial: yup.boolean().required(),
});

// ─── Personal data (shared between register and profile) ──────────────────────

export const personalSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),

  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("E-mail inválido")
    .max(100, "E-mail deve ter no máximo 100 caracteres"),

  cpf: yup.string().required("CPF é obrigatório"),

  dataNascimento: yup
    .string()
    .required("Data de nascimento é obrigatória")
    .test("maior-de-idade", "É necessário ter ao menos 18 anos", (value) => {
      if (!value) return false;
      const birth = new Date(value);
      const today = new Date();
      const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today <
        new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
          ? 1
          : 0);
      return age >= 18;
    })
    .test("data-valida", "Data inválida", (value) => {
      if (!value) return false;
      const d = new Date(value);
      return !isNaN(d.getTime()) && d <= new Date();
    }),

  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone inválido (formato: (00) 00000-0000)",
    ),

  genero: yup
    .string()
    .oneOf(
      ["masculino", "feminino", "outro", "nao-informar"],
      "Selecione uma opção",
    )
    .required("Gênero é obrigatório"),
});

// ─── Password schemas ─────────────────────────────────────────────────────────

export const senhaSchema = yup.object({
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
    .matches(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
    .matches(/\d/, "Senha deve conter ao menos um número"),
});

export const senhaConfirmacaoSchema = senhaSchema.shape({
  confirmarSenha: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("senha")], "As senhas não coincidem"),
});

// ─── Register steps ───────────────────────────────────────────────────────────

export const registerPersonalSchema = personalSchema.concat(senhaSchema);

export const registerAddressesSchema = yup.object({
  enderecos: yup
    .array()
    .of(addressSchema)
    .min(1, "Cadastre ao menos um endereço")
    .required()
    .test(
      "tem-cobranca",
      "Ao menos um endereço deve ser marcado como cobrança",
      (list) => !!list?.some((a) => a.isCobranca),
    )
    .test(
      "tem-entrega",
      "Ao menos um endereço deve ser marcado como entrega",
      (list) => !!list?.some((a) => a.isEntrega),
    ),
});

export const registerCardsSchema = yup.object({
  cartoes: yup
    .array()
    .of(cardSchema)
    .min(1, "Cadastre ao menos um cartão")
    .required()
    .test(
      "tem-preferencial",
      "Marque ao menos um cartão como preferencial",
      (list) => !!list?.some((c) => c.isPreferencial),
    ),
});

// ─── Full register schema (all steps combined) ────────────────────────────────

export const registerSchema = registerPersonalSchema
  .concat(registerAddressesSchema)
  .concat(registerCardsSchema);

// ─── Login schema ─────────────────────────────────────────────────────────────

export const loginSchema = yup.object({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),

  senha: yup.string().required("Senha é obrigatória"),
});

// ─── Profile edit schemas (partial — only changed fields required) ─────────────

export const profilePersonalSchema = personalSchema.shape({
  senha: yup
    .string()
    .optional()
    .test(
      "senha-forte",
      "Senha deve ter no mínimo 8 caracteres, uma maiúscula, uma minúscula e um número",
      (value) => {
        if (!value || value.length === 0) return true; // optional on profile
        return (
          value.length >= 8 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value)
        );
      },
    ),
});

export const profileAddressesSchema = registerAddressesSchema;
export const profileCardsSchema = registerCardsSchema;

// ─── Schema map (useful for step-based validation) ────────────────────────────

export const registerStepSchemas = {
  personal: registerPersonalSchema,
  addresses: registerAddressesSchema,
  cards: registerCardsSchema,
  review: registerSchema,
} as const;

export type RegisterStep = keyof typeof registerStepSchemas;
