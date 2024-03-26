import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        colors: {
            purple: {
                100: '#EFEBFF',
                300: '#BEADFF',
                500: '#633CFF',
            },
            grey: {
                100: '#FAFAFA',
                300: '#D9D9D9',
                500: '#737373',
                900: '#333333',
            },
            white: '#FFFFFF',
            transparent: 'transparent',
            red: {
                500: '#FF3939',
            },
        },
        fontFamily: {
            sans: ['var(--font-sans)'],
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            md: '768px',
            lg: '1440px',
        },
        fontSize: {
            'b-s': [
                '12px',
                {
                    fontWeight: '400',
                    lineHeight: '150%',
                },
            ],
            'b-m': [
                '16px',
                {
                    fontWeight: '400',
                    lineHeight: '150%',
                },
            ],
            'h-s': [
                '16px',
                {
                    fontWeight: '600',
                    lineHeight: '150%',
                },
            ],
            'h-m': [
                '32px',
                {
                    fontWeight: '700',
                    lineHeight: '150%',
                },
            ],
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
