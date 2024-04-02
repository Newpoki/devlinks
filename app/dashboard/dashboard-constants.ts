import { Codepen } from '@/components/icons/codepen'
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
import { FrontendMentor } from '@/components/icons/frontend-mentor'

export const DASHBOARD_PLATFORMS_MAPPING = {
    CODEPEN: {
        backgroundColor: '#123456',
        borderColor: '#123456',
        color: '#FFFFFF',
        label: 'Codepen',
        urlPattern: 'https://codepen.io/',
        icon: Codepen,
        coloredIcon: Codepen,
        regex: 'https://(www.)?codepen.io/\\w+',
    },
    CODEWARS: {
        backgroundColor: '#8A1A50',
        borderColor: '#8A1A50',
        color: '#FFFFFF',
        label: 'Codewars',
        urlPattern: 'https://codewars.com/users/',
        icon: Codewars,
        coloredIcon: Codewars,
        regex: 'https://(www.)?codewars.com/users/\\w+',
    },
    DEVTO: {
        backgroundColor: '#333333',
        borderColor: '#333333',
        color: '#FFFFFF',
        label: 'Dev.to',
        urlPattern: 'https://dev.to/',
        icon: DevTo,
        coloredIcon: DevTo,
        regex: 'https://(www.)?dev.to/\\w+',
    },
    FACEBOOK: {
        backgroundColor: '#2442AC',
        borderColor: '#2442AC',
        color: '#FFFFFF',
        label: 'Facebook',
        urlPattern: 'https://facebook.com/',
        icon: Facebook,
        coloredIcon: Facebook,
        regex: 'https://(www.)?facebook.com/\\w+',
    },
    FREECODECAMP: {
        backgroundColor: '#302267',
        borderColor: '#302267',
        color: '#FFFFFF',
        label: 'freeCodeCamp',
        urlPattern: 'https://freecodecamp.org/',
        icon: FreecodeCamp,
        coloredIcon: FreecodeCamp,
        regex: 'https://(www.)?freecodecamp.org/\\w+',
    },
    FRONTEND_MENTOR: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D9D9D9',
        color: '#333333',
        label: 'Frontend Mentor',
        urlPattern: 'https://frontendmentor.io/profile/',
        icon: FrontendMentor,
        coloredIcon: FrontendMentorColored,
        regex: 'https://(www.)?frontendmentor.io/profile/\\w+',
    },
    GITHUB: {
        backgroundColor: '#1A1A1A',
        borderColor: '#1A1A1A',
        color: '#FFFFFF',
        label: 'GitHub',
        urlPattern: 'https://github.com/',
        icon: Github,
        coloredIcon: Github,
        regex: 'https://(www.)?github.com/\\w+',
    },
    GITLAB: {
        backgroundColor: '#EB4925',
        borderColor: '#EB4925',
        color: '#FFFFFF',
        label: 'GitLab',
        urlPattern: 'https://gitlab.com/',
        icon: Gitlab,
        coloredIcon: Gitlab,
        regex: 'https://(www.)?gitlab.com/\\w+',
    },
    HASNODE: {
        backgroundColor: '#0330D1',
        borderColor: '#0330D1',
        color: '#FFFFFF',
        label: 'Hashnode',
        urlPattern: 'https://hashnode.com/@',
        icon: Hashnode,
        coloredIcon: Hashnode,
        regex: 'https://(www.)?hashnode.com/@\\w+',
    },
    LINKEDIN: {
        backgroundColor: '#2D68FF',
        borderColor: '#2D68FF',
        color: '#FFFFFF',
        label: 'LinkedIn',
        urlPattern: 'https://linkedin.com/in/',
        icon: Linkedin,
        coloredIcon: Linkedin,
        regex: 'https://(www.)?linkedin.com/in/\\w+',
    },
    STACK_OVERFLOW: {
        backgroundColor: '#EC7100',
        borderColor: '#EC7100',
        color: '#FFFFFF',
        label: 'Stack Overflow',
        urlPattern: 'https://stackoverflow.com/users/',
        icon: StackOverflow,
        coloredIcon: StackOverflow,
        regex: 'https://(www.)?stackoverflow.com/users\\w+',
    },
    TWITCH: {
        backgroundColor: '#EE3FC8',
        borderColor: '#EE3FC8',
        color: '#FFFFFF',
        label: 'Twitch',
        urlPattern: 'https://twitch.tv/',
        icon: Twitch,
        coloredIcon: Twitch,
        regex: 'https://(www.)?twitch.tv/\\w+',
    },
    TWITTER: {
        backgroundColor: '#43B7E9',
        borderColor: '#43B7E9',
        color: '#FFFFFF',
        label: 'Twitter',
        urlPattern: 'https://twitter.com/',
        icon: Twitter,
        coloredIcon: Twitter,
        regex: 'https://(www.)?twitter.com/\\w+',
    },
    YOUTUBE: {
        backgroundColor: '#EE3939',
        borderColor: '#EE3939',
        color: '#FFFFFF',
        label: 'Youtube',
        urlPattern: 'https://youtube.com/channel/',
        icon: Youtube,
        coloredIcon: Youtube,
        regex: 'https://(www.)?youtube.com/channel/\\w+',
    },
} as const
