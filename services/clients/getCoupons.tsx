import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { ICoupon } from "@/types/coupons.interface";

type ResponseCoupons = {
  success: boolean;
  cupons: ICoupon[];
};
export const useGetCoupons = (id: string) => {
  return useQuery({
    queryKey: ["get-coupons", id],
    queryFn: async () => {
      const { data } = await api.get<ResponseCoupons>(`clients/${id}/cupons`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
