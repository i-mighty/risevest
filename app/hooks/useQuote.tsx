import { GetQuote } from "app/services/api/requests"
import { useQuery } from "react-query"

export const useQuote = () => {
  return useQuery({
    queryKey: "getQuotes",
    queryFn: GetQuote,
    enabled: true,
  })
}
