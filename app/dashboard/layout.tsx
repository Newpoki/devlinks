import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardLayoutSub } from './dashboard-layout-sub'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'

type DashboardLayoutProps = {
    children: React.ReactNode
}

const fetchUserDashboardData = async (session: Session) => {
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (user == null) {
        // TODO: handle error
        throw new Error('User not found')
    }

    const platforms = await prisma.platform.findMany({
        select: {
            name: true,
            id: true,
        },
    })

    const userPlatforms = await prisma.userPlatform.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            order: 'asc',
        },
    })

    return { user, platforms, userPlatforms }
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    const { user, userPlatforms, platforms } = await fetchUserDashboardData(session)

    return (
        <DashboardLayoutSub
            user={user}
            session={session}
            platforms={platforms}
            userPlatforms={userPlatforms}
        >
            {children}
        </DashboardLayoutSub>
    )
}
