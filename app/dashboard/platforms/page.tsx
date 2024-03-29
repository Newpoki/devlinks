'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useCallback } from 'react'
import { DashboardFormValues } from '../dashboard-schemas'
import { DashboardNoPlatforms } from './dashboard-no-platforms'
import { DashboardPlatformField } from './dashboard-platform-field'

export default function DashboardPlatforms() {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const availablePlatforms = useWatch({ control, name: 'platformsOptions' })

    const { isSubmitting } = formState

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'platforms', // unique name for your Field Array
        keyName: 'key',
    })

    const handleAddNewPlatform = useCallback(() => {
        const firstAvailablePlatforms = availablePlatforms[0]

        if (firstAvailablePlatforms == null) {
            return
        }

        append({ name: firstAvailablePlatforms.name, url: '', id: firstAvailablePlatforms.id })
    }, [append, availablePlatforms])

    return (
        <>
            <CardHeader>
                <CardTitle>Customize your links</CardTitle>
                <CardDescription>
                    Add/edit/remove links beloww and then share all your profiles with the world!
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-6">
                <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={handleAddNewPlatform}
                >
                    + Add new link
                </Button>

                {fields.length === 0 ? (
                    <DashboardNoPlatforms />
                ) : (
                    <>
                        {fields.map((field, index) => {
                            return (
                                <DashboardPlatformField
                                    key={field.key}
                                    index={index}
                                    onRemove={remove}
                                    platforms={availablePlatforms}
                                />
                            )
                        })}
                    </>
                )}
            </CardContent>
        </>
    )
}
