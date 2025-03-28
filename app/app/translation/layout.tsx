import { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Перевод',
		template: `%s - Перевод`,
	},
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return children
}
