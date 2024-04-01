'use server'

import prisma from '@/lib/prisma'
import { DashboardFormValues } from './dashboard-schemas'
import { revalidatePath } from 'next/cache'

export const updateDashboard = async (formValues: DashboardFormValues) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: formValues.user.id,
            },
            data: {
                firstName: formValues.user.firstName,
                email: formValues.user.email,
                lastName: formValues.user.lastName,
            },
        })

        await prisma.profilePlatform.deleteMany({
            where: {
                userId: updatedUser.id,
            },
        })

        await prisma.profilePlatform.createMany({
            data: formValues.platforms.map((platform, index) => {
                return {
                    platformId: platform.platformId,
                    userId: updatedUser.id,
                    url: platform.url,
                    name: platform.name,
                    order: index,
                }
            }),
        })

        // Remove cache from /dashboard url, otherwise we could have some cache when going back from preview url
        revalidatePath('/dashboard')
    } catch (error) {
        console.log(error)
    }
}
