'use client'

import { OtpInput } from '@/components/otp-input'
import { formatPhoneClean } from '@/lib'
import { api } from '@/service/api.service'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { addToast } from '@heroui/react'
import { useMask } from '@react-input/mask'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Countdown from 'react-countdown'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	phone: string
}

export default function Auth() {
	const router = useRouter()

	const [isLoading, setIsLoading] = React.useState(false)
	const [isLoadingToken, setIsLoadingToken] = React.useState(false)
	const [token, setToken] = React.useState('')
	const [phone, setPhone] = React.useState('')

	const inputRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ },
		track: ({ data }) => {
			const phone = formatPhoneClean(data || '')
			if (phone.length === 11) {
				return phone.slice(1)
			}

			return data
		},
	})

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()

	const { ref, ...rest } = register('phone', {
		required: 'Обязательное поле',
		minLength: { value: 18, message: 'Номер введен некорректно' },
		maxLength: { value: 18, message: 'Номер введен некорректно' },
	})

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setIsLoading(true)
		setPhone(data.phone)

		await api
			.login(data.phone)
			.then(res => {
				typeof window !== 'undefined' &&
					localStorage.setItem('token', res.session)
				setToken(res.session)

				addToast({
					title: 'Успешно',
					description: res.detail,
					color: 'success',
				})

				setOtpAnim(true)
			})
			.catch((err: { response: { data: { detail: string } } }) => {
				console.error(err)
				addToast({
					title: 'Ошибка',
					description: err.response?.data?.detail,
					color: 'danger',
				})
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const [otpAnim, setOtpAnim] = React.useState(false)

	const OtpCompontent = () => {
		const onSubmitToken = async (pin: string) => {
			setIsLoadingToken(true)

			await api
				.verifyPhone(token, pin)
				.then(res => {
					typeof window !== 'undefined' &&
						localStorage.setItem('isSetPin', 'true')

					addToast({
						title: 'Успешно',
						color: 'success',
					})

					router.push('/auth/pin')
				})
				.catch((err: { response: { data: { detail: string } } }) => {
					console.error(err)
					addToast({
						title: 'Ошибка',
						description: err.response?.data?.detail,
						color: 'danger',
					})
				})
				.finally(() => {
					setIsLoadingToken(false)
				})

			setIsLoadingToken(false)
		}

		const renderer = ({
			minutes,
			seconds,
			completed,
		}: {
			minutes: number
			seconds: number
			completed: boolean
		}) => {
			if (completed) {
				return 'Отправить'
			} else {
				return (
					<>
						Отправить еще раз через {minutes}:{seconds}, мин.
					</>
				)
			}
		}

		const resendCode = async () => {
			await api
				.resendCode(token)
				.then(e => {
					addToast({
						title: 'Успешно',
						description: 'Код отправлен',
						color: 'success',
					})
				})
				.catch((err: { response: { data: { detail: string } } }) => {
					addToast({
						title: 'Ошибка',
						description: err.response?.data.detail,
						color: 'success',
					})
				})
		}

		return (
			<div
				className={clsx(
					'md:w-[450px] w-full z-10 bg-[#fff] shadow-lg border-red-50 md:rounded-3xl p-5 fixed translate-y-[47dvh] md:translate-y-[0] translate-x-[200vh] transition-all',
					{ ['!translate-x-[0]']: otpAnim }
				)}
			>
				<Button
					className='absolute right-3 top-3'
					isIconOnly
					size='sm'
					variant='light'
					onPress={() => setOtpAnim(false)}
				>
					<X />
				</Button>

				<h1 className='text-2xl text-center font-medium text-[#24201E]'>
					Введите код из SMS
				</h1>
				<p className='text-base text-center text-[#35302F]'>
					Код отправлен на номер {phone}
				</p>
				<div className='mt-12 w-[320px] mx-auto'>
					<div className='flex gap-4 items-center justify-center '>
						<OtpInput length={6} onOtpSubmit={pin => onSubmitToken(pin)} />
					</div>
					<p className='text-sm text-center mt-4'>Не пришел код?</p>
					<Button
						variant='light'
						fullWidth
						color='warning'
						onPress={resendCode}
					>
						<Countdown date={Number(Date.now() + 300000)} renderer={renderer} />
					</Button>
				</div>
			</div>
		)
	}

	const LoginCompontent = () => {
		return (
			<div
				className={clsx(
					'block md:w-[450px] w-full z-10 bg-[#fff] shadow-lg md:rounded-3xl fixed translate-y-[47dvh] md:translate-y-[0] p-5   transition-all',
					{ ['translate-x-[-200vh]']: otpAnim }
				)}
			>
				<h1 className='text-2xl text-center font-medium text-[#24201E]'>
					Добро пожаловать
				</h1>
				<p className='text-base text-center text-[#35302F]'>
					Зарегистрируйтесь или войдите
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
					<Input
						label='Введите свой номер телефона'
						labelPlacement='outside'
						placeholder='+7'
						type='tel'
						variant='bordered'
						color='warning'
						isInvalid={!!errors.phone?.message}
						errorMessage={errors.phone?.message}
						{...rest}
						ref={(e: HTMLInputElement) => {
							ref(e)
							inputRef.current = e
						}}
						classNames={{ label: 'text-[#35302F]' }}
					/>
					<p className='text-sm text-[#B9B7B7]'>
						Используется для связи и уведомлений
					</p>
					<Button
						variant='flat'
						color='warning'
						className='mt-4'
						fullWidth
						isLoading={isLoading}
						type='submit'
					>
						Продолжить
					</Button>
				</form>
			</div>
		)
	}

	return (
		<>
			<div className='glow3 backdrop-blur-lg blur-lg'></div>
			<div className='glow2 backdrop-blur-lg blur-lg'></div>
			<div className='glow4'></div>
			<div className='w-full min-h-fulldvh z-20 flex items-center justify-center '>
				{LoginCompontent()}
				{OtpCompontent()}
			</div>
		</>
	)
}
