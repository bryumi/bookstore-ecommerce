import { IAddress } from "./address.interface";
import { ICreditCard } from "./creditCard.interface";

export interface IClientsResponse {
  success: boolean;
  count: number;
  clients: IClient[];
}

export interface IClient {
  name: string;
  dateBirth: string;
  cpf: string;
  gender: "female" | "male" | "other";
  phoneDDD: string;
  phoneNumber: string;
  phoneType: string;
  email: string;
  addresses: IAddress[];
  creditCard: ICreditCard[];
  isActive: true;
  id: string;
  deletedAt: null;
  created_at: string;
  updated_at: string;
}
