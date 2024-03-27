import { Paper } from '@/components/ui/paper'
import { useFormContext } from 'react-hook-form'
import { DashboardFormValues, DashboardPlatformOption } from './dashboard-schemas'
import { DragHandle } from '@/components/icons/drag-handle'
import { useCallback } from 'react'

type DashboardPlatformFieldProps = {
    platforms: DashboardPlatformOption[]
    index: number
    onRemove: (linkIndex: number) => void
}

export const DashboardPlatformField = ({
    index,
    platforms,
    onRemove,
}: DashboardPlatformFieldProps) => {
    const { control } = useFormContext<DashboardFormValues>()

    const handleRemove = useCallback(() => {
        onRemove(index)
    }, [index, onRemove])

    return (
        <Paper>
            <div className="flex items-center justify-between text-grey-500">
                <div className="flex items-center gap-2">
                    <DragHandle />
                    <span className="text-[16px] font-bold leading-[150%]">{`Link #${index + 1}`}</span>
                </div>

                <button className="text-b-m" type="button" onClick={handleRemove}>
                    Remove
                </button>
            </div>
        </Paper>
    )
}
