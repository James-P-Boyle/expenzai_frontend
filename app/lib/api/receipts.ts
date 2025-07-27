import { BaseApiClient } from "./base"
import type { Receipt, ReceiptItem } from "../types"

export class ReceiptsService extends BaseApiClient {
	// Receipt management
	async getReceipts(token?: string): Promise<{ data: Receipt[] }> {
		return this.request("/receipts", {}, token)
	}

	async getReceipt(id: number, token?: string): Promise<Receipt> {
		return this.request(`/receipts/${id}`, {}, token)
	}

	async deleteReceipt(
		id: number,
		token?: string
	): Promise<{ message: string }> {
		return this.request(
			`/receipts/${id}`,
			{
				method: "DELETE",
			},
			token
		)
	}

	async updateReceipt(
		id: number,
		data: any,
		token?: string
	): Promise<{ data: Receipt; message: string }> {
		return this.request(
			`/receipts/${id}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
			token
		)
	}

	// Anonymous receipts
	async getAnonymousReceipts(): Promise<{
		data: Receipt[]
		remaining_uploads?: number
		total_count?: number
		session_id?: string
	}> {
		const sessionId = this.getSessionId()

		const response = await fetch(
			`${this.baseURL}/anonymous/receipts/${sessionId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return this.handleResponse(response)
	}

	async getAnonymousReceipt(id: number): Promise<Receipt> {
		const sessionId = this.getSessionId()

		const response = await fetch(
			`${this.baseURL}/anonymous/receipts/${sessionId}/${id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return this.handleResponse(response)
	}

	// Items management
	async getItem(id: number, token?: string): Promise<{ data: ReceiptItem }> {
		return this.request(`/items/${id}`, {}, token)
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
		return this.request(
			`/items/${id}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
			token
		)
	}
}
