import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
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
            allowDangerousEmailAccountLinking: true,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            profile: (profile: GithubProfile) => {
                // Github doesn't expose first name or last name
                // Trying to split by space is the "best" thing we can try
                const [firstName, lastName] = profile.name?.split(' ') ?? ['', '']

                return {
                    id: `${profile.id}`,
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
            allowDangerousEmailAccountLinking: true,
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
