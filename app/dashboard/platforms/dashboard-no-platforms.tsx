import { PointingMobileIllustrationColored } from '@/components/icons/colored/pointing-mobile-illustration-colored'
import { Paper } from '@/components/ui/paper'

export const DashboardNoPlatforms = () => {
    return (
        <Paper className="flex-1 items-center justify-center gap-6 text-center">
            <PointingMobileIllustrationColored />

            <h3 className="text-[24px] font-bold leading-[150%] md:text-h-m">
                Let&apos;s get you started
            </h3>
            <p className="text-b-m text-grey-500">
                Use the “Add new link” button to get started. Once you have more than one link, you
                can reorder and edit them. We&apos;re here to help you share your profiles with
                everyone!
            </p>
        </Paper>
    )
}
