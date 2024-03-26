import { DashboardHeader } from './dashboard-header'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex flex-col gap-4 bg-grey-100">
            <DashboardHeader />

            <main className="p-4 pt-0">{children}</main>
        </div>
    )
}
