import '@/styles/globals.css'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import { Providers } from './providers'

import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import { headers } from 'next/headers'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
}

export async function generateViewport(): Promise<Viewport> {
	const userAgent = (await headers()).get('user-agent')
	const isiPhone = /iphone/i.test(userAgent ?? '')
	return isiPhone
		? {
				width: 'device-width',
				initialScale: 1,
				maximumScale: 1, // disables auto-zoom on ios safari
			}
		: {}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html suppressHydrationWarning lang='ru'>
			<head />
			<body
				className={clsx(
					'font-sans antialiased !overflow-x-hidden',
					fontSans.variable
				)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
