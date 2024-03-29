import { useFormContext, useWatch } from 'react-hook-form'
import { DashboardFormValues } from './dashboard-schemas'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const DashboardFooter = () => {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const { isSubmitting } = formState

    const platforms = useWatch({ control, name: 'platforms' })

    return (
        <CardFooter>
            <Button className="w-full md:w-auto" disabled={isSubmitting || platforms.length === 0}>
                Save
            </Button>
        </CardFooter>
    )
}
