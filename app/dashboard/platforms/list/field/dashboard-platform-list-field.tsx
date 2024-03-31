import { Paper } from '@/components/ui/paper'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { DragHandle } from '@/components/icons/drag-handle'
import { useCallback, useMemo } from 'react'
import { DashboardFormValues, DashboardPlatformOption } from '../../../dashboard-schemas'
import { Button } from '@/components/ui/button'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { cn } from '@/lib/utils'
import { DashboardPlatformListFieldSelect } from '../field/dashboard-platform-list-field-select'
import { DashboardPlatformListfieldUrl } from '../field/dashboard-platform-list-field-url'

type DraggedElementProps = {
    attributes?: DraggableAttributes
    listeners?: SyntheticListenerMap
    setNodeRef?: (node: HTMLElement | null) => void
    isDragging?: boolean
    style?: React.CSSProperties
    isDraggingDisabled?: boolean
}

type DashboardPlatformListFieldProps = DraggedElementProps & {
    platformsOptions: DashboardPlatformOption[]
    index: number
    onRemove: UseFieldArrayRemove
}

export const DashboardPlatformListField = ({
    attributes,
    listeners,
    setNodeRef,
    index,
    platformsOptions,
    onRemove,
    style,
    isDragging = false,
    isDraggingDisabled = true,
}: DashboardPlatformListFieldProps) => {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const platforms = useWatch({ control, name: 'platforms' })
    const fieldPlatform = useWatch({ control, name: `platforms.${index}` })

    const { isSubmitting } = formState

    // We're removing options that are already selected
    // Except the one that might be selected by the field
    // so select can work properly
    const filteredOptions = useMemo(() => {
        return platformsOptions.filter((option) => {
            if (option.name === fieldPlatform.name) {
                return true
            }

            return platforms.some((platform) => platform.name === option.name) === false
        })
    }, [fieldPlatform.name, platforms, platformsOptions])

    const handleRemove = useCallback(() => {
        onRemove(index)
    }, [index, onRemove])

    return (
        <Paper style={style} className="z-10 gap-3" ref={setNodeRef}>
            <div className="flex items-center justify-between text-grey-500">
                <div className="flex items-center gap-2">
                    <button
                        {...attributes}
                        {...listeners}
                        type="button"
                        className={cn(
                            'h-3 w-3 cursor-grab transition-transform hover:scale-150 focus:outline-none',
                            {
                                'cursor-grabbing': isDragging,
                                'cursor-default': isDraggingDisabled,
                                hidden: platforms.length <= 1,
                            }
                        )}
                    >
                        <DragHandle />
                    </button>
                    <span className="text-[16px] font-bold leading-[150%]">{`Link #${index + 1}`}</span>
                </div>

                <Button disabled={isSubmitting} type="button" onClick={handleRemove} variant="text">
                    Remove
                </Button>
            </div>

            {/* Don't really know why, but we need to put these components in separate file
            otherwise react hook form set value to null when submitting  */}
            <DashboardPlatformListFieldSelect
                filteredOptions={filteredOptions}
                platformsOptions={platformsOptions}
                index={index}
            />

            <DashboardPlatformListfieldUrl index={index} />
        </Paper>
    )
}
