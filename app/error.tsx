'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type PreviewErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function PreviewError({ reset }: PreviewErrorProps) {
    const router = useRouter()

    const handleGoToDashboard = useCallback(() => {
        router.push('/dashboard')
    }, [router])

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center gap-2 md:mx-auto md:max-w-[500px] md:gap-8">
            <h1 className="text-[69px] font-semibold leading-none text-purple-500 md:text-[120px]">
                {500}
            </h1>
            <h2 className="text-[31px] font-semibold leading-none md:text-[51px]">
                Internal Server Error
            </h2>
            <p className="text-b-m text-grey-500 md:text-[20px]">Sorry, something went wrong.</p>

            <div className="mt-10 flex flex-col gap-2 md:w-full md:flex-row">
                <Button type="button" className="md:w-full" onClick={reset}>
                    Try again
                </Button>

                <Button
                    type="button"
                    className="md:w-full"
                    variant="outline"
                    onClick={handleGoToDashboard}
                >
                    Go to dashboard
                </Button>
            </div>
        </main>
    )
}
