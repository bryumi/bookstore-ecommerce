import { IBook } from "./books.interface";

export interface IOrderItens {
  book: IBook;
  quantity: number;
  unitaryValue: string;
  totalItemValue: string;
  id: string;
}
export interface IPayment {
  paymentMethod: string;
  paymentValue: string;
  paymentStatus: string;
  id: string;
}

export interface IOrder {
  orderItems: IOrderItens[];
  payment: IPayment[];
  orderDate: string;
  totalPrice: string;
  freightValue: string;
  status: string;
  id: string;
}
