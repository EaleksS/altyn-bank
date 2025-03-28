import { Button } from '@heroui/button'
import { ArrowDown, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const BtnTranslate: React.FC = () => {
	return (
		<div className='flex gap-3 mt-5 px-3 sm:px-5'>
			<Button
				fullWidth
				className='flex flex-col h-16 gap-[-2px] bg-white'
				radius='lg'
				as={Link}
				href='#'
			>
				<ArrowDown color='plum' />
				Пополнить
			</Button>
			<Button
				fullWidth
				className='flex flex-col h-16 gap-[-2px] bg-white'
				radius='lg'
				as={Link}
				href='/translation'
			>
				<ArrowUp color='green' />
				Вывести
			</Button>
		</div>
	)
}
