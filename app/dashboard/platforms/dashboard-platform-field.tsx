import { Paper } from '@/components/ui/paper'
import { useFormContext, useWatch } from 'react-hook-form'
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
import { DashboardPlatformFieldIcon } from './dashboard-platform-field-icon'
import { Input } from '@/components/ui/input'
import { DashboardFormValues, DashboardPlatformOption } from '../dashboard-schemas'
import { DASHBOARD_PLATFORMS_MAPPING } from '../dashboard-constants'
import { Button } from '@/components/ui/button'

type DashboardPlatformFieldProps = {
    platformsOptions: DashboardPlatformOption[]
    index: number
    onRemove: (linkIndex: number) => void
}

export const DashboardPlatformField = ({
    index,
    platformsOptions,
    onRemove,
}: DashboardPlatformFieldProps) => {
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
        <Paper className="gap-3">
            <div className="flex items-center justify-between text-grey-500">
                <div className="flex items-center gap-2">
                    <DragHandle />
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
                                        <DashboardPlatformFieldIcon name={fieldPlatform.name} />

                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent ref={ref}>
                                        {filteredOptions.map((option, index) => {
                                            const isLast = index === filteredOptions.length - 1

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
                                                        {
                                                            DASHBOARD_PLATFORMS_MAPPING[option.name]
                                                                .label
                                                        }
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
