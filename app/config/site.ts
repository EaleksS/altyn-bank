export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: 'Next.js + HeroUI',
	description: 'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Главная',
			href: '/',
		},
		{
			label: 'Перевод',
			href: '/translation',
		},
	],
}
