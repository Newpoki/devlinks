import { FieldArrayWithId } from 'react-hook-form'
import { DashboardPlatformField } from './dashboard-platform-field'
import { DashboardFormValues, DashboardPlatformOption } from './dashboard-schemas'

type DashboardPlatformsProps = {
    platforms: DashboardPlatformOption[]
    fields: FieldArrayWithId<DashboardFormValues, 'platforms', 'key'>[]
    onRemove: (linkIndex: number) => void
}

export const DashboardPlatforms = ({ platforms, fields, onRemove }: DashboardPlatformsProps) => {
    return (
        <>
            {fields.map((field, index) => {
                return (
                    <DashboardPlatformField
                        key={field.key}
                        index={index}
                        platforms={platforms}
                        onRemove={onRemove}
                    />
                )
            })}
        </>
    )
}
