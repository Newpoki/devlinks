import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PreviewHeaderCopyClipboardButton } from './preview-header-copy-clipboard-button'

export const PreviewHeader = () => {
    return (
        <header className="flex items-center gap-4 rounded-xl px-6 py-4 md:justify-between md:bg-white">
            <Link tabIndex={-1} href="/dashboard/platforms" className="w-full md:w-auto">
                <Button type="button" variant="outline" className="w-full">
                    Back to Editor
                </Button>
            </Link>

            <PreviewHeaderCopyClipboardButton />
        </header>
    )
}
