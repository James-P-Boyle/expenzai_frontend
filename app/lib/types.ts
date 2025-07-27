import { LucideIcon } from "lucide-react";

declare global {
  interface Window {
      gtag: (
          command: 'config' | 'event' | 'consent',
          targetId: string,
          config?: {
              [key: string]: any
          }
      ) => void
      dataLayer: any[]
  }
}
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  transferred_receipts: number;
}

export interface AnonymousReceiptsResponse {
  data: Receipt[]
  remaining_uploads: number
  total_count: number
  session_id: string
}
export interface ReceiptItem {
  id: number;
  receipt_id: number;
  name: string;
  price: string;
  category: string;
  is_uncertain: boolean;
  formatted_price: string;
  created_at: string;
  updated_at: string;
}

export interface Receipt {
  id: number;
  user_id: number;
  image_path: string;
  total_amount: string | null;
  store_name: string | null;
  receipt_date: string | null;
  status: "processing" | "completed" | "failed";
  week_of: string | null;
  formatted_total: string;
  created_at: string;
  updated_at: string;
  items: ReceiptItem[];
}

export interface UploadResponse {
  id: number;
  status: string;
  message: string;
}

export interface WeeklySummary {
  week_start: string;
  total_amount: number;
  receipts_count: number;
  categories: CategorySummary[];
  receipts: Receipt[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export type ReceiptStatus = "processing" | "completed" | "failed";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export type ErrorHandler = (error: unknown, fallback?: string) => string;

export interface CategoryDetails {
  id: number;
  name: string;
  description?: string;
  total_spent: number;
  transaction_count: number;
  average_amount: number;
  recent_transactions?: ReceiptItem[];
  created_at: string;
  updated_at: string;
}

export interface MonthlySummary {
  month: string;
  year: number;
  total_amount: number;
  receipts_count: number;
  categories: CategorySummary[];
  daily_breakdown: {
    date: string;
    total: number;
    receipts_count: number;
  }[];
  top_categories: {
    category: string;
    total: number;
    percentage: number;
  }[];
}

export interface CategorySummary {
  category: string;
  count: number;
  total: number;
  avgPrice: number;
  lastPurchase?: string;
  uncertain_count?: number;
}

export interface CategoriesResponse {
  data: CategorySummary[];
}

export interface CategoryDetails {
  category: string;
  total_spent: number;
  item_count: number;
  receipt_count: number;
  avg_price: number;
  first_purchase: string;
  last_purchase: string;
  receipts: Receipt[];
  items: (ReceiptItem & { receipt: Receipt; store_name?: string })[];
  monthly_breakdown?: {
    month: string;
    total: number;
    count: number;
  }[];
}

export interface PresignedUrlResponse {
  presigned_url: string
  file_key: string
  expires_in: number
}

export interface MultiUploadResponse {
  message: string
  receipts: Array<{
    id: number
    status: string
    original_filename: string
  }>
  total_uploaded: number
}

export interface UploadFileData {
  file_key: string
  original_name: string
  file_size: number
}

// Subscriptions
export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  stripe_price_id_monthly: string;
  stripe_price_id_yearly: string;
  upload_limit: number; // -1 for unlimited
  is_popular?: boolean;
  coming_soon?: boolean;
}

export interface Subscription {
  id: string;
  user_id: number;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  billing_interval: 'monthly' | 'yearly';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  trial_end?: string;
  created_at: string;
  updated_at: string;
  plan: SubscriptionPlan;
}

export interface CreateSubscriptionResponse {
  subscription: Subscription;
  checkout_url?: string;
  client_secret?: string;
}

export interface BillingPortalResponse {
  url: string;
}

