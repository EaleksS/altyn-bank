import { Button } from '@heroui/button'
import { EllipsisVertical, X } from 'lucide-react'
import React from 'react'

export const Header: React.FC = () => {
	return (
		<header className='flex justify-between relative z-10 px-3 pt-5 sm:px-5 sm:p-5'>
			<div>
				<h2 className='font-semibold'>Altyn Wallet</h2>
				<p className=' text-tiny text-gray-500'>мини-приложение</p>
			</div>
			<div>
				<Button variant='light' size='sm' isIconOnly>
					<EllipsisVertical size={19} />
				</Button>
				<Button variant='light' size='sm' isIconOnly>
					<X size={19} />
				</Button>
			</div>
		</header>
	)
}
