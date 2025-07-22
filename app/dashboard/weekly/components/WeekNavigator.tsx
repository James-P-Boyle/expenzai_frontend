import { Button } from "@/app/components/ui/Button"
import { Card } from "@/app/components/ui/Card"
import { getWeekRange } from "@/app/lib/utils"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface WeekNavigatorProps {
    weekStart: string | null
    onPreviousWeek: () => void
    onNextWeek: () => void
}

export default function WeekNavigator({
    weekStart,
    onPreviousWeek,
    onNextWeek,
}: WeekNavigatorProps) {

    const label = weekStart ? getWeekRange(weekStart) : 'Loading...'

    return (
        <Card className="p-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:flex items-center justify-between">

                <Button onClick={onPreviousWeek} variant="secondary" size="sm">
                    <ChevronLeft className="size-5" />
                </Button>

                <div className="text-center row-start-1 col-span-2 w-full block">

                    <div className="flex items-center justify-center space-x-2 h-full">
                        <Calendar className="size-5 mb-1 text-ci-muted" />
                        <span className="font-medium">{label}</span>
                    </div>

                    {/* <Button
                        onClick={onCurrentWeek}
                        variant="secondary"
                        size="sm"
                        className={`mt-2 text-xs ${isCurrentWeek ? '!bg-ci-main/20' : ''}`}
                    >
                        Current Week
                    </Button> */}

                </div>

                <Button onClick={onNextWeek} variant="secondary" size="sm">
                    <ChevronRight className="size-5" />
                </Button>

            </div>
        </Card>
    )
}