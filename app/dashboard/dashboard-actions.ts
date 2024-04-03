'use server'

import { FieldPath } from 'react-hook-form'
import { DashboardFormValues, dashboardFormValuesSchema } from './dashboard-schemas'
import uniqby from 'lodash.uniqby'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export const updateUserDashboard = async (formValues: DashboardFormValues) => {
    const session = await getServerSession(authConfig)

    const parsedFormValues = dashboardFormValuesSchema.safeParse(formValues)

    if (parsedFormValues.success === false) {
        const errorsWithCorrectPath = parsedFormValues.error.errors.map((error) => {
            return {
                ...error,
                path: error.path.join('.') as FieldPath<DashboardFormValues>,
            }
        })

        const filteredErrors = uniqby(errorsWithCorrectPath, (error) => error.path)

        return { ok: false, errors: filteredErrors, type: 'validation' } as const
    }

    const { user } = parsedFormValues.data

    // Logged user should be the one that is updated
    if (session == null || session.user.id !== user.id) {
        return { ok: false, type: 'unknown' } as const
    }

    const updateUserPromise = prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            firstName: user.firstName,
            email: user.email,
            lastName: user.lastName,
        },
    })

    const deleteUserPlatformsPromise = prisma.userPlatform.deleteMany({
        where: {
            userId: user.id,
        },
    })

    const createdUserPlatformsPromises = prisma.userPlatform.createMany({
        data: parsedFormValues.data.platforms.map((platform, index) => {
            return {
                platformId: platform.platformId,
                userId: user.id,
                url: platform.url,
                name: platform.name,
                order: index,
            }
        }),
    })

    return Promise.all([
        updateUserPromise,
        deleteUserPlatformsPromise,
        createdUserPlatformsPromises,
    ])
        .then(() => {
            revalidatePath('/dashboard')

            return { ok: true, type: 'success' } as const
        })
        .catch(() => {
            return { ok: false, type: 'unknown' } as const
        })
}
