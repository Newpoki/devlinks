import { z } from 'zod'
import { DASHBOARD_PLATFORMS_MAPPING } from './dashboard-constants'

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
    name: platformName,
})

export const dashboardFormValuesSchema = z.object({
    user: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        id: z.string(),
    }),
    platforms: z.array(
        z
            // This would be better using regexp for this
            // but I think this is a bit too much, and I don't exactly know which chars are allowed
            .object({
                platformId: z.string(),
                name: z.literal('GITHUB'),
                url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.GITHUB.urlPattern),
            })

            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('FRONTEND_MENTOR'),
                    url: z
                        .string()
                        .startsWith(DASHBOARD_PLATFORMS_MAPPING.FRONTEND_MENTOR.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('TWITTER'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.TWITTER.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('LINKEDIN'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.LINKEDIN.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('YOUTUBE'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.YOUTUBE.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('FACEBOOK'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.FACEBOOK.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('TWITCH'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.TWITCH.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('DEVTO'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.DEVTO.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('CODEWARS'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.CODEWARS.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('CODEPEN'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.CODEPEN.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('FREECODECAMP'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.FREECODECAMP.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('GITLAB'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.GITLAB.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('HASNODE'),
                    url: z.string().startsWith(DASHBOARD_PLATFORMS_MAPPING.HASNODE.urlPattern),
                })
            )
            .or(
                z.object({
                    platformId: z.string(),
                    name: z.literal('STACK_OVERFLOW'),
                    url: z
                        .string()
                        .startsWith(DASHBOARD_PLATFORMS_MAPPING.STACK_OVERFLOW.urlPattern),
                })
            )
    ),
})

export type DashboardFormValues = z.infer<typeof dashboardFormValuesSchema>

export type DashboardPlatformOption = z.infer<typeof dashboardPlatformOption>
