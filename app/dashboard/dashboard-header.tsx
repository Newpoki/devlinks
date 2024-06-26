'use client'

import { Anchor } from '@/components/icons/anchor'
import { LogoColored } from '@/components/icons/colored/logo-colored'
import { Eye } from '@/components/icons/eye'
import { Logout } from '@/components/icons/logout'
import { Profile } from '@/components/icons/profile'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type DashboardHeaderProps = {
    user: User
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-between rounded-bl-xl rounded-br-xl bg-white px-6 py-4">
            <div className="flex items-center gap-[6px]">
                <LogoColored className="h-8 w-8" />
                <h1 className="hidden text-[24px] font-bold md:block">devlinks</h1>
            </div>

            <nav className="flex items-center gap-1 md:gap-7">
                <Link tabIndex={-1} href="/dashboard/platforms">
                    <Button
                        className="gap-2"
                        variant="text"
                        type="button"
                        aria-selected={pathname === '/dashboard/platforms'}
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

            <div className="flex items-center gap-2">
                <Link tabIndex={-1} href={`/preview/${user.id}`}>
                    <Button className="gap-2 px-4 md:px-[27px]" variant="outline" type="button">
                        <Eye className="md:hidden" />
                        <h2 className="hidden text-h-s md:inline-block">Preview</h2>
                    </Button>
                </Link>

                <Button
                    variant="text"
                    className="flex items-center gap-2 px-4 md:px-[27px]    "
                    type="button"
                    asChild
                >
                    <Link href={`/signout`}>
                        <Logout />
                        <h2 className="hidden text-h-s md:inline-block">Sign out</h2>
                    </Link>
                </Button>
            </div>
        </header>
    )
}
