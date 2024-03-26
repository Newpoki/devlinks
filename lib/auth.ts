import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma'
import type { Adapter } from 'next-auth/adapters'
import { redirect } from 'next/navigation'

export const authConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user != null) {
                session.user.id = user.id
            }

            return session
        },
    },
}

export const getRequiredAuthSession = async () => {
    const session = await getServerSession(authConfig)

    if (session?.user == null) {
        redirect('/signin')
    }

    return session
}
