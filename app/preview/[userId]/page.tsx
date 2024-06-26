import { DashboardDraftPreviewPlatform } from '@/app/dashboard/dashboard-draft-preview-platform'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Metadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

const fetchUserDashboardData = async (userId: string) => {
    try {
        const { userPlatforms, ...user } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            include: {
                userPlatforms: {
                    include: {
                        platform: true,
                    },
                },
            },
        })

        return { user, userPlatforms }
    } catch {
        notFound()
    }
}

const fetchUserMetadata = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                firstName: true,
                lastName: true,
                image: true,
            },
        })

        return user
    } catch {
        return null
    }
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
    const userMetadata = await fetchUserMetadata(params.userId)

    if (userMetadata == null) {
        return {
            title: `Devlinks - ${decodeURIComponent(params.userId)}`,
            description: `Profile preview of user ${params.userId}`,
        }
    }

    const name = `${userMetadata.firstName} ${userMetadata.lastName}`

    const baseMetadata = {
        title: `Devlinks - ${name}`,
        description: `Profile preview of ${name}`,
    }

    const openGraphMetadata: OpenGraph = {
        type: 'website',
        title: baseMetadata.title,
        description: baseMetadata.description,
        siteName: 'Devlinks',
        images:
            userMetadata.image != null
                ? [
                      {
                          url: userMetadata.image,
                      },
                  ]
                : [],
    }

    return {
        openGraph: openGraphMetadata,
        twitter: openGraphMetadata,
    }
}

type PreviewPageProps = {
    params: {
        userId: string
    }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { user, userPlatforms } = await fetchUserDashboardData(params.userId)

    return (
        <Card className="md:mx-auto md:w-[349px] md:drop-shadow-xl">
            <CardHeader className="items-center gap-6">
                <div className="h-[108px] w-[108px] rounded-full border-4 border-purple-500">
                    {user.image != null ? (
                        <Image
                            src={user.image}
                            alt="User picture"
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
                    {userPlatforms.map((userPlatform) => {
                        return (
                            <li key={userPlatform.id} className="w-full">
                                <DashboardDraftPreviewPlatform
                                    name={userPlatform.platform.name}
                                    url={userPlatform.url}
                                />
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}
