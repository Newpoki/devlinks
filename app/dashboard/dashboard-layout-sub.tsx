'use client'

import { ControlledForm } from '@/components/controlled/controlled-form'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from './dashboard-header'
import { Session } from 'next-auth'
import { Profile, ProfilePlatform } from '@prisma/client'
import { DashboardFormValues, DashboardPlatformOption } from './dashboard-schemas'
import { updateDashboard } from './dashboard-actions'
import { Card } from '@/components/ui/card'
import { DashboardFooter } from './dashboard-footer'
import { DashboardDraftPreview } from './dashboard-draft-preview'
import { cn } from '@/lib/utils'

type DashboardLayoutSubProps = {
    children: React.ReactNode
    session: Session
    profile: Profile
    platforms: Array<DashboardPlatformOption>
    profilePlatforms: Array<ProfilePlatform>
}

export const DashboardLayoutSub = ({
    children,
    profile,
    session,
    platforms,
    profilePlatforms,
}: DashboardLayoutSubProps) => {
    const formContext = useForm<DashboardFormValues>({
        defaultValues: {
            user: {
                firstName: profile.firstName ?? '',
                lastName: profile.lastName ?? '',
                email: profile.email ?? '',
                // Replacing to get better image quality
                pictureUrl: session.user.image?.replace('=s96-c', '=s384-c') ?? '',
                id: profile.userId,
            },
            platforms: profilePlatforms,
            // Having platformsOptions here is subOptimal, but didnt fay a better way to pass the available options
            platformsOptions: platforms,
        },
    })

    const handleSubmit = useCallback(async (formValues: DashboardFormValues) => {
        await updateDashboard(formValues)
    }, [])

    return (
        <ControlledForm onSubmit={handleSubmit} formContext={formContext}>
            <div className="flex min-h-[100dvh] flex-col gap-4 bg-grey-100 md:gap-6 md:p-6">
                <DashboardHeader />

                <main
                    className={cn(
                        'flex flex-1 flex-col p-4 pt-0 md:p-0 lg:grid lg:grid-cols-[38fr_62fr] lg:gap-6'
                    )}
                >
                    <DashboardDraftPreview />

                    <Card className="flex flex-1 flex-col">
                        {children}

                        <DashboardFooter />
                    </Card>
                </main>
            </div>
        </ControlledForm>
    )
}
