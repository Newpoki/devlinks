import { z } from 'zod'
import { DASHBOARD_PLATFORMS_MAPPING } from './dashboard-constants'
import { PlatformName } from '@prisma/client'

const platformName = z.enum([
    'GITHUB',
    'FRONTEND_MENTOR',
    'TWITTER',
    'LINKEDIN',
    'YOUTUBE',
    'FACEBOOK',
    'TWITCH',
    'DEVTO',
    'CODEWARS',
    'CODEPEN',
    'FREECODECAMP',
    'GITLAB',
    'HASNODE',
    'STACK_OVERFLOW',
])

const REQUIRED_FIELD_ERROR_MESSAGE = "Can't be empty"

const INVALID_PLATFORM_URL_ERROR_MESSAGE_PREFIX = 'URL must start with'

const dashboardPlatformOption = z.object({
    id: z.string(),
    name: platformName,
})

const platformValidator = (platformName: PlatformName) => {
    const urlPattern = DASHBOARD_PLATFORMS_MAPPING[platformName].urlPattern

    return (
        z
            // This would be better using regexp for this
            // but I think this is a bit too much, and I don't exactly know which chars are allowed
            .object({
                id: z.string().optional(),
                platformId: z.string(),
                name: z.literal(platformName),
                url: z
                    .string()
                    .min(1, REQUIRED_FIELD_ERROR_MESSAGE)
                    .startsWith(
                        urlPattern,
                        `${INVALID_PLATFORM_URL_ERROR_MESSAGE_PREFIX}: ${urlPattern}`
                    ),
            })
    )
}

export const dashboardFormValuesSchema = z.object({
    user: z.object({
        firstName: z.string().min(1, REQUIRED_FIELD_ERROR_MESSAGE),
        lastName: z.string().min(1, REQUIRED_FIELD_ERROR_MESSAGE),
        email: z.string().min(1, REQUIRED_FIELD_ERROR_MESSAGE).email('Must be a valid email'),
        id: z.string(),
    }),
    platforms: z
        .array(
            platformValidator('GITHUB')
                .or(platformValidator('FRONTEND_MENTOR'))
                .or(platformValidator('TWITTER'))
                .or(platformValidator('LINKEDIN'))
                .or(platformValidator('YOUTUBE'))
                .or(platformValidator('FACEBOOK'))
                .or(platformValidator('TWITCH'))
                .or(platformValidator('DEVTO'))
                .or(platformValidator('CODEWARS'))
                .or(platformValidator('CODEPEN'))
                .or(platformValidator('FREECODECAMP'))
                .or(platformValidator('GITLAB'))
                .or(platformValidator('HASNODE'))
                .or(platformValidator('STACK_OVERFLOW'))
        )
        .refine(
            (entries) => {
                // Set cant have duplicated elements. So if the length are different, it means there are some duplicated items
                const platformsSet = new Set(entries.map((entry) => entry.platformId))

                return platformsSet.size !== entries.length
            },
            {
                message: "You can't have duplicated platforms",
            }
        ),
})

export type DashboardFormValues = z.infer<typeof dashboardFormValuesSchema>

export type DashboardPlatformOption = z.infer<typeof dashboardPlatformOption>
