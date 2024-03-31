import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-h-s transition-colors focus-visible:outline-none disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default:
                    'bg-purple-500 text-white hover:bg-purple-300 disabled:bg-purple-500/25 focus-visible:bg-purple-300 focus-visible:drop-shadow-active hover:drop-shadow-active',
                outline:
                    'border border-purple-500 bg-transparent hover:bg-purple-100 disabled:opacity-25 focus-visible:bg-purple-100 text-purple-500',
                text: 'text-grey-500 active:bg-purple-100 hover:text-purple-500 focus-visible:bg-purple-100 focus-visible:text-purple-500 aria-selected:text-purple-500 aria-selected:bg-purple-100 disabled:opacity-50',
            },
            size: {
                default: 'px-[27px] py-[11px] h-[46px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
