import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { UserData } from "@/types/mock.interface";

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useCreateClient = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["create-client"],
    mutationFn: async (form: UserData) => {
      await api.post(`clients`, {
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
          typeResidence: address.tipo,
          typeStreet: address.tipoLogradouro,
          cep: address.cep,
          street: address.rua,
          number: address.numero,
          obs: address.complemento,
          neighborhood: address.bairro,
          city: address.cidade,
          state: address.estado,
          country: address.pais,
        })),
        creditCard: form.cartoes.map((card) => ({
          cardNumber: card.numero,
          cardName: card.apelido,
          cardExpirationDate: card.validade,
          cardFlag: card.bandeira,
          securityCode: card.cvv,
        })),
      });
    },
    onSuccess,
    onError,
  });
};
