import { BaseApiClient } from "./base"
import type {
	CategoriesResponse,
	CategoryDetails,
	WeeklySummary,
	MonthlySummary,
} from "../types"

export class AnalyticsService extends BaseApiClient {
	// Categories
	async getCategories(token?: string): Promise<CategoriesResponse> {
		return this.request("/categories", {}, token)
	}

	async getWeeklyCategories(
		date?: string,
		token?: string
	): Promise<CategoriesResponse> {
		const url = new URL(`${this.baseURL}/categories/weekly`)

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
		return this.request(
			`/categories/${encodeURIComponent(category)}`,
			{},
			token
		)
	}

	// Expense summaries
	async getWeeklySummary(
		date?: string,
		token?: string
	): Promise<WeeklySummary> {
		const url = new URL(`${this.baseURL}/expenses/weekly`)

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
		return this.request("/expenses/summary", {}, token)
	}
}
