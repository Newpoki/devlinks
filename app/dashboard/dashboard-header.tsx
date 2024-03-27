'use client'

import { Anchor } from '@/components/icons/anchor'
import { LogoColored } from '@/components/icons/colored/logo-colored'
import { Eye } from '@/components/icons/eye'
import { Profile } from '@/components/icons/profile'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardHeader = () => {
    const pathname = usePathname()

    console.log({ pathname })
    return (
        <header className="flex items-center justify-between rounded-bl-xl rounded-br-xl bg-white px-6 py-4">
            <div className="flex items-center gap-[6px]">
                <LogoColored className="h-8 w-8" />
                <h1 className="hidden text-[24px] font-bold md:block">devlinks</h1>
            </div>

            <nav>
                <Link tabIndex={-1} href="/dashboard">
                    <Button
                        className="gap-2"
                        variant="text"
                        type="button"
                        aria-selected={pathname === '/dashboard'}
                    >
                        <Anchor />
                        <h2 className="hidden text-h-s md:inline-block">Links</h2>
                    </Button>
                </Link>

                <Link tabIndex={-1} href="/dashboard/profile">
                    <Button
                        className="gap-2"
                        variant="text"
                        type="button"
                        aria-selected={pathname === '/dashboard/profile'}
                    >
                        <Profile />
                        <h2 className="hidden text-h-s md:inline-block">Profile Details</h2>
                    </Button>
                </Link>
            </nav>

            <Button className="gap-2 px-4 md:px-[27px]" variant="outline" type="button">
                <Eye className="md:hidden" />
                <h2 className="hidden text-h-s md:inline-block">Preview</h2>
            </Button>
        </header>
    )
}