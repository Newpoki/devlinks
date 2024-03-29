import { Card, CardContent } from '@/components/ui/card'
import mobilePreviewFrame from '@/public/mobile-preview-frame.png'
import { useFormContext, useWatch } from 'react-hook-form'
import { DashboardFormValues } from './dashboard-schemas'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DashboardDraftPreviewPlatform } from './dashboard-draft-preview-platform'

export const DashboardDraftPreview = () => {
    const { control } = useFormContext<DashboardFormValues>()

    const user = useWatch({ control, name: 'user' })
    const platforms = useWatch({ control, name: 'platforms' })
    const platformsOptions = useWatch({ control, name: 'platformsOptions' })

    const skeletonsArray =
        platforms.length >= 4
            ? []
            : Array.from({ length: 4 - platforms.length }, (_, index) => index + 1)

    return (
        <Card className="hidden flex-1 flex-col lg:flex">
            <CardContent className="flex flex-1 items-center justify-center">
                <div
                    className="flex h-[631px] w-[307px] py-14"
                    style={{ backgroundImage: `url(${mobilePreviewFrame.src})` }}
                >
                    <ScrollArea className="mr-2 flex w-full flex-col pl-10 pr-8">
                        <section className="mb-10 flex w-full flex-col items-center gap-6">
                            {user.pictureUrl ? (
                                <Image
                                    src={user.pictureUrl.replace('=s96-c', '=s384-c')}
                                    alt="User profile picture"
                                    width={93}
                                    height={93}
                                    className="rounded-full"
                                />
                            ) : (
                                <Skeleton className="h-[93px] w-[93px] rounded-full" />
                            )}

                            <div className="flex flex-col items-center gap-3">
                                {user.firstName !== '' && user.lastName !== '' ? (
                                    <p className="text-[18px] font-semibold leading-[150%]">
                                        {user.firstName} {user.lastName}
                                    </p>
                                ) : (
                                    <Skeleton className="h-4 w-40" />
                                )}

                                {user.email !== '' ? (
                                    <p className="text-[14px] leading-[150%] text-grey-500">
                                        {user.email}
                                    </p>
                                ) : (
                                    <Skeleton className="h-2 w-[72px]" />
                                )}
                            </div>
                        </section>

                        <section className="flex w-full flex-col gap-5">
                            {platforms.map((platform) => {
                                const platformOption = platformsOptions.find(
                                    (option) => option.name === platform.name
                                )

                                if (platformOption == null) {
                                    return null
                                }

                                return (
                                    <DashboardDraftPreviewPlatform
                                        key={`${platform.name}-${platform.url}`}
                                        platform={platformOption}
                                    />
                                )
                            })}

                            {skeletonsArray.map((value) => {
                                return <Skeleton key={value} className="h-14 w-full rounded-lg" />
                            })}
                        </section>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    )
}