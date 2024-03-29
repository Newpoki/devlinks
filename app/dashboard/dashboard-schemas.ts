import { z } from 'zod'

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

const dashboardPlatformOption = z.object({
    id: z.string(),
    label: z.string(),
    name: platformName,
})

export const dashboardFormValuesSchema = z.object({
    user: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        pictureUrl: z.string(),
        id: z.string(),
    }),
    platformsOptions: z.array(dashboardPlatformOption),
    platforms: z.array(
        z.object({
            name: platformName,
            url: z.string(),
        })
    ),
})

export type DashboardFormValues = z.infer<typeof dashboardFormValuesSchema>

export type DashboardPlatformOption = z.infer<typeof dashboardPlatformOption>
