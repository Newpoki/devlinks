import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import { cn } from '@/lib/utils'

// Using local fonts instead of NextFont because there is an issue with InstrumentSans
const fontSans = localFont({
    src: [
        {
            path: './fonts/InstrumentSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/InstrumentSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/InstrumentSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
})
export const metadata: Metadata = {
    title: 'DevLinks',
    description: 'Create virtual card',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'overflow-hidden bg-grey-100 text-b-m text-grey-900 antialiased',
                    fontSans.className
                )}
            >
                {children}
            </body>
        </html>
    )
}
