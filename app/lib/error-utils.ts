export function getErrorMessage(error: unknown, fallback: string = 'An error occurred'): string {
    if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    } else {
      return fallback
    }
}