'use client'

import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useCallback } from 'react'
import { DashboardFormValues } from '../dashboard-schemas'
import { DashboardNoPlatforms } from './dashboard-no-platforms'
import { DashboardPlatformField } from './dashboard-platform-field'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function DashboardPlatforms() {
    const { control } = useFormContext<DashboardFormValues>()

    const platformsOptions = useWatch({ control, name: 'platformsOptions' })

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'platforms', // unique name for your Field Array
        keyName: 'key',
    })

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
            id: firstAvailablePlatforms.id,
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
                    disabled={availablePlatformsToAdd.length === 0}
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
                        <div className="flex flex-col gap-6">
                            {fields.map((field, index) => {
                                return (
                                    <DashboardPlatformField
                                        key={field.key}
                                        index={index}
                                        onRemove={remove}
                                        platformsOptions={platformsOptions}
                                    />
                                )
                            })}
                        </div>
                    </>
                )}
            </CardContent>
        </ScrollArea>
    )
}
