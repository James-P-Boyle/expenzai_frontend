import { LucideIcon } from "lucide-react"

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ReceiptItem {
  id: number
  receipt_id: number
  name: string
  price: string
  category: string
  is_uncertain: boolean
  formatted_price: string
  created_at: string
  updated_at: string
}

export interface Receipt {
  id: number
  user_id: number
  image_path: string
  total_amount: string | null
  store_name: string | null
  receipt_date: string | null
  status: "processing" | "completed" | "failed"
  week_of: string | null
  formatted_total: string
  created_at: string
  updated_at: string
  items: ReceiptItem[]
}

export interface UploadResponse {
  id: number
  status: string
  message: string
}

export interface CategorySummary {
  category: string
  total: number
  count: number
  uncertain_count: number
}

export interface WeeklySummary {
  week_start: string
  total_amount: number
  receipts_count: number
  categories: CategorySummary[]
  receipts: Receipt[]
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

export type ReceiptStatus = "processing" | "completed" | "failed"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
}
