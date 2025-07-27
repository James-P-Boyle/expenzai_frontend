import { BaseApiClient } from "./base"
import type {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
} from "../types"

export class AuthService extends BaseApiClient {
	async register(credentials: RegisterCredentials): Promise<AuthResponse> {
		const sessionId = this.getSessionId()

		return this.request("/register", {
			method: "POST",
			body: JSON.stringify({
				...credentials,
				session_id: sessionId,
			}),
		})
	}

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		console.log("API_BASE_URL:", process.env.NEXT_PUBLIC_API_URL)

		return this.request("/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		})
	}

	async logout(token?: string): Promise<{ message: string }> {
		return this.request(
			"/logout",
			{
				method: "POST",
			},
			token
		)
	}

	async getCurrentUser(token?: string) {
		return this.request("/user", {}, token)
	}

	async verifyEmail(
		token: string,
		email: string
	): Promise<{
		message: string
		verified: boolean
		user?: {
			id: number
			name: string
			email: string
			email_verified_at: string
			user_tier: string
		}
	}> {
		const response = await fetch(
			`${
				this.baseURL
			}/verify-email?token=${token}&email=${encodeURIComponent(email)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return this.handleResponse(response)
	}

	async resendVerification(token?: string): Promise<{ message: string }> {
		return this.request(
			"/resend-verification",
			{
				method: "POST",
			},
			token
		)
	}

	async updateEmail(
		email: string,
		token?: string
	): Promise<{ message: string }> {
		return this.request(
			"/update-email",
			{
				method: "POST",
				body: JSON.stringify({ email }),
			},
			token
		)
	}

	async deleteAccount(token?: string): Promise<{ message: string }> {
		return this.request(
			"/delete-account",
			{
				method: "DELETE",
			},
			token
		)
	}

	async requestData(token?: string): Promise<{ message: string }> {
		return this.request(
			"/request-data",
			{
				method: "POST",
			},
			token
		)
	}
}
