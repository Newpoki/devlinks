'use server'

import prisma from '@/lib/prisma'
import { DashboardFormValues } from './dashboard-schemas'

export const updateDashboard = async (formValues: DashboardFormValues) => {
    try {
        const userProfile = await prisma.profile.update({
            where: {
                userId: formValues.user.id,
            },
            data: {
                firstName: formValues.user.firstName,
                email: formValues.user.email,
                lastName: formValues.user.lastName,
            },
        })

        await prisma.profilePlatform.deleteMany({
            where: {
                profileId: userProfile.id,
            },
        })

        await prisma.profilePlatform.createMany({
            data: formValues.platforms.map((platform) => {
                return {
                    platformId: platform.platformId,
                    profileId: userProfile.id,
                    url: platform.url,
                    name: platform.name,
                }
            }),
        })
    } catch (error) {
        console.log(error)
    }
}
