import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession(authConfig)

    session == null ? redirect('/signin') : redirect('/dashboard')

    return (
        <main>
            <p>home</p>
        </main>
    )
}
