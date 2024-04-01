import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
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
            profile: (profile: GoogleProfile) => {
                return {
                    id: profile.sub,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user != null) {
                session.user.id = user.id
                session.user.firstName = user.firstName
                session.user.lastName = user.lastName
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
