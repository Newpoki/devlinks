import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const configuredTwMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            /**
             * There is an issue with twMerge that conflcits text colors and font sizes
             * https://github.com/dcastil/tailwind-merge/issues/297#issuecomment-1872546196
             */
            'font-size': ['text-b-s', 'text-b-m', 'text-h-s', 'text-h-m'],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return configuredTwMerge(clsx(inputs))
}
