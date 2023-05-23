import { NewUser } from "app/types/auth"
import axios from "axios"
export const request = axios.create({
  baseURL: "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const requestWithAuth = (token: string) => {
  return axios.create({
    baseURL: "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

//Request types
type SignUpRequestBody = NewUser & { password: string }

//Response types
type SignUpResponseBody = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email_address: string
  username: {}
  phone_number: {}
  date_of_birth: string
}
type SignUpSignUpConflictResponseBody = { message: string }

export const SignUp = (data: SignUpRequestBody) => request.post<SignUpResponseBody>("/users", data)

//Request types
type SignInRequestBody = { email_address: string; password: string }

//Response types
type SignInResponseBody = {
  id: string
  email_address: string
  first_name: string
  last_name: string
  username: {}
  total_balance: number
  total_returns: number
  token: string
}
type SignInSignInWrongCredentialsResponseBody = { message: string }

export const SignIn = (data: SignInRequestBody) =>
  request.post<SignInResponseBody>("/sessions", data)

//Response types
type GetSessionResponseBody = {
  id: string
  email_address: string
  first_name: string
  last_name: string
  username: {}
  iat: number
  exp: number
  total_balance: number
  total_returns: number
}

export const GetSession = () => request.get<GetSessionResponseBody>("/sessions")

//Response types
export type CreatePlanResponseBody = {
  id: string
  created_at: string
  plan_name: string
  invested_amount: number
  total_returns: number
  target_amount: number
  maturity_date: string
  user_id: string
  returns: any[]
}

export type CreatePlanRequestBody = {
  plan_name: string
  target_amount: number
  maturity_date: string
}

export const CreatePlan = async (data: CreatePlanRequestBody, token?: string) => {
  try {
    const req = token ? requestWithAuth(token) : request
    const res = await req.post("/plans", JSON.stringify(data))
    return res.data as CreatePlanResponseBody
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

//Response types
type GetPlansResponseBody = {
  item_count: number
  items: {
    id: string
    created_at: string
    plan_name: string
    invested_amount: number
    total_returns: number
    target_amount: number
    maturity_date: string
    user_id: string
  }[]
}

export const GetPlans = () => request.get<GetPlansResponseBody>("/plans")

//Response types
type GetPlanProjectionGetPlansResponseBody = {
  item_count: number
  items: {
    id: string
    created_at: string
    plan_name: string
    invested_amount: number
    total_returns: number
    target_amount: number
    maturity_date: string
    user_id: string
  }[]
}

export const GetPlanProjection = (monthly_investment: number, target_amount: number) =>
  request.get<GetPlanProjectionGetPlansResponseBody>(
    `/plans/projection?monthly_investment=${monthly_investment}&target_amount=${target_amount}`,
  )

//Response types
type GetPlanResponseBody = {
  id: string
  created_at: string
  plan_name: string
  invested_amount: number
  total_returns: number
  target_amount: number
  maturity_date: string
  user_id: string
  returns: { id: string; created_at: string; amount: number; plan_id: string }[]
}

export const GetPlan = () => request.get<GetPlanResponseBody>("/plans/:id")

export const GetBanks = () => request.get("/banks")

//Response types
type GetRatesResponseBody = { buy_rate: number; sell_rate: number }

export const GetRates = () => request.get<GetRatesResponseBody>("/rates")

//Response types
type GetQuoteResponseBody = { quote: string; author: string }

export const GetQuote = async () => {
  const res = await request.get<GetQuoteResponseBody>("/quotes")
  return res.data
}
