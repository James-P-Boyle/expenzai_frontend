import { AuthService } from "./auth"
import { UploadService } from "./upload"
import { ReceiptsService } from "./receipts"
import { AnalyticsService } from "./analytics"
import { SubscriptionService } from "./subscription"

// Main API client that combines all services
class ApiClient {
	public auth: AuthService
	public upload: UploadService
	public receipts: ReceiptsService
	public analytics: AnalyticsService
	public subscription: SubscriptionService

	constructor() {
		this.auth = new AuthService()
		this.upload = new UploadService()
		this.receipts = new ReceiptsService()
		this.analytics = new AnalyticsService()
		this.subscription = new SubscriptionService()
	}

	// Legacy methods for backward compatibility
	async register(credentials: any) {
		return this.auth.register(credentials)
	}

	async login(credentials: any) {
		return this.auth.login(credentials)
	}

	async logout(token?: string) {
		return this.auth.logout(token)
	}

	async getCurrentUser(token?: string) {
		return this.auth.getCurrentUser(token)
	}

	async uploadReceipt(file: File, token?: string) {
		return this.upload.uploadReceipt(file, token)
	}

	async uploadReceipts(files: File[], token?: string) {
		return this.upload.uploadReceipts(files, token)
	}

	async uploadReceiptsAnonymous(files: File[]) {
		return this.upload.uploadReceiptsAnonymous(files)
	}

	async getReceipts(token?: string) {
		return this.receipts.getReceipts(token)
	}

	async getReceipt(id: number, token?: string) {
		return this.receipts.getReceipt(id, token)
	}

	async deleteReceipt(id: number, token?: string) {
		return this.receipts.deleteReceipt(id, token)
	}

	async getAnonymousReceipts() {
		return this.receipts.getAnonymousReceipts()
	}

	async getAnonymousReceipt(id: number) {
		return this.receipts.getAnonymousReceipt(id)
	}

	async getCategories(token?: string) {
		return this.analytics.getCategories(token)
	}

	async getWeeklyCategories(date?: string, token?: string) {
		return this.analytics.getWeeklyCategories(date, token)
	}

	async getWeeklySummary(date?: string, token?: string) {
		return this.analytics.getWeeklySummary(date, token)
	}

	async getMonthlySummary(token?: string) {
		return this.analytics.getMonthlySummary(token)
	}

	async getSubscriptionPlans() {
		return this.subscription.getSubscriptionPlans()
	}

	async getCurrentSubscription(token?: string) {
		return this.subscription.getCurrentSubscription(token)
	}

	async createSubscription(
		planId: string,
		billingInterval: "monthly" | "yearly",
		token?: string
	) {
		return this.subscription.createSubscription(
			planId,
			billingInterval,
			token
		)
	}

	async cancelSubscription(token?: string) {
		return this.subscription.cancelSubscription(token)
	}

	async resumeSubscription(token?: string) {
		return this.subscription.resumeSubscription(token)
	}

	async getBillingPortal(token?: string) {
		return this.subscription.getBillingPortal(token)
	}

	async getUploadUsage(token?: string) {
		return this.subscription.getUploadUsage(token)
	}

	async verifyEmail(token: string, email: string) {
		return this.auth.verifyEmail(token, email)
	}

	async resendVerification(token?: string) {
		return this.auth.resendVerification(token)
	}

	async updateEmail(email: string, token?: string) {
		return this.auth.updateEmail(email, token)
	}

	async deleteAccount(token?: string) {
		return this.auth.deleteAccount(token)
	}

	async requestData(token?: string) {
		return this.auth.requestData(token)
	}

	async updateItem(id: number, data: any, token?: string) {
		return this.receipts.updateItem(id, data, token)
	}

	async getItem(id: number, token?: string) {
		return this.receipts.getItem(id, token)
	}

	async getCategoryDetails(category: string, token?: string) {
		return this.analytics.getCategoryDetails(category, token)
	}

	async updateReceipt(id: number, data: any, token?: string) {
		return this.receipts.updateReceipt(id, data, token)
	}

	async updateSubscription(
		planId: string,
		billingInterval: "monthly" | "yearly",
		token?: string
	) {
		return this.subscription.updateSubscription(
			planId,
			billingInterval,
			token
		)
	}
}

// Export the main API client instance
export const api = new ApiClient()

// Export individual services for direct access
export { AuthService } from "./auth"
export { UploadService } from "./upload"
export { ReceiptsService } from "./receipts"
export { AnalyticsService } from "./analytics"
export { SubscriptionService } from "./subscription"

export type { CategorySummary, CategoriesResponse } from "../types"
