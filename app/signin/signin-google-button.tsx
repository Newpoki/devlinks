'use client'

import { GoogleColored } from '@/components/icons/colored/google-colored'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const SigninGoogleButton = () => {
    const [isSignin, setIsSignin] = useState(false)

    const handleSigninWithGoogle = async () => {
        try {
            setIsSignin(true)
            await signIn('google', { callbackUrl: '/dashboard' })
        } catch (error) {
            // Only stopping on catch, so button doesn't flicker between end of signin and redirection
            setIsSignin(false)
        }
    }

    return (
        <button
            aria-label="Sign in with Google"
            className="flex items-center gap-3 rounded-md bg-[#202124] p-0.5 pr-3 transition-all duration-300 hover:bg-[#555658] disabled:opacity-25"
            disabled={isSignin}
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-l bg-white">
                <GoogleColored />
            </div>

            <span className="text-b-s tracking-wider text-white" onClick={handleSigninWithGoogle}>
                Sign in with Google
            </span>
        </button>
    )
}
