import { LogoColored } from '@/components/icons/colored/logo-colored'

export const DashboardHeader = () => {
    return (
        <header className="flex items-center justify-between rounded-bl-xl rounded-br-xl bg-white px-6 py-4">
            <LogoColored className="h-8 w-8" />

            <div>
                <button>links</button>
                <button>profile</button>
            </div>

            <button>preview</button>
        </header>
    )
}
