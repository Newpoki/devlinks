import { ControlledInput } from '@/components/controlled/controlled-input'
import { Eye } from '@/components/icons/eye'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Paper } from '@/components/ui/paper'
import { getRequiredAuthSession } from '@/lib/auth'
import Image from 'next/image'

export default async function DashboardProfilePage() {
    const session = await getRequiredAuthSession()

    return (
        <Card className="flex flex-1 flex-col">
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>
                    Add your details to create a personal touch to your profile.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
                <Paper className="text-grey-500 md:flex-row md:items-center">
                    <h4 className="mb-4 flex-shrink-0 text-b-m md:w-64">Profile picture</h4>

                    <div className="mb-6 flex-shrink-0 md:mr-6">
                        {session.user.image ? (
                            <Image
                                // Replacing to get better image quality
                                src={session.user.image.replace('=s96-c', '=s384-c')}
                                alt="User profile picture"
                                width={193}
                                height={193}
                                className="rounded-xl"
                            />
                        ) : (
                            <div className="h-[193px] w-[193px]" />
                        )}
                    </div>

                    <p className="text-b-s">
                        The image is taken from your Google account so you don&apos;t have to change
                        it.
                    </p>
                </Paper>

                <Paper className="gap-3 md:grid">
                    <ControlledInput
                        label="First name*"
                        placeholder="Jason"
                        name="user.firstName"
                        startIcon={<Eye className="h-4 w-4" />}
                    />

                    <ControlledInput
                        label="Last name*"
                        placeholder="Savelli"
                        name="user.lastName"
                        startIcon={<Eye className="h-4 w-4" />}
                    />

                    <ControlledInput
                        label="Email"
                        placeholder="email@gmail.com"
                        name="user.email"
                        startIcon={<Eye className="h-4 w-4" />}
                    />
                </Paper>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full md:w-auto"
                    // TODO: disabled only when submitting
                    disabled={false}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
