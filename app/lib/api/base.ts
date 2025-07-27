const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class BaseApiClient {
	protected baseURL: string

	constructor() {
		this.baseURL = API_BASE_URL || ""
	}

	protected getAuthHeaders(token?: string): Record<string, string> {
		const headers: Record<string, string> = {
			Accept: "application/json",
		}

		const authToken =
			token ||
			(typeof window !== "undefined"
				? localStorage.getItem("auth_token")
				: null)

		// Debug logging
		console.log("🔑 Auth Debug Info:", {
			providedToken: token ? "***provided***" : "none",
			storedToken:
				typeof window !== "undefined"
					? localStorage.getItem("auth_token")
						? "***stored***"
						: "none"
					: "server-side",
			finalToken: authToken ? "***using***" : "none",
			baseURL: this.baseURL,
		})

		if (authToken) {
			headers["Authorization"] = `Bearer ${authToken}`
		} else {
			console.warn("⚠️ No auth token available for request")
		}

		return headers
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		const responseText = await response.text()

		if (!response.ok) {
			console.error(
				"❌ Response not OK:",
				response.status,
				response.statusText
			)
			console.error("❌ Request URL:", response.url)

			// Special handling for 401 errors
			if (response.status === 401) {
				console.error(
					"🚨 Authentication failed - token may be invalid or expired"
				)
				console.error("🔍 Check if:", {
					tokenExists:
						typeof window !== "undefined"
							? !!localStorage.getItem("auth_token")
							: "server-side",
					apiUrl: this.baseURL,
					endpoint: response.url.replace(this.baseURL, ""),
				})

				// Optionally clear invalid token and redirect to login
				if (typeof window !== "undefined") {
					const currentPath = window.location.pathname
					if (!currentPath.includes("/auth/")) {
						console.log(
							"🔄 Clearing invalid token and redirecting to login"
						)
						localStorage.removeItem("auth_token")

						window.location.href = "/auth/login"
					}
				}
			}

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
					error.message ||
						`Request failed with status ${response.status}`
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

	protected async request<T>(
		endpoint: string,
		options: RequestInit = {},
		token?: string
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`

		const headers: HeadersInit = {
			"Content-Type": "application/json",
			...this.getAuthHeaders(token),
			...options.headers,
		}

		const config: RequestInit = {
			...options,
			headers,
		}

		console.log("🌐 Making API request:", {
			method: config.method || "GET",
			url,
			hasAuth: !!(headers as any)["Authorization"],
			endpoint,
		})

		try {
			const response = await fetch(url, config)
			return await this.handleResponse<T>(response)
		} catch (error) {
			console.error("API request failed:", error)
			throw error
		}
	}

	protected getSessionId(): string {
		if (typeof window === "undefined") return ""

		let sessionId = localStorage.getItem("anonymous_session_id")
		if (!sessionId) {
			sessionId =
				"anon_" +
				Date.now() +
				"_" +
				Math.random().toString(36).substr(2, 9)
			localStorage.setItem("anonymous_session_id", sessionId)
		}
		return sessionId
	}
}
