import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Receipt,
  UploadResponse,
  WeeklySummary,
  ReceiptItem,
  CategoriesResponse,
  CategorySummary,
  CategoryDetails,
  MonthlySummary,
  PresignedUrlResponse,
  MultiUploadResponse,
  UploadFileData,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
class ApiClient {
  private getAuthHeaders(token?: string) {
    const headers: Record<string, string> = {
      Accept: "application/json",
    }

    const authToken =
      token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : null)

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    // Get the response text first
    const responseText = await response.text()

    if (!response.ok) {
      console.error(
        "❌ Response not OK:",
        response.status,
        response.statusText
      )
      try {
        const error = JSON.parse(responseText) as {
          message?: string
          errors?: Record<string, string[]>
        }

        console.error("❌ Parsed error:", error)

        if (response.status === 422 && error.errors) {
          const validationMessages = Object.values(error.errors)
            .flat()
            .join(", ")
          throw new Error(`Validation failed: ${validationMessages}`)
        }

        throw new Error(
          error.message || `Request failed with status ${response.status}`
        )
      } catch (parseError) {
        console.error("❌ Could not parse error response:", parseError)
        throw new Error(
          `Request failed with status ${response.status}: ${responseText}`
        )
      }
    }

    try {
      const data = JSON.parse(responseText)
      return data
    } catch (parseError) {
      console.error("❌ Could not parse success response:", parseError)
      throw new Error("Invalid response format")
    }
  }

  // Authentication
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })

    return this.handleResponse<AuthResponse>(response)
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
    console.log(
      "API_BASE_URL:",
      process.env.NEXT_PUBLIC_API_URL,
      `${API_BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      }
    )
    return this.handleResponse<AuthResponse>(response)
  }

  async logout(token?: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<{ message: string }>(response)
  }

  // Add these methods to your existing ApiClient class

  // S3 Upload Methods
  async getPresignedUrl(
    file: File,
    token?: string
  ): Promise<PresignedUrlResponse> {
    const response = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(token),
      },
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
      }),
    })

    return this.handleResponse<PresignedUrlResponse>(response)
  }

  async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })

    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.status}`)
    }
  }

  async confirmUploads(
    files: UploadFileData[],
    token?: string
  ): Promise<MultiUploadResponse> {
    const response = await fetch(`${API_BASE_URL}/upload/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(token),
      },
      body: JSON.stringify({ files }),
    })

    return this.handleResponse<MultiUploadResponse>(response)
  }
  
  async uploadReceipt(
    imageFile: File,
    token?: string
  ): Promise<UploadResponse> {
    try {
      console.log("📤 Single file upload - using S3 method")
      
      // Use the new S3 method internally
      const response = await this.uploadReceipts([imageFile], token)
      
      // Convert multi-upload response to single-upload format for backward compatibility
      return {
        id: response.receipts[0].id,
        status: response.receipts[0].status,
        message: 'Receipt uploaded successfully! We\'re extracting the data now.',
      }
    } catch (error) {
      console.error("📤 Upload request failed:", error)
      throw error
    }
  }

  // Multi-file upload method
  async uploadReceipts(
    files: File[],
    token?: string
  ): Promise<MultiUploadResponse> {
    try {
      console.log(`🚀 Starting multi-file upload for ${files.length} files`)

      // Step 1: Get presigned URLs for all files
      console.log("📝 Getting presigned URLs...")
      const presignedUrls = await Promise.all(
        files.map((file) => this.getPresignedUrl(file, token))
      )

      // Step 2: Upload all files to S3 in parallel
      console.log("☁️ Uploading files to S3...")
      await Promise.all(
        files.map((file, index) =>
          this.uploadToS3(presignedUrls[index].presigned_url, file)
        )
      )

      // Step 3: Confirm uploads with backend
      console.log("✅ Confirming uploads with backend...")
      const confirmData: UploadFileData[] = files.map((file, index) => ({
        file_key: presignedUrls[index].file_key,
        original_name: file.name,
        file_size: file.size,
      }))

      const result = await this.confirmUploads(confirmData, token)
      console.log("🎉 Multi-file upload completed successfully")
      return result
    } catch (error) {
      console.error("❌ Multi-file upload failed:", error)
      throw error
    }
  }

  async getReceipts(token?: string): Promise<{ data: Receipt[] }> {
    const response = await fetch(`${API_BASE_URL}/receipts`, {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<{ data: Receipt[] }>(response)
  }

  async getReceipt(id: number, token?: string): Promise<Receipt> {
    const response = await fetch(`${API_BASE_URL}/receipts/${id}`, {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<Receipt>(response)
  }

  async deleteReceipt(
    id: number,
    token?: string
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/receipts/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<{ message: string }>(response)
  }

  async getItem(
    id: number,
    token?: string
  ): Promise<{ data: ReceiptItem }> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })
  
    return this.handleResponse<{ data: ReceiptItem }>(response)
  }
  
  async updateItem(
    id: number,
    data: {
      name?: string
      category?: string
      price?: number
      is_uncertain?: boolean
    },
    token?: string
  ): Promise<{ data: ReceiptItem; message: string }> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PUT",
      headers: {
        ...this.getAuthHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  
    return this.handleResponse<{ data: ReceiptItem; message: string }>(response)
  }

  // Categories
  async getCategories(token?: string): Promise<CategoriesResponse> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<CategoriesResponse>(response)
  }

  async getWeeklyCategories(
    date?: string,
    token?: string
  ): Promise<CategoriesResponse> {
    const url = new URL(`${API_BASE_URL}/categories/weekly`)

    if (date) {
      url.searchParams.append("date", date)
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<CategoriesResponse>(response)
  }

  async getCategoryDetails(
    category: string,
    token?: string
  ): Promise<{ data: CategoryDetails }> {
    const response = await fetch(
      `${API_BASE_URL}/categories/${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: this.getAuthHeaders(token),
      }
    )

    return this.handleResponse<{ data: CategoryDetails }>(response)
  }

  async getWeeklySummary(
    date?: string,
    token?: string
  ): Promise<WeeklySummary> {
    const url = new URL(`${API_BASE_URL}/expenses/weekly`)

    if (date) {
      url.searchParams.append("date", date)
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<WeeklySummary>(response)
  }

  async getMonthlySummary(token?: string): Promise<MonthlySummary> {
    const response = await fetch(`${API_BASE_URL}/expenses/summary`, {
      method: "GET",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<MonthlySummary>(response)
  }

  async updateEmail(
    email: string,
    token?: string
  ): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/update-email`, {
      method: "POST",
      headers: {
        ...this.getAuthHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    return this.handleResponse<{ message: string }>(response)
  }

  // Delete Account
  async deleteAccount(token?: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/delete-account`, {
      method: "DELETE",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<{ message: string }>(response)
  }

  // Request Data Export
  async requestData(token?: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/request-data`, {
      method: "POST",
      headers: this.getAuthHeaders(token),
    })

    return this.handleResponse<{ message: string }>(response)
  }
}

export const api = new ApiClient()
export type { CategorySummary, CategoriesResponse }
