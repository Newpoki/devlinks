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
import { DashboardPlatforms } from './dashboard-platforms'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useCallback } from 'react'
import { DashboardNoLinks } from './dashboard-no-links'
import { DashboardFormValues } from './dashboard-schemas'

export default function DashboardPage() {
    const { control } = useFormContext<DashboardFormValues>()

    const availablePlatforms = useWatch({ control, name: 'platformsOptions' })

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'platforms', // unique name for your Field Array
        keyName: 'key',
    })

    const handleAddNewPlatform = useCallback(() => {
        append({ label: '', name: 'GITHUB', url: '' })
    }, [append])

    return (
        <Card className="flex flex-1 flex-col">
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
                    <DashboardNoLinks />
                ) : (
                    <DashboardPlatforms
                        fields={fields}
                        platforms={availablePlatforms}
                        onRemove={remove}
                    />
                )}
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full md:w-auto"
                    // TODO: disabled only if link list.length === 0
                    disabled
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
