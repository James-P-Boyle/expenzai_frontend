import { BaseApiClient } from "./base"
import type {
	SubscriptionPlan,
	Subscription,
	CreateSubscriptionResponse,
	BillingPortalResponse,
} from "../types"

export class SubscriptionService extends BaseApiClient {
	async getSubscriptionPlans(): Promise<{ data: SubscriptionPlan[] }> {
		const response = await fetch(`${this.baseURL}/subscription/plans`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		return this.handleResponse<{ data: SubscriptionPlan[] }>(response)
	}

	async getCurrentSubscription(
		token?: string
	): Promise<{ data: Subscription | null }> {
		return this.request("/subscription/current", {}, token)
	}

	async createSubscription(
		planId: string,
		billingInterval: "monthly" | "yearly",
		token?: string
	): Promise<CreateSubscriptionResponse> {
		return this.request(
			"/subscription/create",
			{
				method: "POST",
				body: JSON.stringify({
					plan_id: planId,
					billing_interval: billingInterval,
				}),
			},
			token
		)
	}

	async updateSubscription(
		planId: string,
		billingInterval: "monthly" | "yearly",
		token?: string
	): Promise<{ message: string; subscription: Subscription }> {
		return this.request(
			"/subscription/update",
			{
				method: "PUT",
				body: JSON.stringify({
					plan_id: planId,
					billing_interval: billingInterval,
				}),
			},
			token
		)
	}

	async cancelSubscription(
		token?: string
	): Promise<{ message: string; subscription: Subscription }> {
		return this.request(
			"/subscription/cancel",
			{
				method: "POST",
			},
			token
		)
	}

	async resumeSubscription(
		token?: string
	): Promise<{ message: string; subscription: Subscription }> {
		return this.request(
			"/subscription/resume",
			{
				method: "POST",
			},
			token
		)
	}

	async getBillingPortal(token?: string): Promise<BillingPortalResponse> {
		return this.request(
			"/subscription/billing-portal",
			{
				method: "POST",
			},
			token
		)
	}

	async getUploadUsage(token?: string): Promise<{
		current_month_uploads: number
		limit: number
		remaining: number
		tier: string
	}> {
		return this.request("/subscription/usage", {}, token)
	}
}
