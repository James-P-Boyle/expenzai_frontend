import { BaseApiClient } from './base'
import type {
  PresignedUrlResponse,
  MultiUploadResponse,
  UploadFileData,
  UploadResponse,
} from '../types'

export class UploadService extends BaseApiClient {
    
  // Authenticated uploads
  async getPresignedUrl(file: File, token?: string): Promise<PresignedUrlResponse> {
    return this.request('/upload/presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
      }),
    }, token)
  }

  async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.status}`)
    }
  }

  async confirmUploads(files: UploadFileData[], token?: string): Promise<MultiUploadResponse> {
    return this.request('/upload/confirm', {
      method: 'POST',
      body: JSON.stringify({ files }),
    }, token)
  }

  async uploadReceipts(files: File[], token?: string): Promise<MultiUploadResponse> {
    try {
      console.log(`🚀 Starting multi-file upload for ${files.length} files`)

      // Step 1: Get presigned URLs for all files
      console.log('📝 Getting presigned URLs...')
      const presignedUrls = await Promise.all(
        files.map((file) => this.getPresignedUrl(file, token))
      )

      // Step 2: Upload all files to S3 in parallel
      console.log('☁️ Uploading files to S3...')
      await Promise.all(
        files.map((file, index) =>
          this.uploadToS3(presignedUrls[index].presigned_url, file)
        )
      )

      // Step 3: Confirm uploads with backend
      console.log('✅ Confirming uploads with backend...')
      const confirmData: UploadFileData[] = files.map((file, index) => ({
        file_key: presignedUrls[index].file_key,
        original_name: file.name,
        file_size: file.size,
      }))

      const result = await this.confirmUploads(confirmData, token)
      console.log('🎉 Multi-file upload completed successfully')
      return result
    } catch (error) {
      console.error('❌ Multi-file upload failed:', error)
      throw error
    }
  }

  async uploadReceipt(imageFile: File, token?: string): Promise<UploadResponse> {
    try {
      console.log('📤 Single file upload - using S3 method')

      // Use the multi-upload method internally
      const response = await this.uploadReceipts([imageFile], token)

      // Convert multi-upload response to single-upload format for backward compatibility
      return {
        id: response.receipts[0].id,
        status: response.receipts[0].status,
        message: 'Receipt uploaded successfully! We\'re extracting the data now.',
      }
    } catch (error) {
      console.error('📤 Upload request failed:', error)
      throw error
    }
  }

  // Anonymous uploads
  async getPresignedUrlAnonymous(file: File): Promise<PresignedUrlResponse> {
    const sessionId = this.getSessionId()

    return this.request('/anonymous/upload/presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
        session_id: sessionId,
      }),
    })
  }

  async confirmAnonymousUploads(files: UploadFileData[]): Promise<MultiUploadResponse> {
    const sessionId = this.getSessionId()

    return this.request('/anonymous/upload/confirm', {
      method: 'POST',
      body: JSON.stringify({
        files,
        session_id: sessionId,
      }),
    })
  }

  async uploadReceiptsAnonymous(files: File[]): Promise<MultiUploadResponse> {
    try {
      console.log(`🚀 Starting anonymous multi-file upload for ${files.length} files`)

      // Step 1: Get presigned URLs for all files
      const presignedUrls = await Promise.all(
        files.map((file) => this.getPresignedUrlAnonymous(file))
      )

      // Step 2: Upload all files to S3 in parallel
      await Promise.all(
        files.map((file, index) =>
          this.uploadToS3(presignedUrls[index].presigned_url, file)
        )
      )

      // Step 3: Confirm uploads with backend
      const confirmData = files.map((file, index) => ({
        file_key: presignedUrls[index].file_key,
        original_name: file.name,
        file_size: file.size,
      }))

      const result = await this.confirmAnonymousUploads(confirmData)
      return result
    } catch (error) {
      console.error('❌ Anonymous multi-file upload failed:', error)
      throw error
    }
  }
}