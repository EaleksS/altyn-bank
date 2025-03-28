import { Card, CardBody, CardHeader, cn, Image, Skeleton } from '@heroui/react'
import React from 'react'
import { formatCurrency } from '../lib'

const LogoBank = (process.env.NEXT_PUBLIC_LOGO_URL as string) || ''

interface Props {
	className?: string
}

export const TranslationCard: React.FC<Props> = ({ className }) => {
	const statusMessage = React.useCallback((status: string) => {
		switch (status) {
			case '2':
				return <p className='text-tiny text-success'>Успех</p>
			case '6':
				return <p className='text-tiny text-danger'>Ошибка</p>
			case '0':
				return <p className='text-tiny text-orange-500'>Создан</p>
			case '1':
				return <p className='text-tiny text-warning'>В процессе</p>
			default:
				return <p className='text-tiny'>{status}</p>
		}
	}, [])

	const priceMessage = React.useCallback((type: string, amount = '0') => {
		switch (type) {
			case '0':
				return (
					<p className='text-small text-success'>+{formatCurrency(amount)}</p>
				)
			case '1':
				return <p className='text-small'>-{formatCurrency(amount)}</p>
			default:
				return <p className='text-small'>{formatCurrency(amount)}</p>
		}
	}, [])

	const methodMessage = React.useCallback((method: string) => {
		switch (method) {
			case 'tbank':
				return (
					<p className='text-tiny text-default-400'>Перевод через Т-Банк</p>
				)
			case 'sber':
				return <p className='text-tiny text-default-400'>Перевод через сбер</p>
			case 'arpa':
				return (
					<p className='text-tiny text-default-400'>Перевод по картам Arpa</p>
				)
			case 'buy':
				return <p className='text-tiny text-default-400'>Покупка</p>
			case 'other':
				return <p className='text-tiny text-default-400'>Прочее</p>
			case 'internal':
				return <p className='text-tiny text-default-400'>Внутри банка</p>
			default:
				return <p className='text-tiny text-default-400'>{method}</p>
		}
	}, [])

	const methodImage = React.useCallback((method: string) => {
		switch (method) {
			case 'tbank':
				return 'https://avatars.mds.yandex.net/i?id=3b039432b0b38ebaf4682b1304b1109a5fb0385f-5233229-images-thumbs&n=13'
			case 'sber':
				return 'https://i3.photo.2gis.com/images/branch/0/30258560090921631_44a6.jpg'
			case 'arpa':
				return 'https://eraberani.ru/image/cache/catalog/banner/arpa-main-400x400.jpg'
			case 'buy':
				return 'https://avatars.mds.yandex.net/i?id=a8178cb1e5818368a3723ce83dcf61957fa3b659-7084983-images-thumbs&n=13'
			case 'other':
				return 'https://avatars.mds.yandex.net/i?id=f265412c0795c76b3a643d61949d9481_l-5289254-images-thumbs&n=13'
			case 'internal':
				return LogoBank || ''
			default:
				return 'https://avatars.mds.yandex.net/i?id=f265412c0795c76b3a643d61949d9481_l-5289254-images-thumbs&n=13'
		}
	}, [])

	return (
		<Card className={cn('border-b-2')} shadow='none' radius='none'>
			<CardBody className='gap-3 flex flex-row justify-between items-center px-0'>
				<div className='flex gap-3 items-center'>
					<Image width={40} height={40} radius='full' src='/steam.png' />
					<div className='flex flex-col gap-1'>
						<p className='text-small'>TWBWD****</p>
						<div className='flex gap-2 items-center'>
							<p className='text-tiny text-default-400'>15:07</p>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-end'>
					{priceMessage('0', '1200')}
					{Number(2) > 0 && (
						<p className='text-tiny text-default-400'>
							Коммисия: {formatCurrency('2')}
						</p>
					)}
				</div>
			</CardBody>
		</Card>
	)
}

interface PropsSkeleton {
	className?: string
}

export const TranslationCardSkeleton: React.FC<PropsSkeleton> = ({
	className,
}) => {
	return (
		<Card className={cn('bg-default-100 shadow-md', className)} shadow='none'>
			<CardHeader className='justify-between text-small'>
				<Skeleton className='w-3/5 rounded-lg'>
					<div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
				</Skeleton>
			</CardHeader>

			<CardBody className='gap-3 flex flex-row justify-between items-center'>
				<div className='flex gap-3 items-center'>
					<div>
						<Skeleton className='flex rounded-full w-10 h-10' />
					</div>
					<div className='w-[200px] flex flex-col gap-2'>
						<Skeleton className='h-3 w-3/5 rounded-lg' />
						<Skeleton className='h-3 w-4/5 rounded-lg' />
					</div>
				</div>
				<div className='w-[80px]'>
					<Skeleton className='h-4 w-full rounded-lg' />
				</div>
			</CardBody>
		</Card>
	)
}
