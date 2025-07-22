'use client'

import { useState, useEffect, useCallback } from 'react'
import { WeeklySummary } from '@/app/lib/types'
import { api } from '@/app/lib/api'
import WeekNavigator from './components/WeekNavigator'
import ErrorState from '@/app/components/ErrorState'
import EmptyState from '@/app/components/EmptyState'
import SummaryStats from './components/SummaryStats'
import SpendingCharts from './components/SpendingCharts'
import CategoryDetailsTable from './components/CategoryDetailsTable'
import { getErrorMessage } from '@/app/lib/error-utils'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'

export default function WeeklySummaryPage() {
    const [ weeklySummary, setWeeklySummary ] = useState<WeeklySummary | null>(null)
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ error, setError ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)

    const fetchWeeklySummary = useCallback(async () => {
        try {
            setLoading(true)
            const dateStr = selectedDate.toISOString().split('T')[0]
            const response = await api.getWeeklySummary(dateStr)
            setWeeklySummary(response)
            setError(null)
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to fetch weekly summary'))
        } finally {
            setLoading(false)
        }
    }, [selectedDate])

    useEffect(() => {
        fetchWeeklySummary()
    }, [selectedDate, fetchWeeklySummary])

    const goToPreviousWeek = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() - 7)
        setSelectedDate(newDate)
    }

    const goToNextWeek = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + 7)
        setSelectedDate(newDate)
    }

    // const goToCurrentWeek = () => {
    //     setSelectedDate(new Date())
    // }

    return (
        <>
            <WeekNavigator
                weekStart={weeklySummary?.week_start || null}
                onPreviousWeek={goToPreviousWeek}
                onNextWeek={goToNextWeek}
                // onCurrentWeek={goToCurrentWeek}
            />

            {loading && (
                <LoadingSpinner />
            )}

            {error && (
                <ErrorState error={error} onRetry={fetchWeeklySummary} />
            )}

            {!weeklySummary || weeklySummary.receipts_count === 0 ? (
                <EmptyState />
            ) : (
                <section className="space-y-6 py-6">
                    <SummaryStats weeklySummary={weeklySummary} />
                    <SpendingCharts weeklySummary={weeklySummary} />
                    <CategoryDetailsTable weeklySummary={weeklySummary} />
                </section>
            )}
        </>
    )
}