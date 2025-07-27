'use client'

import { useAuth } from '@/app/context/AuthContext'
import { Card } from '@/app/components/ui/Card'

export function AuthDebug() {
  const { user, token, isAuthenticated, isLoading } = useAuth()

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <Card className="p-4 border-2 border-yellow-500 mb-4 flex justify-end">
      <h3 className="font-bold text-sm mb-2">🐛 Auth Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>isAuthenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>isLoading: {isLoading ? '⏳' : '✅'}</div>
        <div>user: {user ? `✅ ${user.name} (${user.email})` : '❌'}</div>
        <div>token: {token ? '✅ Present' : '❌ Missing'}</div>
        <div>localStorage token: {typeof window !== 'undefined' ? (localStorage.getItem('auth_token') ? '✅' : '❌') : 'N/A'}</div>
        <div>API URL: {process.env.NEXT_PUBLIC_API_URL || '❌ Missing'}</div>
      </div>
    </Card>
  )
}
