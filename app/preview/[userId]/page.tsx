import { DashboardDraftPreviewPlatform } from '@/app/dashboard/dashboard-draft-preview-platform'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// We don't want any cache here, because user may come from /dashboard url
// and have update the bdd, so always want fresh data
export const revalidate = 0

const fetchUser = async (userId: string) => {
    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
            },
        })

        if (profile == null) {
            notFound()
        }

        return profile
    } catch {
        notFound()
    }
}

const fetchUserPlatforms = async (userId: User['id']) => {
    const userProfilePlatforms = await prisma.profilePlatform.findMany({
        where: {
            userId,
        },
        select: {
            platform: true,
            url: true,
            id: true,
        },
    })

    return userProfilePlatforms
}

type PreviewPageProps = {
    params: {
        userId: string
    }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const user = await fetchUser(params.userId)
    const userProfilePlatforms = await fetchUserPlatforms(user.id)

    return (
        <Card className="md:mx-auto md:w-[349px] md:drop-shadow-xl">
            <CardHeader className="items-center gap-6">
                <div className="h-[108px] w-[108px] rounded-full border-4 border-purple-500">
                    {user.image != null ? (
                        <Image
                            // TODO: Create util to get better image quality
                            src={user.image.replace('=s96-c', '=s384-c')}
                            alt="User profile picture"
                            width={108}
                            height={108}
                            className="rounded-full"
                        />
                    ) : (
                        <Skeleton className="h-[104px] w-[104px] rounded-full" />
                    )}
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-h-m">
                        {user.firstName} {user.lastName}
                    </h1>
                    <h3 className="text-b-m text-grey-500">{user.email}</h3>
                </div>
            </CardHeader>

            <CardContent className="px-[70px] pb-0">
                <ul className="flex w-full flex-col gap-5">
                    {userProfilePlatforms.map((userProfilePlatform) => {
                        return (
                            <li key={userProfilePlatform.id} className="w-full">
                                <DashboardDraftPreviewPlatform
                                    name={userProfilePlatform.platform.name}
                                    url={userProfilePlatform.url}
                                />
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}
