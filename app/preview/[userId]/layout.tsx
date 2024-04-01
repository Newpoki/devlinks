import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { PreviewHeader } from './header/preview-header'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

type PreviewLayoutProps = {
    children: React.ReactNode
    params: {
        userId: string
    }
}

export default async function PreviewLayout({ children, params }: PreviewLayoutProps) {
    const session = await getServerSession(authConfig)

    const isCurrentUserPreview = session?.user.id === params.userId

    return (
        <ScrollArea className="flex h-[100dvh] flex-col overflow-y-auto bg-white md:bg-grey-100">
            <div
                className={cn('rounded-b-[32px] md:h-[357px] md:bg-purple-500 md:px-6 md:pt-6', {
                    'md:h-[277px]': !isCurrentUserPreview,
                })}
            >
                {isCurrentUserPreview && <PreviewHeader />}

                <main className="py-10 md:pt-32">{children}</main>
            </div>
        </ScrollArea>
    )
}
