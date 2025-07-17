'use client'

import { useConsent } from "@/app/context/CookieConsent"
import { api } from "@/app/lib/api"
import Link from "next/link"
import { useState } from 'react'


export default function PrivacySettings() {
  const { consent, updateConsent } = useConsent()
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')

  const handlePreferenceChange = (type: 'analytics' | 'marketing', value: boolean) => {
    if (consent) {
      updateConsent({ ...consent, [type]: value })
      setMessage(`Updated ${type} cookie preference`)
    }
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email !== emailConfirm) {
      setMessage('Emails do not match')
      return
    }
    try {
      const response = await api.updateEmail(email)
      setMessage(response.message)
    } catch (error: any) {
      setMessage(error.message || 'Failed to update email')
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        const response = await api.deleteAccount()
        setMessage(response.message)
        // Optionally redirect to logout or homepage
        localStorage.removeItem('auth_token')
        window.location.href = '/'
      } catch (error: any) {
        setMessage(error.message || 'Failed to delete account')
      }
    }
  }

  const handleDataRequest = async () => {
    try {
      const response = await api.requestData()
      setMessage(response.message)
    } catch (error: any) {
      setMessage(error.message || 'Failed to request data')
    }
  }

  return (
    <div className="p-6 h-full space-y-4">

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Essential cookies are required for the site to function and cannot be disabled.
        </p>
        <label className="flex items-center justify-between">
          <span>Analytics Cookies</span>
          <input
            type="checkbox"
            checked={consent?.analytics || false}
            onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
            className="rounded"
          />
        </label>
        <label className="flex items-center justify-between">
          <span>Marketing Cookies</span>
          <input
            type="checkbox"
            checked={consent?.marketing || false}
            onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
            className="rounded"
          />
        </label>
        <button
          onClick={() => updateConsent(null)}
          className="text-ci-danger hover:underline"
        >
          Withdraw All Consent
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Manage Your Account</h3>
        {/* <form onSubmit={handleEmailUpdate} className="space-y-2"> */}
          {/* <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New email"
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            placeholder="Confirm new email"
            className="border rounded p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-600 text-white rounded p-2">
            Update Email
          </button>
        </form>
        <button
          onClick={handleDataRequest}
          className="bg-green-600 text-white rounded p-2"
        >
          Request My Data
        </button> */}
        <button
          onClick={handleDeleteAccount}
          className="bg-ci-danger text-white rounded p-2"
        >
          Delete My Account
        </button>
      </div>
      <Link href="/privacy-policy" className="text-ci-main hover:underline">
        View Privacy Policy
      </Link>
    </div>
  )
}