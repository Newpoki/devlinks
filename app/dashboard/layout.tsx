import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardForm } from './dashboard-form'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'

type DashboardLayoutProps = {
    children: React.ReactNode
}

const fetchUserDashboardData = async (session: Session) => {
    const userAndUserPlatformsPromise = prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id,
        },
        include: {
            userPlatforms: true,
        },
    })

    const platformsPromise = prisma.platform.findMany({
        select: {
            name: true,
            id: true,
        },
    })

    return Promise.all([userAndUserPlatformsPromise, platformsPromise])
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getRequiredAuthSession()

    const [{ userPlatforms, ...user }, platforms] = await fetchUserDashboardData(session)

    return (
        <DashboardForm
            user={user}
            session={session}
            platforms={platforms}
            userPlatforms={userPlatforms}
        >
            {children}
        </DashboardForm>
    )
}
