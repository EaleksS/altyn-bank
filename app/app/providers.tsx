'use client'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export interface ProvidersProps {
	children: React.ReactNode
}

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>['push']>[1]
		>
	}
}

export function Providers({ children }: ProvidersProps) {
	const router = useRouter()

	return (
		<HeroUIProvider navigate={router.push}>
			<ToastProvider placement='top-center' />
			{children}
		</HeroUIProvider>
	)
}
