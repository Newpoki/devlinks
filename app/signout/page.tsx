import { getRequiredAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth'
import { Signout } from './signout'

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

export default async function SignoutPage() {
    const session = await getRequiredAuthSession()

    const user = await fetchUser(session)

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center gap-2 md:mx-auto md:gap-8">
            <h1 className="text-[51px] font-semibold leading-none text-purple-500 duration-150 animate-in md:text-[120px]">
                Good bye {user?.firstName}!
            </h1>
            <h2 className="text-[27px] md:text-[69px]">Hope to see you soon.</h2>
            <Signout />
        </main>
    )
}
