'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export const Signout = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            signOut()
        }, 2000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return null
}
