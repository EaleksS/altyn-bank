import React from 'react'

interface Props {
	children: React.ReactNode
}

export const TransactionsContainer: React.FC<Props> = ({ children }) => {
	return (
		<div className='flex flex-col gap-3'>
			<p className='text-tiny text-default-400'>Сегодня, 05 фев 2025</p>
			{children}
		</div>
	)
}
