import { Button } from "@/app/components/ui/Button"
import { Card } from "@/app/components/ui/Card"
import { getWeekRange } from "@/app/lib/utils"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface WeekNavigatorProps {
    weekStart: string | null
    onPreviousWeek: () => void
    onNextWeek: () => void
    onCurrentWeek: () => void
}

export default function WeekNavigator({
    weekStart,
    onPreviousWeek,
    onNextWeek,
    onCurrentWeek
}: WeekNavigatorProps) {

    const label = weekStart ? getWeekRange(weekStart) : 'Loading...'

    return (
        <Card className="px-4">
            <div className="grid grid-cols-2 grid-rows-2 gap-1 md:flex items-center justify-between">

                <Button onClick={onPreviousWeek} variant="secondary" size="sm">
                    <ChevronLeft className="size-5" />
                </Button>

                <div className="text-center row-start-1 col-span-2">

                    <div className="flex items-center justify-center space-x-2">
                        <Calendar className="size-5 text-ci-muted" />
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