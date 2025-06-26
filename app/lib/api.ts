import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Receipt,
  UploadResponse,
  WeeklySummary,
  ReceiptItem,
  ApiError,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

class ApiClient {

    private getAuthHeaders(token?: string) {

        const headers: Record<string, string> = {
            'Accept': 'application/json'
        }

        const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null)

        if(authToken) {
            headers['Authorization'] = `Bearer ${authToken}`
        }

        return headers
    }

    private async handleResponse<T>(response: Response): Promise<T> {

        if(!response.ok) {
            const error: ApiError = await response.json().catch(() => ({
                message: 'An error occurred'
            }))
            throw new Error(error.message)
        }

        return response.json()
    }

    // Authentication
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {

        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials)
        })

        return this.handleResponse<AuthResponse>(response)
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
    
        return this.handleResponse<AuthResponse>(response)
    }

    async logout(token?: string): Promise<{ message: string }> {

        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: this.getAuthHeaders(token),
        })

        return this.handleResponse<{ message: string }>(response)
    }
    
    // Receipts
    async uploadReceipt(imageFile: File, token?: string): Promise<UploadResponse> {

        const formData = new FormData()
        formData.append('image', imageFile)

        const response = await fetch(`${API_BASE_URL}/receipts`, {
            method: 'POST',
            headers: this.getAuthHeaders(token),
            body: formData
        })

        return this.handleResponse<UploadResponse>(response)
    }

    async getReceipts(token?: string): Promise<{data: Receipt[]}> {

        const response = await fetch(`${API_BASE_URL}/receipts`, {
            method: 'GET',
            headers: this.getAuthHeaders(token),
        })
      
        return this.handleResponse<{ data: Receipt[] }>(response)
    }

    async getReceipt(id: number, token?: string): Promise<Receipt> {

        const response = await fetch(`${API_BASE_URL}/receipts/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders(token),
        })

        return this.handleResponse<Receipt>(response)
    }

    async deleteReceipt(id: number, token?: string): Promise<{ message: string }> {

        const response = await fetch(`${API_BASE_URL}/receipts/${id}`, {
          method: 'DELETE',
          headers: this.getAuthHeaders(token),
        })
    
        return this.handleResponse<{ message: string }>(response)
    }

    async updateItem(
        id: number, 
        data: { category: string; is_uncertain: boolean }, 
        token?: string
    ): Promise<ReceiptItem> {

        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
          method: 'PUT',
          headers: {
            ...this.getAuthHeaders(token),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        return this.handleResponse<ReceiptItem>(response)
    }

    // Analytics
    async getWeeklySummary(date?: string, token?: string): Promise<WeeklySummary> {

        const url = new URL(`${API_BASE_URL}/expenses/weekly`)

        if (date) {
            url.searchParams.append('date', date)
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: this.getAuthHeaders(token),
        })

        return this.handleResponse<WeeklySummary>(response)
    }

    async getMonthlySummary(token?: string): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/expenses/summary`, {
            method: 'GET',
            headers: this.getAuthHeaders(token),
        })

        return this.handleResponse<any>(response)
    }
}

    export const api = new ApiClient()

