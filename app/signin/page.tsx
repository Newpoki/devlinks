import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '@/lib/auth'
import { SigninGoogleButton } from './signin-google-button'

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

            <CardFooter className="justify-end">
                <SigninGoogleButton />
            </CardFooter>
        </Card>
    )
}
