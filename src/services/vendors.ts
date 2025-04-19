
import { Vendor } from '@/components/BillEntry/types/vendor';
import { ApiResponse } from '@/types/api';
import apiClient from './api-client';

export const vendorsApi = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Vendor[]>>('/vendors');
    return response.data.data;
  },

  create: async (vendor: Omit<Vendor, 'value'>) => {
    const response = await apiClient.post<ApiResponse<Vendor>>('/vendors', vendor);
    return response.data.data;
  },

  update: async (id: string, vendor: Partial<Vendor>) => {
    const response = await apiClient.put<ApiResponse<Vendor>>(`/vendors/${id}`, vendor);
    return response.data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/vendors/${id}`);
  },
};
