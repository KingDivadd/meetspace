// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
        colors: {
            'white-25': 'rgba(255, 255, 255, 0.25)',
            'blue-5000': "#0E78F9"
        },
        },
    },
    plugins: [],
}

export default config
