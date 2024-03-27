'use client'

import { ControlledForm } from '@/components/controlled/controlled-form'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { DashboardHeader } from './dashboard-header'
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'

type DashboardLayoutSubProps = {
    children: React.ReactNode
    session: Session
    profile: Profile
}

export const DashboardLayoutSub = ({ children, profile, session }: DashboardLayoutSubProps) => {
    const formContext = useForm({
        defaultValues: {
            user: {
                firstName: profile.firstName ?? '',
                lastName: profile.lastName ?? '',
                email: profile.email ?? '',
                // Replacing to get better image quality
                pictureUrl: session.user.image?.replace('=s96-c', '=s384-c') ?? '',
            },
        },
    })

    const handleSubmit = useCallback(() => {
        console.log('submit')
    }, [])

    return (
        <ControlledForm onSubmit={handleSubmit} formContext={formContext}>
            <div className="flex min-h-[100dvh] flex-col gap-4 bg-grey-100 md:gap-6 md:p-6">
                <DashboardHeader />

                <main className="flex flex-1 flex-col p-4 pt-0 md:p-0">{children}</main>
            </div>
        </ControlledForm>
    )
}
