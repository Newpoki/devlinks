import { cn } from '@/lib/utils'

type PaperProps = React.HTMLAttributes<HTMLElement>

export const Paper = ({ className, ...others }: PaperProps) => {
    return (
        <section
            {...others}
            className={cn('flex flex-col rounded-xl bg-grey-100 p-5', className)}
        />
    )
}
