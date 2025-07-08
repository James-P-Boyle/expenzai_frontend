'use client'

import { useState, useEffect, useCallback } from 'react'
import { WeeklySummary } from '@/app/lib/types'
import { api } from '@/app/lib/api'
import WeekNavigator from '../../components/weekly/WeekNavigator'
import ErrorState from '@/app/components/ErrorState'
import EmptyState from '@/app/components/EmptyState'
import SummaryStats from '../../components/weekly/SummaryStats'
import SpendingCharts from '../../components/weekly/SpendingCharts'
import CategoryDetailsTable from '../../components/weekly/CategoryDetailsTable'
import { getErrorMessage } from '@/app/lib/error-utils'

export default function WeeklySummaryPage() {
    const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [error, setError] = useState<string | null>(null)

    const fetchWeeklySummary = useCallback(async () => {
        try {
            const dateStr = selectedDate.toISOString().split('T')[0]
            const response = await api.getWeeklySummary(dateStr)
            setWeeklySummary(response)
            setError(null)
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to fetch weekly summary'))
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

            {error && (
                <ErrorState error={error} onRetry={fetchWeeklySummary} />
            )}

            {!weeklySummary || weeklySummary.receipts_count === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <SummaryStats weeklySummary={weeklySummary} />
                    <SpendingCharts weeklySummary={weeklySummary} />
                    <CategoryDetailsTable weeklySummary={weeklySummary} />
                </>
            )}
        </>
    )
}