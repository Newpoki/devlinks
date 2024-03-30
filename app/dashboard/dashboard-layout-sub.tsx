'use client'

import { ControlledForm } from '@/components/controlled/controlled-form'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from './dashboard-header'
import { Session } from 'next-auth'
import { Profile, ProfilePlatform } from '@prisma/client'
import {
    DashboardFormValues,
    dashboardFormValuesSchema,
    DashboardPlatformOption,
} from './dashboard-schemas'
import { updateDashboard } from './dashboard-actions'
import { Card } from '@/components/ui/card'
import { DashboardFooter } from './dashboard-footer'
import { DashboardDraftPreview } from './dashboard-draft-preview'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { SaveColored } from '@/components/icons/colored/save-colored'
import { zodResolver } from '@hookform/resolvers/zod'
import { DashboardContextData, DashboardContextProvider } from './dashboard-context'

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
                id: profile.userId,
            },
            platforms: profilePlatforms,
        },
        resolver: zodResolver(dashboardFormValuesSchema),
    })

    const dashboardContextData = useMemo<DashboardContextData>(() => {
        return {
            // Replacing `s` parameter to get better image quality
            profilePictureUrl: session.user.image?.replace('=s96-c', '=s384-c') ?? null,
            platformsOptions: platforms,
        }
    }, [platforms, session.user.image])

    const handleSubmit = useCallback(async (formValues: DashboardFormValues) => {
        try {
            console.log({ formValues })
            await updateDashboard(formValues)

            toast.info('Your changes have been successfully saved!', { icon: <SaveColored /> })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <DashboardContextProvider value={dashboardContextData}>
            <ControlledForm onSubmit={handleSubmit} formContext={formContext}>
                <div className="flex h-[100dvh] flex-col gap-4 bg-grey-100 md:gap-6 md:p-6">
                    <DashboardHeader profile={profile} />

                    <main
                        className={cn(
                            'flex flex-1 flex-col overflow-hidden p-4 pt-0 md:p-0 lg:grid lg:grid-cols-[38fr_62fr] lg:gap-6'
                        )}
                    >
                        <DashboardDraftPreview />

                        <Card className="flex flex-1 flex-col overflow-hidden">
                            {children}

                            <DashboardFooter />
                        </Card>
                    </main>
                </div>
            </ControlledForm>
        </DashboardContextProvider>
    )
}
