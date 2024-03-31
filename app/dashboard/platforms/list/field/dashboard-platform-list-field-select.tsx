import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { DashboardFormValues, DashboardPlatformOption } from '@/app/dashboard/dashboard-schemas'
import { DASHBOARD_PLATFORMS_MAPPING } from '@/app/dashboard/dashboard-constants'

type DashboardPlatformListFieldSelectProps = {
    platformsOptions: DashboardPlatformOption[]
    filteredOptions: DashboardPlatformOption[]
    index: number
}

export const DashboardPlatformListFieldSelect = ({
    platformsOptions,
    filteredOptions,
    index,
}: DashboardPlatformListFieldSelectProps) => {
    const { control, formState, setValue } = useFormContext<DashboardFormValues>()

    const { isSubmitting } = formState

    return (
        <FormField
            control={control}
            disabled={isSubmitting}
            name={`platforms.${index}.name`}
            render={({ field: { ref, onChange, value, ...othersField } }) => {
                const selectedOptionMapping = DASHBOARD_PLATFORMS_MAPPING[value]

                const handleChangePlatforms = (value: string) => {
                    const selectedPlatform = platformsOptions.find(
                        (option) => option.name === value
                    )

                    if (selectedPlatform == null) {
                        return
                    }

                    // As select is only chaging the url, we must manually update the id
                    // Here should all subfield of `platforms.{0}` but updated
                    setValue(`platforms.${index}.platformId`, selectedPlatform.id)
                    onChange(value)
                }

                return (
                    <FormItem className="w-full">
                        <Label>Platform</Label>
                        <FormControl>
                            <Select
                                {...othersField}
                                value={value}
                                onValueChange={handleChangePlatforms}
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
                                            <div className="flex flex-col gap-3" key={option.id}>
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
    )
}
