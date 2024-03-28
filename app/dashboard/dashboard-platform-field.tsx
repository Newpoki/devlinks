import { Paper } from '@/components/ui/paper'
import { useFormContext } from 'react-hook-form'
import { DashboardFormValues, DashboardPlatformOption } from './dashboard-schemas'
import { DragHandle } from '@/components/icons/drag-handle'
import { useCallback } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ControlledInput } from '@/components/controlled/controlled-input'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { DashboardPlatformFieldIcon } from './dashboard-platform-field-icon'

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
        <Paper className="gap-3">
            <div className="flex items-center justify-between text-grey-500">
                <div className="flex items-center gap-2">
                    <DragHandle />
                    <span className="text-[16px] font-bold leading-[150%]">{`Link #${index + 1}`}</span>
                </div>

                <button className="text-b-m" type="button" onClick={handleRemove}>
                    Remove
                </button>
            </div>

            <FormField
                control={control}
                name={`platforms.${index}.name`}
                render={({ field: { ref, onChange, ...othersField } }) => {
                    const selectedOption = platforms.find(
                        (platform) => platform.name === othersField.value
                    )

                    return (
                        <FormItem className="w-full">
                            <Label>Platform</Label>
                            <FormControl>
                                <Select {...othersField} onValueChange={onChange}>
                                    <SelectTrigger className="flex w-full">
                                        {selectedOption != null && (
                                            <DashboardPlatformFieldIcon
                                                name={selectedOption.name}
                                            />
                                        )}

                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent ref={ref}>
                                        {platforms.map((option, index) => {
                                            const isLast = index === platforms.length - 1

                                            return (
                                                <div
                                                    className="flex flex-col gap-3"
                                                    key={option.id}
                                                >
                                                    <SelectItem
                                                        value={option.name}
                                                        icon={
                                                            <DashboardPlatformFieldIcon
                                                                name={option.name}
                                                            />
                                                        }
                                                    >
                                                        {option.label}
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

            <ControlledInput
                name={`platforms.${index}.url`}
                placeholder="https://google.fr"
                label="Link"
            />
        </Paper>
    )
}
