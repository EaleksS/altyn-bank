import { cn } from '@heroui/theme'
import Image from 'next/image'
import React from 'react'

interface Props {
	className?: string
}

export const InfoCard: React.FC<Props> = ({ className }) => {
	return (
		<>
			<div
				className={cn(
					'mt-5 flex justify-between items-center relative z-10 px-3 sm:px-5',
					className
				)}
			>
				<div>
					<h1 className='text-2xl'>1 600 468.98 P</h1>
					<p className='text-sm '>Счёт •• 3467</p>
				</div>
				<div className='bg-[#E2EAF0] h-10 w-14 rounded-md py-0.5 px-1'>
					<Image src='/shopping.png' width={20} height={20} alt='bank' />
					<div className='flex justify-between items-center'>
						<p className='text-[11px] opacity-60'>2823</p>
						<div className='bg-white w-2.5 h-1.5 rounded-sm'></div>
					</div>
				</div>
			</div>
		</>
	)
}
