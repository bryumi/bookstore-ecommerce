import { Address, Card, UserData } from "@/types/mock.interface";

export const generateId = () => Math.random().toString(36).substring(2, 9);

export const emptyAddress = (): Address => ({
  id: generateId(),
  apelido: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  cidade: "",
  estado: "",
  pais: "Brasil",
  tipo: "casa",
  isCobranca: false,
  isEntrega: false,
});

export const emptyCard = (): Card => ({
  id: generateId(),
  numero: "",
  nomeImpresso: "",
  apelido: "",
  cvv: "",
  validade: "",
  isPreferencial: false,
});

export const emptyUser = (): UserData => ({
  nome: "",
  email: "",
  senha: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  genero: "",
  enderecos: [emptyAddress()],
  cartoes: [emptyCard()],
});
export const maskCPF = (value: string) => {
  if (!value) return "";

  const onlyDigits = value.replace(/\D/g, "").substring(0, 11);

  return onlyDigits
    ?.replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3}).(\d{3})(\d)/, "$1.$2.$3")
    .replace(/.(\d{3})(\d)/, ".$1-$2");
};
export const formatCPF = (v: string) =>
  v
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3-$4")
    .substring(0, 14);

export const formatPhone = (v: string) =>
  v
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    .substring(0, 15);

export const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .substring(0, 19);

export const formatValidade = (v: string) =>
  v
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{2})/, "$1/$2")
    .substring(0, 5);
export const maskCardNumber = (num: string) => {
  const clean = num.replace(/\s/g, "");
  if (clean.length < 4) return num;
  return "•••• •••• •••• " + clean.slice(-4);
};
export const maskCard = (num: string) => {
  const clean = num.replace(/\s/g, "");
  return clean.length >= 4 ? "•••• " + clean.slice(-4) : num;
};

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const parseValue = (v: string) => parseFloat(v.replace(",", ".")) || 0;
