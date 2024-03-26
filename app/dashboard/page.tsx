import { Logout } from './logout'
import { getRequiredAuthSession } from '@/lib/auth'

export default async function DashboardPage() {
    getRequiredAuthSession()

    return (
        <div>
            <p>
                <Logout />
            </p>
        </div>
    )
}
