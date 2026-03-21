import { Address, Card, UserData } from "@/types/mock.interface";

export function mapClientToUserData(apiClient: any): UserData {
  return {
    nome: apiClient.name,
    email: apiClient.email,
    senha: "", // nunca traga senha do backend
    confirmarSenha: "",
    cpf: apiClient.cpf,
    dataNascimento: apiClient.dateBirth,
    tipoTelefone: apiClient.phoneType,
    telefone: apiClient.phoneNumber,
    genero: apiClient.gender,

    enderecos: (apiClient.addresses || []).map(mapAddress),
    cartoes: (apiClient.creditCard || []).map(mapCard),
  };
}

// mapper de endereço
function mapAddress(address: any): Address {
  return {
    id: address.id,
    apelido: "", // não vem da API
    bairro: address.neighborhood,
    cep: address.cep,
    rua: address.street,
    numero: address.number,
    complemento: address.obs,
    cidade: address.city,
    estado: address.state,
    pais: address.country,
    tipoLogradouro: address.typeStreet,
    tipo: address.typeResidence,
    isCobranca: false, // default
    isEntrega: true, // default
  };
}

// mapper de cartão
function mapCard(card: any): Card {
  return {
    id: card.id,
    numero: card.cardNumber,
    nomeImpresso: card.cardName,
    apelido: "", // não vem da API
    cvv: card.securityCode,
    validade: card.cardExpirationDate,
    isPreferencial: false, // default
    bandeira: card.cardFlag,
  };
}
