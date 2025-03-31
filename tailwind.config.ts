
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				medsume: {
					teal: '#00CED1',
					tealLight: '#40E0D0',
					darkGray: '#1A202C',
					mediumGray: '#4A5568',
					lightGray: '#F5F5F5',
					textDark: '#333333',
					textMedium: '#666666',
					watermark: '#A0AEC0',
					navyBlue: '#1A365D',
					gold: '#D4AF37',
					darkBlue: '#2B6CB0',
					// Apple-inspired colors
					appleSilver: '#E4E4E4',
					appleGrey: '#F5F5F7',
					appleBlue: '#0071E3',
					appleBlueLight: '#2997FF',
					appleDarkGrey: '#1D1D1F',
					appleOffWhite: '#FBFBFD',
					// Premium resume colors
					resumeBlue: '#0A2540',
					resumeGold: '#B8860B',
					resumeSilver: '#C0C0C0',
					resumeWhite: '#FFFFFF',
					resumeAccent: '#FF5A5F'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50px)' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-50px)' },
					'100%': { transform: 'translateX(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-in-out forwards',
				'slide-left': 'slide-left 0.5s ease-in-out forwards',
				'slide-right': 'slide-right 0.5s ease-in-out forwards',
				'fade-out': 'fade-out 0.5s ease-in-out forwards',
				'float': 'float 3s ease-in-out infinite'
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				opensans: ['Open Sans', 'sans-serif'],
				garamond: ['Garamond', 'serif'],
				times: ['Times New Roman', 'serif'],
				arial: ['Arial', 'sans-serif'],
				sfpro: ['SF Pro Display', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
			},
			boxShadow: {
				'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'apple-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'resume': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				'resume-hover': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
