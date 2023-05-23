import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "react-query"

export function useRequestProcessor() {
  const queryClient = useQueryClient()
  function query(queryKey: string, queryFunction: any, options: UseQueryOptions) {
    return useQuery({
      queryKey,
      queryFn: queryFunction,
      ...options,
    })
  }

  function mutate(key: string, mutationFunction: any, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    })
  }

  return { query, mutate }
}
