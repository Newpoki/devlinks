import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardLayoutSub } from './dashboard-layout-sub'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { Profile } from '@prisma/client'

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

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    const userProfile = await fetchUserProfile(session)

    return (
        <DashboardLayoutSub profile={userProfile} session={session}>
            {children}
        </DashboardLayoutSub>
    )
}
