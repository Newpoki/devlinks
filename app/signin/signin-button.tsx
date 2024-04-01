'use client'

import { GitHubColored } from '@/components/icons/colored/github-colored'
import { GoogleColored } from '@/components/icons/colored/google-colored'
import { signIn } from 'next-auth/react'

type SigninButtonProps = {
    provider: 'GOOGLE' | 'GITHUB'
    setIsSignin: React.Dispatch<React.SetStateAction<boolean>>
    isSignin: boolean
}

const PROVIDER_MAPPING = {
    GOOGLE: {
        name: 'google',
        label: 'Google',
        icon: <GoogleColored />,
    },
    GITHUB: {
        name: 'github',
        label: 'GitHub',
        icon: <GitHubColored className="h-8 w-8" />,
    },
} as const

export const SigninButton = ({ setIsSignin, isSignin, provider }: SigninButtonProps) => {
    const mapping = PROVIDER_MAPPING[provider]

    const handleSigninWithGitHub = async () => {
        try {
            setIsSignin(true)
            await signIn(mapping.name, { callbackUrl: '/dashboard' })
        } catch (error) {
            // Only stopping on catch, so button doesn't flicker between end of signin and redirection
            setIsSignin(false)
        }
    }

    return (
        <button
            aria-label={`Sign in with ${mapping.label}`}
            className="flex w-full items-center gap-3 rounded-md bg-[#202124] p-0.5 pr-3 transition-all duration-300 hover:bg-[#555658] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-25"
            disabled={isSignin}
            type="button"
            onClick={handleSigninWithGitHub}
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-l bg-white">
                {mapping.icon}
            </div>

            <span className="text-b-s tracking-wider text-white">Sign in with {mapping.label}</span>
        </button>
    )
}
