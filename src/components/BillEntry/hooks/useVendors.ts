
import { useQuery } from "@tanstack/react-query";
import { vendorsApi } from "@/services/vendors";
import { ApiError } from "@/types/api";
import { Vendor } from "../types/vendor";

export const useVendors = () => {
  return useQuery<Vendor[], ApiError>({
    queryKey: ['vendors'],
    queryFn: vendorsApi.getAll,
  });
};
