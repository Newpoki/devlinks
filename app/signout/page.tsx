import { getRequiredAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { Signout } from './signout'
import { Metadata } from 'next'

const fetchUser = async (session: Session) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        })
    } catch {
        return null
    }
}

export const metadata: Metadata = {
    title: 'DevLinks - Signout',
    description: 'Sign out from Devlinks',
}

export default async function SignoutPage() {
    const session = await getRequiredAuthSession()

    const user = await fetchUser(session)

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center gap-2 text-center md:mx-auto md:gap-8">
            <h1 className="text-[42px] font-semibold leading-none text-purple-500 duration-150 animate-in md:text-[90px] lg:text-[120px]">
                Good bye {user?.firstName}!
            </h1>
            <h2 className="text-[21px] md:text-[51px] lg:text-[69px]">Hope to see you soon.</h2>
            <Signout />
        </main>
    )
}
