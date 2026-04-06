import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { IBook } from "@/types/books.interface";

type IResponseGetBooks = {
  success: boolean;
  count: number;
  books: IBook[];
};
export const useGetBooksData = () => {
  return useQuery({
    queryKey: ["get-books-data"],
    queryFn: async () => {
      const { data } = await api.get<IResponseGetBooks>(`books`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
