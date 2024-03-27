'use client'

import { ControlledForm } from '@/components/controlled/controlled-form'
import { DashboardHeader } from './dashboard-header'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const formContext = useForm({
        defaultValues: {
            user: {
                firstName: '',
                lastName: '',
                email: '',
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
