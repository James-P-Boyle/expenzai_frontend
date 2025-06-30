'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


import { 
  Calendar, 
  TrendingUp, 
  Euro, 
  Receipt as ReceiptIcon,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { WeeklySummary } from '@/app/lib/types';
import { api } from '@/app/lib/api';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green  
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280'  // Gray
];

export default function WeeklySummaryPage() {
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeeklySummary();
  }, [selectedDate]);

  const fetchWeeklySummary = async () => {
    try {
      setIsLoading(true);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await api.getWeeklySummary(dateStr);
      setWeeklySummary(response);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weekly summary');
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const goToCurrentWeek = () => {
    setSelectedDate(new Date());
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getWeekRange = (weekStart: string) => {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    
    return `${formatDate(weekStart)} - ${formatDate(end.toISOString().split('T')[0])}`;
  };

  // Prepare chart data
  const pieChartData = weeklySummary?.categories.map((category, index) => ({
    name: category.category,
    value: category.total,
    count: category.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  const barChartData = weeklySummary?.categories.map((category, index) => ({
    category: category.category.length > 12 
      ? category.category.substring(0, 10) + '...' 
      : category.category,
    amount: category.total,
    count: category.count,
    uncertain: category.uncertain_count
  })) || [];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ci-black">Weekly Summary</h1>
          <p className="text-ci-muted mt-1">Track your spending patterns and insights</p>
        </div>
        <Link href="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Receipt
          </Button>
        </Link>
      </div>

      {/* Week Navigator */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <Button onClick={goToPreviousWeek} variant="secondary" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-ci-muted" />
              <span className="font-medium text-ci-black">
                {weeklySummary ? getWeekRange(weeklySummary.week_start) : 'Loading...'}
              </span>
            </div>
            <Button 
              onClick={goToCurrentWeek} 
              variant="secondary" 
              size="sm" 
              className="mt-2 text-xs"
            >
              Current Week
            </Button>
          </div>
          
          <Button onClick={goToNextWeek} variant="secondary" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {error && (
        <Card className="p-6 mb-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <Button onClick={fetchWeeklySummary} variant="secondary" className="mt-4">
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {!weeklySummary || weeklySummary.receipts_count === 0 ? (
        <Card className="p-12 text-center">
          <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted mb-4" />
          <h3 className="text-lg font-medium text-ci-black mb-2">No receipts this week</h3>
          <p className="text-ci-muted mb-6">
            Upload receipts to see your weekly spending summary and insights.
          </p>
          <Link href="/dashboard/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Receipt
            </Button>
          </Link>
        </Card>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-ci-main rounded-lg">
                  <Euro className="h-6 w-6 text-ci-main" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-ci-muted">Total Spent</p>
                  <p className="text-2xl font-bold text-ci-black">
                    €{weeklySummary.total_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ReceiptIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-ci-muted">Receipts</p>
                  <p className="text-2xl font-bold text-ci-black">
                    {weeklySummary.receipts_count}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-ci-muted">Categories</p>
                  <p className="text-2xl font-bold text-ci-black">
                    {weeklySummary.categories.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-ci-main rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-ci-main" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-ci-muted">Avg per Receipt</p>
                  <p className="text-2xl font-bold text-ci-black">
                    €{(weeklySummary.total_amount / weeklySummary.receipts_count).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-ci-black mb-4">
                Spending by Category
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`€${value.toFixed(2)}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Bar Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-ci-black mb-4">
                Category Breakdown
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'amount' ? `€${value.toFixed(2)}` : value,
                        name === 'amount' ? 'Amount' : name === 'count' ? 'Items' : 'Uncertain'
                      ]}
                    />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Category Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ci-black mb-4">Category Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                      Avg per Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                      Uncertain
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {weeklySummary.categories
                    .sort((a, b) => b.total - a.total)
                    .map((category, index) => (
                      <tr key={category.category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-3"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-sm font-medium text-ci-black">
                              {category.category}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-ci-black">
                          €{category.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-ci-black">
                          {category.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-ci-black">
                          €{(category.total / category.count).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category.uncertain_count > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ci-main text-ci-main">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {category.uncertain_count}
                            </span>
                          ) : (
                            <span className="text-sm text-ci-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}