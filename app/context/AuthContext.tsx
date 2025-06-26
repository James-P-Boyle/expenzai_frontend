'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '../lib/types'
import { api } from '../lib/api'

interface AuthContextType {
    user: User | null
    token: string | null
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    register: (credentials: RegisterCredentials) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user && !!token

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('user')

        if (savedToken && savedUser) {
            try {
                setToken(savedToken)
                setUser(JSON.parse(savedUser))
            } catch (error) {
                // Clear invalid data
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user')
            }
        }

        setIsLoading(false)
    }, [])

    const saveAuthData = (authResponse: AuthResponse) => {
        setUser(authResponse.user)
        setToken(authResponse.token)
        localStorage.setItem('auth_token', authResponse.token)
        localStorage.setItem('user', JSON.stringify(authResponse.user))
    }

    const clearAuthData = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    }

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await api.login(credentials)
            saveAuthData(response)
        } catch (error) {
            throw error
        }
    }

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await api.register(credentials)
            saveAuthData(response)
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            if (token) {
                await api.logout(token)
            }
        } catch (error) {
            // Continue with logout even if API call fails
            console.error('Logout API call failed:', error)
        } finally {
            clearAuthData()
        }
    }

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}