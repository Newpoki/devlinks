import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '@/lib/auth'
import { SigninFooter } from './signin-footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DevLinks - Signin',
    description: 'Signin to access your dashboard',
}

export default async function Signin() {
    const session = await getServerSession(authConfig)

    // User is already connected, no need to be here
    if (session != null) {
        redirect('/dashboard')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login with your Google account to get back into the app
                </CardDescription>
            </CardHeader>

            <SigninFooter />
        </Card>
    )
}
