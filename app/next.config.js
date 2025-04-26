/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_BASE_URL: process.env.BASE_URL || 'APP_NEXT_PUBLIC_BASE_URL',
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_PUBLIC_BASE_URL_SITE: process.env.BASE_URL_SITE || 'APP_NEXT_PUBLIC_BASE_URL_SITE'
	},
}

module.exports = nextConfig
