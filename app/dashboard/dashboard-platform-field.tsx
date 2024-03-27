import { Paper } from '@/components/ui/paper'
import { Controller, useFormContext } from 'react-hook-form'
import { DashboardFormValues, DashboardPlatformOption } from './dashboard-schemas'

type DashboardPlatformFieldProps = {
    platforms: DashboardPlatformOption[]
    index: number
}

export const DashboardPlatformField = ({ index, platforms }: DashboardPlatformFieldProps) => {
    const { control } = useFormContext<DashboardFormValues>()

    return (
        <Paper>
            <Controller
                render={({ field }) => <input {...field} />}
                name={`platforms.${index}.label`}
                control={control}
            />
        </Paper>
    )
}
