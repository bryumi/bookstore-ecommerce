import { Address, Card, UserData } from "@/types/mock.interface";

export function mapClientToUserData(apiClient: any): UserData {
  return {
    nome: apiClient.name,
    email: apiClient.email,
    senha: "123456Aa*",
    confirmarSenha: "123456Aa*",
    cpf: apiClient.cpf,
    dataNascimento: apiClient.dateBirth,
    tipoTelefone: apiClient.phoneType,
    telefone: apiClient.phoneNumber,
    genero: apiClient.gender,

    enderecos: (apiClient.addresses || []).map(mapAddress),
    cartoes: (apiClient.creditCard || []).map(mapCard),
  };
}

function mapAddress(address: any): Address {
  return {
    id: address.id,
    idApi: address.id,
    apelido: address.addressNickname,
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
    isCobranca: address.isBillingAddress,
    isEntrega: address.isDeliveryAddress,
  };
}


function mapCard(card: any): Card {
  return {
    id: card.id,
    idApi: card.id,
    numero: card.cardNumber,
    nomeImpresso: card.cardHolderName,
    apelido: card.cardName,
    cvv: card.securityCode,
    validade: card.cardExpirationDate,
    isPreferencial: card.isMainCard,
    bandeira: card.cardFlag,
  };
}
