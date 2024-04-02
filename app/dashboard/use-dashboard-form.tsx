import { useCallback, useMemo } from 'react'
import { updateUserDashboard } from './dashboard-actions'
import { DashboardFormValues } from './dashboard-schemas'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { SaveColored } from '@/components/icons/colored/save-colored'

type UseDashboardFormProps = {
    formContext: UseFormReturn<DashboardFormValues>
}

export const useDashboardForm = ({ formContext }: UseDashboardFormProps) => {
    const handleDisplayError = useCallback(() => {
        toast.error(
            'An error happened when updating your data. Check Links and Profile Details tabs.'
        )
    }, [])

    const handleSubmit = useCallback(
        async (formValues: DashboardFormValues) => {
            const response = await updateUserDashboard(formValues)

            if (response.ok === false) {
                if (response.type === 'validation') {
                    response.errors.forEach((error) => {
                        formContext.setError(error.path, error)
                    })
                }

                handleDisplayError()

                return
            }

            toast.info('Your changes have been successfully saved!', { icon: <SaveColored /> })
        },
        [formContext, handleDisplayError]
    )

    return useMemo(
        () => ({
            onSubmit: handleSubmit,
            onValidationError: handleDisplayError,
        }),
        [handleDisplayError, handleSubmit]
    )
}
