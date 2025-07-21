'use client'

import React from 'react'

import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react'
import { useFlash } from '../context/FlashContext'

const FlashMessages: React.FC = () => {
    const { messages, removeFlash } = useFlash()

    if (messages.length === 0) return null

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-ci-black" />
            case 'error':
                return <XCircle className="w-5 h-5 text-ci-black" />
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-ci-black" />
            default:
                return null
        }
    }

    const getBackgroundColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-ci-success'
            case 'error':
                return 'bg-ci-danger'
            case 'warning':
                return 'bg-ci-warn'
            default:
                return 'bg-ci-main'
        }
    }

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`${getBackgroundColor(message.type)} rounded-full p-3 shadow-lg animate-in slide-in-from-right-5 duration-300 flex items-center gap-2 min-w-12 max-w-80`}
                >
                    {getIcon(message.type)}
                    <span className="text-ci-black text-sm font-medium truncate">
                        {message.message}
                    </span>
                    <button
                        onClick={() => removeFlash(message.id)}
                        className="text-ci-black hover:text-gray-200 transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default FlashMessages