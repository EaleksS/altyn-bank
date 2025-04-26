'use client'

import useAuthStore from '@/store/auth'
import { addToast, Button } from '@heroui/react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { OtpInput } from '../otp-input'

export const VerifyPin: React.FC = () => {
	const { isPin, token } = useAuthStore()

	const router = useRouter()

	const onSubmit = async (pin: string) => {
		await signIn('credentials', {
			otp: pin,
			token: token,
			redirect: false,
		})
			.then(response => {
				console.log(response)
				if (response?.error) {
					addToast({
						title: 'Пин-код неверный.',
						color: 'danger',
					})
					return
				}

				addToast({
					title: 'Успешно',
					color: 'success',
				})
				router.push('/')
			})
			.catch(error => {
				console.error(error)
				addToast({
					title: error.message,
				})
			})
			.finally(() => {})
	}

	return (
		<div
			className={clsx(
				'md:w-[450px] w-full z-10 bg-[#fff] shadow-lg md:rounded-3xl translate-y-[47dvh] md:translate-y-[0] p-5 fixed transition-all',
				{
					['translate-x-[-200vh]']: isPin,
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
				Введите пин-код
			</h1>
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
