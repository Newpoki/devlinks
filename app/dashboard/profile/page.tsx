'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Paper } from '@/components/ui/paper'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { DashboardFormValues } from '../dashboard-schemas'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useContext } from 'react'
import { DashboardContext } from '../dashboard-context'

export default function DashboardProfilePage() {
    const { control, formState } = useFormContext<DashboardFormValues>()

    const { profilePictureUrl } = useContext(DashboardContext)

    const { isSubmitting } = formState

    return (
        <ScrollArea>
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>
                    Add your details to create a personal touch to your profile.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
                <Paper className="text-grey-500 md:flex-row md:items-center">
                    <h4 className="mb-4 flex-shrink-0 text-b-m md:w-64">Profile picture</h4>

                    <div className="mb-6 flex-shrink-0 md:mr-6">
                        {profilePictureUrl != null ? (
                            <Image
                                src={profilePictureUrl.replace('=s96-c', '=s384-c')}
                                alt="User profile picture"
                                width={193}
                                height={193}
                                className="rounded-xl"
                            />
                        ) : (
                            <div className="h-[193px] w-[193px] rounded-xl bg-white" />
                        )}
                    </div>

                    <p className="text-b-s">
                        The image is taken from your Google account so you don&apos;t have to change
                        it.
                    </p>
                </Paper>

                <Paper className="gap-3 md:grid">
                    <FormField
                        control={control}
                        disabled={isSubmitting}
                        name="user.firstName"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className="w-full md:grid md:grid-cols-[256px_auto] md:items-center">
                                    <FormLabel className="md:text-b-m md:text-grey-500">
                                        First name*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
                                            placeholder="Jason"
                                            error={fieldState.error?.message}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={control}
                        name="user.lastName"
                        disabled={isSubmitting}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className="w-full md:grid md:grid-cols-[256px_auto] md:items-center">
                                    <FormLabel className="md:text-b-m md:text-grey-500">
                                        Last name*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
                                            placeholder="Savelli"
                                            error={fieldState.error?.message}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={control}
                        name="user.email"
                        disabled={isSubmitting}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className="w-full md:grid md:grid-cols-[256px_auto] md:items-center">
                                    <FormLabel className="md:text-b-m md:text-grey-500">
                                        Last name*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
                                            placeholder="email@gmail.com"
                                            error={fieldState.error?.message}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />
                </Paper>
            </CardContent>
        </ScrollArea>
    )
}
