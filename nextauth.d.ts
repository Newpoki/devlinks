import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: DefaultUser & {
            id: string
        }
    }
    interface User {
        id: string
        firstName?: string
        lastName?: string
    }
}
