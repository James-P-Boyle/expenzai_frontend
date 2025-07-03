import type { Metadata } from 'next'
import { League_Spartan, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

const leagueSpartan = League_Spartan({
    variable: "--font-league-spartan",
    subsets: ['latin'],
    display: "swap",
})

const libreBaskerville = Libre_Baskerville({
    variable: "--font-libre-baskerville",
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: "swap",
})

export const metadata: Metadata = {
    title: 'Receipt Tracker',
    description: 'Track your expenses with AI-powered receipt scanning',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${leagueSpartan.variable} ${libreBaskerville.variable} font-sans antialiased`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}