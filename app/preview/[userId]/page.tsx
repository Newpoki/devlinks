import { DashboardDraftPreviewPlatform } from '@/app/dashboard/dashboard-draft-preview-platform'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { authConfig } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Profile } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PreviewHeaderCopyClipboardButton } from './preview-header-copy-clipboard-button'

export const revalidate = 0

const fetchUserProfile = async (userId: string) => {
    const profile = await prisma.profile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
            user: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    })

    if (profile == null) {
        notFound()
    }

    return profile
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
    const userProfile = await fetchUserProfile(params.userId)
    const userProfilePlatforms = await fetchUserProfilePlatforms(userProfile.id)

    const session = await getServerSession(authConfig)

    const isSeeingOwnProfile = session?.user.id === params.userId

    return (
        <main className="flex min-h-[100dvh] flex-col bg-white px-6 py-4">
            {isSeeingOwnProfile && (
                <header className="mb-[60px] flex items-center gap-4">
                    <Link tabIndex={-1} href="/dashboard/platforms" className="w-full">
                        <Button type="button" variant="outline" className="w-full">
                            Back to Editor
                        </Button>
                    </Link>

                    <PreviewHeaderCopyClipboardButton />
                </header>
            )}

            <section className="mx-auto mb-14 mt-4 flex w-3/4 flex-col items-center gap-6">
                <div className="h-[108px] w-[108px] rounded-full border-4 border-purple-500">
                    {userProfile.user.image != null ? (
                        <Image
                            src={userProfile.user.image.replace('=s96-c', '=s384-c')}
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
