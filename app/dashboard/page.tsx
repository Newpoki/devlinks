import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getRequiredAuthSession } from '@/lib/auth'

export default async function DashboardPage() {
    getRequiredAuthSession()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customize your links</CardTitle>
                <CardDescription>
                    Add/edit/remove links beloww and then share all your profiles with the world!
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
