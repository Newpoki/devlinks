'use client'

import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback, useContext } from 'react'
import { DashboardFormValues } from '../dashboard-schemas'
import { DashboardNoPlatforms } from './dashboard-no-platforms'
import { DashboardPlatformField } from './dashboard-platform-field'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DashboardContext } from '../dashboard-context'

export default function DashboardPlatforms() {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const { platformsOptions } = useContext(DashboardContext)

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'platforms', // unique name for your Field Array
        keyName: 'key',
    })

    const { isSubmitting } = formState

    // We don't want to add many times the same platform, so the new added platform
    // must not already be there
    const availablePlatformsToAdd = platformsOptions.filter(
        (option) => !fields.some((field) => field.name === option.name)
    )

    const handleAddNewPlatform = useCallback(() => {
        const firstAvailablePlatforms = availablePlatformsToAdd[0]

        if (firstAvailablePlatforms == null) {
            return
        }

        append({
            name: firstAvailablePlatforms.name,
            url: '',
            platformId: firstAvailablePlatforms.id,
        })
    }, [append, availablePlatformsToAdd])

    return (
        <ScrollArea>
            <CardHeader>
                <CardTitle>Customize your links</CardTitle>
                <CardDescription>
                    Add/edit/remove links beloww and then share all your profiles with the world!
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-6 overflow-hidden">
                <Button
                    disabled={availablePlatformsToAdd.length === 0 || isSubmitting}
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
                        <ul className="flex flex-col gap-6">
                            {fields.map((field, index) => {
                                return (
                                    <li key={field.key}>
                                        <DashboardPlatformField
                                            index={index}
                                            onRemove={remove}
                                            platformsOptions={platformsOptions}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}
            </CardContent>
        </ScrollArea>
    )
}
