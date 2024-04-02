import { DASHBOARD_PLATFORMS_MAPPING } from '@/app/dashboard/dashboard-constants'
import { DashboardFormValues } from '@/app/dashboard/dashboard-schemas'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext, useWatch } from 'react-hook-form'

type DashboardPlatformListfieldUrlProps = {
    index: number
}

export const DashboardPlatformListfieldUrl = ({ index }: DashboardPlatformListfieldUrlProps) => {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const { isSubmitting } = formState

    const name = useWatch({ control, name: `platforms.${index}.name` })

    return (
        <FormField
            control={control}
            name={`platforms.${index}.url`}
            disabled={isSubmitting}
            render={({ field, fieldState, formState }) => {
                const hasPlatformsRootErrors = formState.errors.platforms?.root != null

                return (
                    <FormItem className="w-full">
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                value={field.value ?? ''}
                                placeholder={DASHBOARD_PLATFORMS_MAPPING[name].urlPattern}
                                errorMessage={fieldState.error?.message}
                                hasError={
                                    fieldState.error?.message != null || hasPlatformsRootErrors
                                }
                            />
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}
