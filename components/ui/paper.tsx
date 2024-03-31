import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type PaperProps = React.HTMLAttributes<HTMLElement>

export const Paper = forwardRef<HTMLElement, PaperProps>(({ className, ...others }, ref) => {
    return (
        <section
            {...others}
            className={cn('flex flex-col rounded-xl bg-grey-100 p-5', className)}
            ref={ref}
        />
    )
})

Paper.displayName = 'Paper'
