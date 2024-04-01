import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DevLinks - Links',
    description: "Your dashboard's Links",
}

type DashboardPlatformsLayoutProps = {
    children: React.ReactNode
}

export default function DashboardPlatformsLayout({ children }: DashboardPlatformsLayoutProps) {
    return children
}
