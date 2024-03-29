import { Codepen } from '@/components/icons/codepen'
import { DashboardPlatformOption } from './dashboard-schemas'
import { Codewars } from '@/components/icons/codewars'
import { DevTo } from '@/components/icons/devto'
import { Facebook } from '@/components/icons/facebook'
import { FreecodeCamp } from '@/components/icons/free-code-camp'
import { FrontendMentor } from '@/components/icons/frontend-mentor'
import { Github } from '@/components/icons/github'
import { Gitlab } from '@/components/icons/gitlab'
import { Hashnode } from '@/components/icons/hashnode'
import { Linkedin } from '@/components/icons/linkedin'
import { StackOverflow } from '@/components/icons/stackoverflow'
import { Twitch } from '@/components/icons/twitch'
import { Twitter } from '@/components/icons/twitter'
import { Youtube } from '@/components/icons/youtube'

type DashboardPlatformFieldIconProps = {
    name: DashboardPlatformOption['name']
}

export const DashboardPlatformFieldIcon = ({ name }: DashboardPlatformFieldIconProps) => {
    switch (name) {
        case 'CODEPEN':
            return <Codepen />
        case 'CODEWARS':
            return <Codewars />
        case 'DEVTO':
            return <DevTo />
        case 'FACEBOOK':
            return <Facebook />
        case 'FREECODECAMP':
            return <FreecodeCamp />
        case 'FRONTEND_MENTOR':
            return <FrontendMentor />
        case 'GITHUB':
            return <Github />
        case 'GITLAB':
            return <Gitlab />
        case 'HASNODE':
            return <Hashnode />
        case 'LINKEDIN':
            return <Linkedin />
        case 'STACK_OVERFLOW':
            return <StackOverflow />
        case 'TWITCH':
            return <Twitch />
        case 'TWITTER':
            return <Twitter />
        case 'YOUTUBE':
            return <Youtube />
    }
}
