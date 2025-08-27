import { apiErrorHandler } from '@/lib/api-error-handler';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: apiErrorHandler,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
