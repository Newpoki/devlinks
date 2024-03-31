import { PlatformName } from '@prisma/client'
import { DASHBOARD_PLATFORMS_MAPPING } from './dashboard-constants'
import { cn } from '@/lib/utils'

type DashboardDraftPreviewPlatformProps = {
    className?: string
    name: PlatformName
    url: string
}

export const DashboardDraftPreviewPlatform = ({
    className,
    name,
    url,
}: DashboardDraftPreviewPlatformProps) => {
    const mapping = DASHBOARD_PLATFORMS_MAPPING[name]

    return (
        <a href={url} target="_blank">
            <button
                className={cn(
                    'flex h-14 w-full items-center gap-2 rounded-lg border px-4 py-[18px] text-b-m',
                    className
                )}
                style={{
                    backgroundColor: mapping.backgroundColor,
                    borderColor: mapping.borderColor,
                    color: mapping.color,
                }}
                type="button"
                tabIndex={-1}
            >
                <span>{<mapping.icon />}</span>
                <div>{mapping.label}</div>
            </button>
        </a>
    )
}
