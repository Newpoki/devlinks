'use client'

import { CardFooter } from '@/components/ui/card'
import { SigninButton } from './signin-button'
import { useState } from 'react'

export const SigninFooter = () => {
    const [isSignin, setIsSignin] = useState(false)

    return (
        <CardFooter className="md:space-between flex-col items-end gap-3 md:flex-row md:gap-4 md:px-6">
            <SigninButton provider="GOOGLE" setIsSignin={setIsSignin} isSignin={isSignin} />
            <SigninButton provider="GITHUB" setIsSignin={setIsSignin} isSignin={isSignin} />
        </CardFooter>
    )
}
