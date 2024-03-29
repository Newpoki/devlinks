import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-grey-900/10 dark:bg-grey-500/10', className)}
            {...props}
        />
    )
}

export { Skeleton }
