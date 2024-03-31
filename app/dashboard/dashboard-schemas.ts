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

const urlValidator = (platformName: PlatformName) => {
    const urlPattern = DASHBOARD_PLATFORMS_MAPPING[platformName].urlPattern

    return (
        z
            // This would be better using regexp for this
            // but I think this is a bit too much, and I don't exactly know which chars are allowed
            .object({
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
    platforms: z.array(
        urlValidator('GITHUB')
            .or(urlValidator('FRONTEND_MENTOR'))
            .or(urlValidator('TWITTER'))
            .or(urlValidator('LINKEDIN'))
            .or(urlValidator('YOUTUBE'))
            .or(urlValidator('FACEBOOK'))
            .or(urlValidator('TWITCH'))
            .or(urlValidator('DEVTO'))
            .or(urlValidator('CODEWARS'))
            .or(urlValidator('CODEPEN'))
            .or(urlValidator('FREECODECAMP'))
            .or(urlValidator('GITLAB'))
            .or(urlValidator('HASNODE'))
            .or(urlValidator('STACK_OVERFLOW'))
    ),
})

export type DashboardFormValues = z.infer<typeof dashboardFormValuesSchema>

export type DashboardPlatformOption = z.infer<typeof dashboardPlatformOption>
