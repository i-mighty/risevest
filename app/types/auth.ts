export interface User {
  id: string
  created_at: Date
  first_name: string
  last_name: string
  email_address: string
  username: string | null
  phone_number: string | null
  date_of_birth: Date
}

export interface UserSession extends Omit<User, "created_at"> {
  total_balance: number
  total_returns: number
  token: string
}

export interface NewUser extends Omit<User, "id" | "created_at"> {
  password: string
}
