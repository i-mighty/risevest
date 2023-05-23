import { CreatePlan, CreatePlanRequestBody, GetQuote } from "app/services/api/requests"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth } from "./useAuth"

export const useCreatePlan = () => {
  const { user } = useAuth()
  const mutation = useMutation({
    mutationKey: "createPlan",
    mutationFn: (data: CreatePlanRequestBody) => {
      return CreatePlan(data, user.token)
    },

    //refetch plans again
    // onSettled: () => queryClient.invalidateQueries("createPlan"),
  })

  return mutation
}
