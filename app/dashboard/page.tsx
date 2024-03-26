import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getRequiredAuthSession } from '@/lib/auth'
import { DashboardNoLinks } from './dashboard-no-links'

export default async function DashboardPage() {
    getRequiredAuthSession()

    return (
        <Card className="flex flex-1 flex-col">
            <CardHeader>
                <CardTitle>Customize your links</CardTitle>
                <CardDescription>
                    Add/edit/remove links beloww and then share all your profiles with the world!
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
                <Button className="w-full" variant="outline" type="button">
                    + Add new link
                </Button>

                {/* TODO: display only if link list.length === 0 */}
                <DashboardNoLinks />
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full md:w-auto"
                    // TODO: disabled only if link list.length === 0
                    disabled
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
