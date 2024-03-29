'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'
import { ArrowDown } from '../icons/arrow-down'

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    return (
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                'group flex h-12 w-full items-center gap-3 rounded-lg border border-grey-300 bg-white px-4 text-b-m text-grey-500 transition-colors focus-within:drop-shadow-active hover:border-purple-500 focus:border-purple-500 focus:outline-none disabled:cursor-not-allowed [&>span]:line-clamp-1',

                className
            )}
            {...props}
        >
            {children}

            <SelectPrimitive.Icon asChild>
                <ArrowDown className="ml-auto text-purple-500 transition-transform group-aria-expanded:rotate-180" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                'relative z-50 max-h-48 min-w-[8rem] overflow-hidden rounded-lg border border-grey-300 bg-white text-grey-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 md:max-h-96',
                position === 'popper' &&
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    'flex flex-col gap-3 px-4 py-3 drop-shadow-menu',
                    position === 'popper' &&
                        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { icon?: React.ReactNode }
>(({ className, children, icon, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            'data-[disabtext-purple-500 relative flex w-full cursor-default select-none items-center gap-3 rounded-sm text-b-m outline-none focus:text-purple-500 data-[disabled]:pointer-events-none data-[state=checked]:text-purple-500',
            className
        )}
        {...props}
    >
        <SelectPrimitive.Icon>{icon}</SelectPrimitive.Icon>

        <SelectPrimitive.ItemText>
            <span>{children}</span>
        </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator ref={ref} className={cn('h-px bg-grey-300', className)} {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectSeparator }
