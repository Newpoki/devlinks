import { Skeleton } from '@/components/ui/skeleton'

export const DashboardPlatformListSkeleton = () => {
    return (
        <ul className="flex flex-col gap-6">
            {Array.from({ length: 3 }, (_, index) => index + 1).map((value) => {
                return (
                    <li key={value} className="h-[256px] w-full">
                        <Skeleton className="h-full w-full" />
                    </li>
                )
            })}
        </ul>
    )
}
