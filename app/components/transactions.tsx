'use client'

import Link from 'next/link'
import React from 'react'
import { TranslationCard } from './translation-card'

export const Transactions: React.FC = () => {
	return (
		<div className='mt-10 px-3 sm:px-5'>
			<div className=' relative z-10 flex justify-between'>
				<h2>Транзакции</h2>
				<Link href='.#' className='text-primary'>
					Все
				</Link>
			</div>
			<div className=' flex flex-col gap-3 bg-white px-5 mt-5 rounded-2xl pt-2'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(e => (
					<TranslationCard key={e} />
				))}
			</div>
		</div>
	)
}
