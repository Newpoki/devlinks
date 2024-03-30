import { createContext } from 'react'
import { DashboardPlatformOption } from './dashboard-schemas'

export type DashboardContextData = {
    profilePictureUrl: string | null
    platformsOptions: DashboardPlatformOption[]
}

export const DashboardContext = createContext<DashboardContextData>({
    profilePictureUrl: null,
    platformsOptions: [],
})

type DashboardContextProviderProps = {
    children: React.ReactNode
    value: DashboardContextData
}

export const DashboardContextProvider = ({ children, value }: DashboardContextProviderProps) => {
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
