'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Euro, 
  Edit3, 
  Check, 
  X, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Trash2
} from 'lucide-react';
import { Receipt, ReceiptItem } from '@/app/lib/types';
import { api } from '@/app/lib/api';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

interface ReceiptDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ReceiptDetailsPage({ params }: ReceiptDetailsPageProps) {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const categories = [
    'Food & Groceries',
    'Household',
    'Personal Care',
    'Beverages',
    'Snacks',
    'Meat & Deli',
    'Dairy',
    'Vegetables',
    'Fruits',
    'Other'
  ];

  useEffect(() => {
    fetchReceipt();
  }, [params.id]);

  const fetchReceipt = async () => {
    try {
      setIsLoading(true);
      const response = await api.getReceipt(parseInt(params.id));
      setReceipt(response);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch receipt');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (item: ReceiptItem) => {
    setEditingItem(item.id);
    setEditCategory(item.category);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditCategory('');
  };

  const saveEdit = async (itemId: number) => {
    if (!editCategory) return;

    setIsUpdating(true);
    try {
      await api.updateItem(itemId, {
        category: editCategory,
        is_uncertain: false
      });
      
      // Update local state
      if (receipt) {
        setReceipt({
          ...receipt,
          items: receipt.items.map(item =>
            item.id === itemId
              ? { ...item, category: editCategory, is_uncertain: false }
              : item
          )
        });
      }
      
      setEditingItem(null);
      setEditCategory('');
    } catch (err: any) {
      alert(err.message || 'Failed to update item');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteReceipt = async () => {
    if (!receipt || !confirm('Are you sure you want to delete this receipt?')) return;

    try {
      await api.deleteReceipt(receipt.id);
      router.push('/dashboard/receipts');
    } catch (err: any) {
      alert(err.message || 'Failed to delete receipt');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Receipt Not Found</h3>
          <p className="text-gray-500 mb-6">{error || 'This receipt does not exist'}</p>
          <Link href="/dashboard/receipts">
            <Button>Back to Receipts</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/receipts">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Receipt Details</h1>
            <div className="flex items-center space-x-2 mt-1">
              {getStatusIcon(receipt.status)}
              <span className="text-gray-600">
                {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <Button onClick={deleteReceipt} variant="danger" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receipt Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Store</p>
                  <p className="font-medium">{receipt.store_name || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {receipt.receipt_date || receipt.created_at.split('T')[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Euro className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-lg">{receipt.formatted_total}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Items</p>
                <p className="font-medium">{receipt.items.length}</p>
              </div>
            </div>
          </Card>

          {/* Items List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
            {receipt.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items found</p>
            ) : (
              <div className="space-y-3">
                {receipt.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        {item.is_uncertain && (
                            <div className='flex items-center gap-2 text-yellow-500'>
                                <AlertTriangle className="h-4 w-4"/>
                                <span>
                                    Uncertain category
                                </span>
                            </div>   
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        {editingItem === item.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                              disabled={isUpdating}
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => saveEdit(item.id)}
                              disabled={isUpdating}
                              className="p-1 text-green-600 hover:text-green-800"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              disabled={isUpdating}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              item.is_uncertain 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.category}
                            </span>
                            <button
                              onClick={() => startEditing(item)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="Edit category"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{item.formatted_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Processing Status */}
          {receipt.status === 'processing' && (
            <Card className="p-4">
              <div className="text-center">
                <Clock className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                <p className="text-sm font-medium text-gray-900">Processing</p>
                <p className="text-xs text-gray-500 mt-1">
                  AI is analyzing your receipt. This usually takes 15-30 seconds.
                </p>
                <Button 
                  onClick={fetchReceipt} 
                  variant="secondary" 
                  size="sm" 
                  className="mt-3 w-full"
                >
                  Refresh
                </Button>
              </div>
            </Card>
          )}

          {/* Category Breakdown */}
          {receipt.status === 'completed' && receipt.items.length > 0 && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">Category Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(
                  receipt.items.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + parseFloat(item.price);
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, total]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">€{total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
            <div className="space-y-2">
              <Link href="/dashboard/weekly">
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  View Weekly Summary
                </Button>
              </Link>
              <Link href="/dashboard/upload">
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  Upload Another Receipt
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}