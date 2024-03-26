'use client'

import { signOut } from 'next-auth/react'

export const Logout = () => {
    return (
        <button type="button" onClick={() => signOut({ callbackUrl: '/signin' })}>
            logout
        </button>
    )
}
