import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardLayoutSub } from './dashboard-layout-sub'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { ProfilePlatform, User } from '@prisma/client'
import { DashboardPlatformOption } from './dashboard-schemas'

type DashboardLayoutProps = {
    children: React.ReactNode
}

const fetchUser = async (session: Session): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (user == null) {
        // TODO: handle error
        throw new Error('Profile not found')
    }

    return user
}

const fetchAvailablePlatforms = async (): Promise<DashboardPlatformOption[]> => {
    const platforms = await prisma.platform.findMany({
        select: {
            name: true,
            id: true,
        },
    })

    return platforms
}

const fetchUserPlatforms = async (userId: User['id']): Promise<ProfilePlatform[]> => {
    const userProfilePlatforms = await prisma.profilePlatform.findMany({
        where: {
            userId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    return userProfilePlatforms
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    const user = await fetchUser(session)
    const platforms = await fetchAvailablePlatforms()
    const profilePlatforms = await fetchUserPlatforms(user.id)

    return (
        <DashboardLayoutSub
            user={user}
            session={session}
            platforms={platforms}
            profilePlatforms={profilePlatforms}
        >
            {children}
        </DashboardLayoutSub>
    )
}
