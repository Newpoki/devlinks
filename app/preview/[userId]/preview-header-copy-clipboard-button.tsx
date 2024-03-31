'use client'

import { Anchor } from '@/components/icons/anchor'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const PreviewHeaderCopyClipboardButton = () => {
    const handleClick = useCallback(() => {
        navigator.clipboard.writeText(window.location.href)

        toast.info('The link has been copied to your clipboard!', {
            icon: <Anchor className="text-grey-500" />,
        })
    }, [])

    return (
        <Button type="button" className="w-full" onClick={handleClick}>
            Share Link
        </Button>
    )
}
