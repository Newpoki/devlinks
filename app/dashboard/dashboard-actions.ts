'use server'

import { FieldPath } from 'react-hook-form'
import { DashboardFormValues, dashboardFormValuesSchema } from './dashboard-schemas'
import uniqby from 'lodash.uniqby'
import prisma from '@/lib/prisma'

export const updateUserDashboard = async (formValues: DashboardFormValues) => {
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

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parsedFormValues.data.user.id,
            },
            data: {
                firstName: parsedFormValues.data.user.firstName,
                email: parsedFormValues.data.user.email,
                lastName: parsedFormValues.data.user.lastName,
            },
        })

        await prisma.userPlatform.deleteMany({
            where: {
                userId: updatedUser.id,
            },
        })

        await prisma.userPlatform.createMany({
            data: parsedFormValues.data.platforms.map((platform, index) => {
                return {
                    platformId: platform.platformId,
                    userId: updatedUser.id,
                    url: platform.url,
                    name: platform.name,
                    order: index,
                }
            }),
        })

        return { ok: true, type: 'success' } as const
    } catch (error) {
        return { ok: false, type: 'unknown' } as const
    }
}
