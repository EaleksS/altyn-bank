import '@/styles/globals.css'
import clsx from 'clsx'
import { Metadata } from 'next'

import { Providers } from './providers'

import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html suppressHydrationWarning lang='ru'>
			<head />
			<body className={clsx('font-sans antialiased', fontSans.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
