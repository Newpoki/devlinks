import { LogoColored } from '@/components/icons/colored/logo-colored'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-[100dvh] flex-col gap-16 bg-white md:items-center md:justify-center md:gap-[51px] md:bg-transparent">
            <header className="flex items-center gap-2 px-8 pt-8 md:p-0">
                <LogoColored />
                <h1 className="text-[26px] font-bold">devlinks</h1>
            </header>

            <main className="px-4 md:w-[480px]">{children}</main>
        </div>
    )
}
