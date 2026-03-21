import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { UserData } from "@/types/mock.interface";

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useUpdateClient = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["update-client"],
    mutationFn: async ({ form, id }: { form: UserData; id: string }) => {
      await api.put(`clients/${id}`, {
        name: form.nome,
        dateBirth: form.dataNascimento,
        cpf: form.cpf,
        gender: form.genero,
        phoneDDD: form.telefone.slice(1, 3),
        phoneNumber: form.telefone,
        phoneType: form.tipoTelefone,
        email: form.email,
        password: form.senha,
        confirmPassword: form.confirmarSenha,
        addresses: form.enderecos.map((address) => ({
          id: address.idApi,
          typeResidence: address.tipo,
          addressNickname: address.apelido,
          typeStreet: address.tipoLogradouro,
          cep: address.cep,
          street: address.rua,
          number: address.numero,
          obs: address.complemento,
          neighborhood: address.bairro,
          city: address.cidade,
          state: address.estado,
          country: address.pais,
          isDeliveryAddress: address.isEntrega,
          isBillingAddress: address.isCobranca,
        })),
        creditCard: form.cartoes.map((card) => ({
          id: card.idApi,
          cardNumber: card.numero,
          cardName: card.apelido,
          cardExpirationDate: card.validade,
          cardHolderName: card.nomeImpresso,
          cardFlag: card.bandeira,
          securityCode: card.cvv,
          isMainCard: card.isPreferencial,
        })),
      });
    },
    onSuccess,
    onError,
  });
};
