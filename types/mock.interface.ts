export interface Address {
  id: string;
  idApi: string;
  apelido: string;
  bairro: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  pais: string;
  tipoLogradouro: string;
  tipo: string;
  isCobranca: boolean;
  isEntrega: boolean;
}
export interface LoginData {
  email: string;
  senha: string;
}
export interface Card {
  id: string;
  idApi: string;
  numero: string;
  nomeImpresso: string;
  apelido: string;
  cvv: string;
  validade: string;
  isPreferencial: boolean;
  bandeira: string;
}

export interface UserData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  dataNascimento: string;
  tipoTelefone: string;
  telefone: string;
  genero: string;
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
