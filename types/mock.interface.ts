export interface Address {
  id: string;
  apelido: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  pais: string;
  tipo: "casa" | "apartamento" | "comercial" | "outro";
  isCobranca: boolean;
  isEntrega: boolean;
}
export interface LoginData {
  email: string;
  senha: string;
}
export interface Card {
  id: string;
  numero: string;
  nomeImpresso: string;
  apelido: string;
  cvv: string;
  validade: string;
  isPreferencial: boolean;
}

export interface UserData {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  genero: "masculino" | "feminino" | "outro" | "nao-informar" | "";
  enderecos: Address[];
  cartoes: Card[];
}
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}
