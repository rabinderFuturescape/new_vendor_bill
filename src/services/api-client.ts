
import axios, { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

const apiClient = axios.create({
  baseURL: '/api', // This will be configured based on your API Gateway
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ErrorResponse {
  message: string;
}

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;

