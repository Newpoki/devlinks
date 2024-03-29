import { Codepen } from '@/components/icons/codepen'
import { DashboardPlatformOption } from './dashboard-schemas'
import { Codewars } from '@/components/icons/codewars'
import { DevTo } from '@/components/icons/devto'
import { Facebook } from '@/components/icons/facebook'
import { FreecodeCamp } from '@/components/icons/free-code-camp'
import { Github } from '@/components/icons/github'
import { Gitlab } from '@/components/icons/gitlab'
import { Hashnode } from '@/components/icons/hashnode'
import { Linkedin } from '@/components/icons/linkedin'
import { StackOverflow } from '@/components/icons/stackoverflow'
import { Twitch } from '@/components/icons/twitch'
import { Twitter } from '@/components/icons/twitter'
import { Youtube } from '@/components/icons/youtube'
import { FrontendMentorColored } from '@/components/icons/colored/frontend-mentor-colored'
import { cn } from '@/lib/utils'

export const dashboardPreviewPlatformIconMapping = {
    CODEPEN: {
        icon: <Codepen />,
        backgroundColor: '#123456',
        borderColor: '#123456',
        color: '#FFFFFF',
    },
    CODEWARS: {
        icon: <Codewars />,
        backgroundColor: '#8A1A50',
        borderColor: '#8A1A50',
        color: '#FFFFFF',
    },
    DEVTO: {
        icon: <DevTo />,
        backgroundColor: '#333333',
        borderColor: '#333333',
        color: '#FFFFFF',
    },
    FACEBOOK: {
        icon: <Facebook />,
        backgroundColor: '#2442AC',
        borderColor: '#2442AC',
        color: '#FFFFFF',
    },
    FREECODECAMP: {
        icon: <FreecodeCamp />,
        backgroundColor: '#302267',
        borderColor: '#302267',
        color: '#FFFFFF',
    },
    FRONTEND_MENTOR: {
        icon: <FrontendMentorColored />,
        backgroundColor: '#FFFFFF',
        borderColor: '#D9D9D9',
        color: '#333333',
    },
    GITHUB: {
        icon: <Github />,
        backgroundColor: '#1A1A1A',
        borderColor: '#1A1A1A',
        color: '#FFFFFF',
    },
    GITLAB: {
        icon: <Gitlab />,
        backgroundColor: '#EB4925',
        borderColor: '#EB4925',
        color: '#FFFFFF',
    },
    HASNODE: {
        icon: <Hashnode />,
        backgroundColor: '#0330D1',
        borderColor: '#0330D1',
        color: '#FFFFFF',
    },
    LINKEDIN: {
        icon: <Linkedin />,
        backgroundColor: '#2D68FF',
        borderColor: '#2D68FF',
        color: '#FFFFFF',
    },
    STACK_OVERFLOW: {
        icon: <StackOverflow />,
        backgroundColor: '#EC7100',
        borderColor: '#EC7100',
        color: '#FFFFFF',
    },
    TWITCH: {
        icon: <Twitch />,
        backgroundColor: '#EE3FC8',
        borderColor: '#EE3FC8',
        color: '#FFFFFF',
    },
    TWITTER: {
        icon: <Twitter />,
        backgroundColor: '#43B7E9',
        borderColor: '#43B7E9',
        color: '#FFFFFF',
    },
    YOUTUBE: {
        icon: <Youtube />,
        backgroundColor: '#EE3939',
        borderColor: '#EE3939',
        color: '#FFFFFF',
    },
} as const

type DashboardDraftPreviewPlatformProps = {
    className?: string
    platform: DashboardPlatformOption
}

export const DashboardDraftPreviewPlatform = ({
    className,
    platform,
}: DashboardDraftPreviewPlatformProps) => {
    const mapping = dashboardPreviewPlatformIconMapping[platform.name]

    if (mapping == null) {
        return null
    }

    return (
        <button
            className={cn(
                'flex h-14 w-full items-center gap-2 rounded-lg border px-4 py-[18px] text-b-m',
                className
            )}
            style={{
                backgroundColor: mapping.backgroundColor,
                borderColor: mapping.borderColor,
                color: mapping.color,
            }}
        >
            <span>{mapping.icon}</span>
            <div>{platform.label}</div>
        </button>
    )
}
