'use server'

import prisma from '@/lib/prisma'
import { DashboardFormValues } from './dashboard-schemas'

export const updateDashboard = async (formValues: DashboardFormValues) => {
    try {
        await prisma.profile.update({
            where: {
                userId: formValues.user.id,
            },
            data: {
                firstName: formValues.user.firstName,
                email: formValues.user.email,
                lastName: formValues.user.lastName,
            },
        })
    } catch (error) {
        console.log(error)
    }
}
