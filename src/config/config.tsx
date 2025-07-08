// useFetchData.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export interface UseFetchDataOptions<T> {
  queryKey: string
  url: string
}

// Generic reusable hook
export function useFetchData<T = any>({
  queryKey,
  url,
}: UseFetchDataOptions<T>): UseQueryResult<T, AxiosError> {
  return useQuery<T, AxiosError>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get<T>(url)
      return response.data
    },
  })
}
