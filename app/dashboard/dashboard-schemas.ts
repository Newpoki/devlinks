import { z } from 'zod'
import { DASHBOARD_PLATFORMS_URLS } from './dashboard-constants'

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
        z
            // This would be better using regexp for this
            // but I think this is a bit too much, and I don't exactly know which chars are allowed
            .object({
                name: z.literal('GITHUB'),
                url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.GITHUB),
                id: z.string(),
            })

            .or(
                z.object({
                    name: z.literal('FRONTEND_MENTOR'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.FRONTEND_MENTOR),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('TWITTER'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.TWITTER),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('LINKEDIN'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.LINKEDIN),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('YOUTUBE'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.YOUTUBE),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('FACEBOOK'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.FACEBOOK),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('TWITCH'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.TWITCH),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('DEVTO'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.DEVTO),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('CODEWARS'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.CODEWARS),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('CODEPEN'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.CODEPEN),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('FREECODECAMP'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.FREECODECAMP),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('GITLAB'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.GITLAB),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('HASNODE'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.HASNODE),
                    id: z.string(),
                })
            )
            .or(
                z.object({
                    name: z.literal('STACK_OVERFLOW'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_URLS.STACK_OVERFLOW),
                    id: z.string(),
                })
            )
    ),
})

export type DashboardFormValues = z.infer<typeof dashboardFormValuesSchema>

export type DashboardPlatformOption = z.infer<typeof dashboardPlatformOption>
