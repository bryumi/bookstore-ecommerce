import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { IClient } from "@/types/clients.interface";

type IResponseGetClient = {
  success: boolean;
  client: IClient;
};
export const useGetClientData = (id: string) => {
  return useQuery({
    queryKey: ["get-client-data"],
    queryFn: async () => {
      const { data } = await api.get<IResponseGetClient>(`clients/${id}`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
