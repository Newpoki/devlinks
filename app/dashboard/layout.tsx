import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardLayoutSub } from './dashboard-layout-sub'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'
import { DashboardPlatformOption } from './dashboard-schemas'

type DashboardLayoutProps = {
    children: React.ReactNode
}

const fetchUserProfile = async (session: Session): Promise<Profile> => {
    const user = await prisma.profile.findUnique({
        where: {
            userId: session.user.id,
        },
    })

    if (user != null) {
        return user
    }

    return await prisma.profile.create({
        data: {
            email: session.user.email,
            userId: session.user.id,
            firstName: session.user.name,
        },
    })
}

const fetchAvailablePlatforms = async (): Promise<DashboardPlatformOption[]> => {
    const platforms = await prisma.platform.findMany({
        select: {
            name: true,
            label: true,
            id: true,
        },
    })

    return platforms
}

// TODO: Delete me
// const add = async () => {
//     const user = await prisma.platform.createMany({
//         data: [
//             {
//                 label: 'GitHub',
//                 name: 'GITHUB',
//             },
//             {
//                 label: 'Frontend Mentor',
//                 name: 'FRONTEND_MENTOR',
//             },
//             {
//                 label: 'Twitter',
//                 name: 'TWITTER',
//             },
//             {
//                 label: 'LinkedIn',
//                 name: 'LINKEDIN',
//             },
//             {
//                 label: 'YouTube',
//                 name: 'YOUTUBE',
//             },
//             {
//                 label: 'Facebook',
//                 name: 'FACEBOOK',
//             },
//             {
//                 label: 'Twitch',
//                 name: 'TWITCH',
//             },
//             {
//                 label: 'Dev.to',
//                 name: 'DEVTO',
//             },
//             {
//                 label: 'Codewars',
//                 name: 'CODEWARS',
//             },
//             {
//                 label: 'Codepen',
//                 name: 'CODEPEN',
//             },
//             {
//                 label: 'freeCodeCamp',
//                 name: 'FREECODECAMP',
//             },
//             {
//                 label: 'GitLab',
//                 name: 'GITLAB',
//             },
//             {
//                 label: 'Hashnode',
//                 name: 'HASNODE',
//             },
//             {
//                 label: 'Stack Overflow',
//                 name: 'STACK_OVERFLOW',
//             },
//         ],
//     })
// }

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    const userProfile = await fetchUserProfile(session)
    const platforms = await fetchAvailablePlatforms()

    return (
        <DashboardLayoutSub profile={userProfile} session={session} platforms={platforms}>
            {children}
        </DashboardLayoutSub>
    )
}
