import {
  Card as CardUi,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Card } from '@/types/types'

export type GroupCardProps = {
  card: Card
}

export function GroupCard({ card }: GroupCardProps) {
  return (
    <CardUi className="min-w-[200px]">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
      </CardHeader>

      <CardContent>{card.text}</CardContent>
    </CardUi>
  )
}
