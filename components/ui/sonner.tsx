'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-grey-900 group-[.toaster]:text-white group-[.toaster]:drop-shadow-menu',
                    description: 'group-[.toast]:text-white',
                    actionButton: 'group-[.toast]:bg-grey-900 group-[.toast]:text-white ',
                    cancelButton: 'group-[.toast]:bg-grey-100 group-[.toast]:text-white',
                },
            }}
            position="bottom-center"
            {...props}
        />
    )
}

export { Toaster }
