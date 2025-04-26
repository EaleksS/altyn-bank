import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Altyn Bank',
		short_name: 'NextPWA',
		description: 'A Progressive Web App built with Next.js',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
		],
	}
}
