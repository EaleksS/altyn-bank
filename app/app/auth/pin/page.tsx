'use client'

import { OtpInput } from '@/components/otp-input'
import { api } from '@/service/api.service'
import { Button } from '@heroui/button'
import { addToast } from '@heroui/react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AuthPin() {
	const router = useRouter()
	const [token] = React.useState(
		typeof window !== 'undefined' ? localStorage.getItem('token') : ''
	)

	React.useEffect(() => {
		if (!!token) {
			router.push('/auth')
		}
	}, [])
	const [isPin, setIsPin] = React.useState(
		typeof window !== 'undefined' && Boolean(localStorage.getItem('isSetPin'))
	)

	const SetPin = React.useMemo(() => {
		const onSubmit = async (pin: string) => {
			await api
				.setPin(token ?? '', pin)
				.then(res => {
					addToast({
						title: 'Успешно',
						color: 'success',
					})

					setIsPin(false)

					if (typeof window !== 'undefined') {
						localStorage.removeItem('isSetPin')
					}
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
	}, [isPin, setIsPin])

	const VerifyPin = React.useMemo(() => {
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
	}, [isPin, setIsPin])

	return (
		<>
			<div className='glow3 backdrop-blur-lg blur-lg'></div>
			<div className='glow2 backdrop-blur-lg blur-lg'></div>
			<div className='glow4'></div>
			<div className='w-full min-h-fulldvh z-20 flex items-center justify-center'>
				{VerifyPin}
				{SetPin}
			</div>
		</>
	)
}
