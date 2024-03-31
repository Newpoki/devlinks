import { DashboardDraftPreviewPlatform } from '@/app/dashboard/dashboard-draft-preview-platform'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/prisma'
import { Profile } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const fetchUserImage = async (userId: string): Promise<string | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            image: true,
        },
    })

    if (user == null) {
        notFound()
    }

    return user.image
}

const fetchUserProfile = async (userId: string): Promise<Profile> => {
    const user = await prisma.profile.findUnique({
        where: {
            userId,
        },
    })

    if (user == null) {
        notFound()
    }

    return user
}

const fetchUserProfilePlatforms = async (profileId: Profile['id']) => {
    const userProfilePlatforms = await prisma.profilePlatform.findMany({
        where: {
            profileId,
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
    const userImage = await fetchUserImage(params.userId)
    const userProfile = await fetchUserProfile(params.userId)
    const userProfilePlatforms = await fetchUserProfilePlatforms(userProfile.id)

    return (
        <main className="flex min-h-[100dvh] flex-col gap-4 bg-white px-6 py-4">
            <header className="mb-[60px] flex items-center gap-4">
                <Link tabIndex={-1} href="/dashboard/platforms" className="w-full">
                    <Button type="button" variant="outline" className="w-full">
                        Back to Editor
                    </Button>
                </Link>
                <Button type="button" className="w-full">
                    Share Link
                </Button>
            </header>

            <section className="mx-auto mb-14 flex w-2/3 flex-col items-center gap-6">
                <div className="h-[108px] w-[108px] rounded-full border-4 border-purple-500">
                    {userImage != null ? (
                        <Image
                            src={userImage.replace('=s96-c', '=s384-c')}
                            alt="User profile picture"
                            width={108}
                            height={108}
                            className="rounded-full"
                        />
                    ) : (
                        <Skeleton className="h-[104px] w-[104px] rounded-full" />
                    )}
                </div>

                <div className="text-center">
                    <h1 className="text-h-m">
                        {userProfile.firstName} {userProfile.lastName}
                    </h1>
                    <h3 className="text-b-m text-grey-500">{userProfile.email}</h3>
                </div>

                {userProfilePlatforms.map((userProfilePlatform) => {
                    return (
                        <DashboardDraftPreviewPlatform
                            key={userProfilePlatform.id}
                            name={userProfilePlatform.platform.name}
                            url={userProfilePlatform.url}
                        />
                    )
                })}
            </section>
        </main>
    )
}
