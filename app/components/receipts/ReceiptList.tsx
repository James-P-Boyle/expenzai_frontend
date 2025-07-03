import { Receipt } from '@/app/lib/types'
import { ReceiptCard } from './ReceiptCard'

interface ReceiptsListProps {
  receipts: Receipt[]
}

export function ReceiptsList({ receipts }: ReceiptsListProps) {
  return (
    <div className="space-y-4">
      {receipts.map((receipt) => (
        <ReceiptCard key={receipt.id} receipt={receipt} />
      ))}
    </div>
  )
}