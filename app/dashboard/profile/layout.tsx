import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DevLinks - Profile',
    description: "Your dashboard's profile",
}

type DashboardProfileLayoutProps = {
    children: React.ReactNode
}

export default function DashboardProfileLayout({ children }: DashboardProfileLayoutProps) {
    return children
}
