import { PlatformName } from '@prisma/client'
import { DASHBOARD_PLATFORMS_MAPPING } from './dashboard-constants'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@/components/icons/arrow-right'

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
        <a
            href={url}
            target="_blank"
            className="w-full rounded-lg border-2 border-transparent transition-all hover:brightness-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-purple-500 focus:brightness-200"
        >
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
                <ArrowRight className="ml-auto" />
            </button>
        </a>
    )
}
