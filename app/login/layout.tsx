import { LogoColored } from '@/components/icons/colored/logo-colored'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <header className="mb-16 flex items-center gap-2 px-8 pt-8">
                <LogoColored />
                <h1 className="text-[26px] font-bold">devlinks</h1>
            </header>

            <main>{children}</main>
        </div>
    )
}
