import { Paper } from '@/components/ui/paper'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { DragHandle } from '@/components/icons/drag-handle'
import { useCallback, useMemo } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DashboardFormValues, DashboardPlatformOption } from '../../dashboard-schemas'
import { DASHBOARD_PLATFORMS_MAPPING } from '../../dashboard-constants'
import { Button } from '@/components/ui/button'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { cn } from '@/lib/utils'

type DraggedElementProps = {
    attributes?: DraggableAttributes
    listeners?: SyntheticListenerMap
    setNodeRef?: (node: HTMLElement | null) => void
    isDragging?: boolean
    style?: React.CSSProperties
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
}: DashboardPlatformListFieldProps) => {
    const { control, formState, setValue } = useFormContext<DashboardFormValues>()

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
                        className={cn('h-3 w-3 cursor-grab', { 'cursor-grabbing': isDragging })}
                    >
                        <DragHandle />
                    </button>
                    <span className="text-[16px] font-bold leading-[150%]">{`Link #${index + 1}`}</span>
                </div>

                <Button disabled={isSubmitting} type="button" onClick={handleRemove} variant="text">
                    Remove
                </Button>
            </div>

            <FormField
                control={control}
                disabled={isSubmitting}
                name={`platforms.${index}.name`}
                render={({ field: { ref, onChange, ...othersField } }) => {
                    const selectedOptionMapping = DASHBOARD_PLATFORMS_MAPPING[fieldPlatform.name]

                    const handleChangePlatforms =
                        (onChange: (value: string) => void) => (value: string) => {
                            const selectedPlatform = platformsOptions.find(
                                (option) => option.name === value
                            )

                            if (selectedPlatform == null) {
                                return
                            }

                            // As select is only chaging the url, we must manually update the id
                            // Here should all subfield of `platforms.{index}` but updated
                            setValue(`platforms.${index}.platformId`, selectedPlatform.id)
                            onChange(value)
                        }

                    return (
                        <FormItem className="w-full">
                            <Label>Platform</Label>
                            <FormControl>
                                <Select
                                    {...othersField}
                                    onValueChange={handleChangePlatforms(onChange)}
                                >
                                    <SelectTrigger className="flex w-full">
                                        <selectedOptionMapping.icon />

                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent ref={ref}>
                                        {filteredOptions.map((option, index) => {
                                            const isLast = index === filteredOptions.length - 1

                                            const optionMapping =
                                                DASHBOARD_PLATFORMS_MAPPING[option.name]

                                            return (
                                                <div
                                                    className="flex flex-col gap-3"
                                                    key={option.id}
                                                >
                                                    <SelectItem
                                                        value={option.name}
                                                        icon={<optionMapping.icon />}
                                                    >
                                                        {optionMapping.label}
                                                    </SelectItem>

                                                    {!isLast && <SelectSeparator />}
                                                </div>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )
                }}
            />

            <FormField
                control={control}
                name={`platforms.${index}.url`}
                disabled={isSubmitting}
                render={({ field, fieldState }) => {
                    return (
                        <FormItem className="w-full">
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value ?? ''}
                                    placeholder={
                                        DASHBOARD_PLATFORMS_MAPPING[fieldPlatform.name].urlPattern
                                    }
                                    error={fieldState.error?.message}
                                />
                            </FormControl>
                        </FormItem>
                    )
                }}
            />
        </Paper>
    )
}
