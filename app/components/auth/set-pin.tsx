'use client'

import { api } from '@/service/api.service'
import useAuthStore from '@/store/auth'
import { addToast, Button } from '@heroui/react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { OtpInput } from '../otp-input'

export const SetPin: React.FC = () => {
	const { isPin, token, setIsPin } = useAuthStore()

	const router = useRouter()

	const onSubmit = async (pin: string) => {
		await api
			.setPin(token ?? '', pin)
			.then(res => {
				addToast({
					title: 'Успешно',
					color: 'success',
				})

				setIsPin(false)
			})
			.catch((err: { response: { data: { detail: string } } }) => {
				console.error(err)
				addToast({
					title: 'Ошибка',
					description: err.response?.data?.detail,
					color: 'danger',
				})
			})
			.finally(() => {})
	}

	return (
		<div
			className={clsx(
				'md:w-[450px] w-full z-10 bg-[#fff] shadow-lg md:rounded-3xl p-5 fixed translate-y-[47dvh] md:translate-y-[0] translate-x-[200vh] transition-all',
				{
					['!translate-x-0']: isPin,
				}
			)}
		>
			<Button
				className='absolute right-3 top-3'
				isIconOnly
				size='sm'
				variant='light'
				onPress={() => router.push('/auth')}
			>
				<X />
			</Button>

			<h1 className='text-2xl text-center font-medium text-[#24201E]'>
				Установите ПИН-код
			</h1>
			<p className='text-base text-center text-[#35302F]'>
				Для быстрого входа в систему придумайте короткий пин-код.
			</p>
			<div className='mt-12 w-[220px] mx-auto'>
				<div className='flex gap-4 items-center justify-center '>
					<OtpInput
						length={4}
						onOtpSubmit={pin => onSubmit(pin)}
						type='password'
					/>
				</div>
			</div>
		</div>
	)
}
