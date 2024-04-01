import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardLayoutSub } from './dashboard-layout-sub'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { Profile, ProfilePlatform } from '@prisma/client'
import { DashboardPlatformOption } from './dashboard-schemas'

type DashboardLayoutProps = {
    children: React.ReactNode
}

const fetchUserProfile = async (session: Session): Promise<Profile> => {
    const profile = await prisma.profile.findUnique({
        where: {
            userId: session.user.id,
        },
    })

    if (profile != null) {
        return profile
    }

    return await prisma.profile.create({
        data: {
            email: session.user.email,
            userId: session.user.id,
            firstName: session.user.firstName,
            lastName: session.user.lastName,
        },
    })
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

const fetchUserProfilePlatforms = async (profileId: Profile['id']): Promise<ProfilePlatform[]> => {
    const userProfilePlatforms = await prisma.profilePlatform.findMany({
        where: {
            profileId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    return userProfilePlatforms
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    console.log({ session })

    const userProfile = await fetchUserProfile(session)
    const platforms = await fetchAvailablePlatforms()
    const profilePlatforms = await fetchUserProfilePlatforms(userProfile.id)

    return (
        <DashboardLayoutSub
            profile={userProfile}
            session={session}
            platforms={platforms}
            profilePlatforms={profilePlatforms}
        >
            {children}
        </DashboardLayoutSub>
    )
}
