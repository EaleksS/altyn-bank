'use client'

import CountdownTimer from '@/lib/timer'
import { api } from '@/service/api.service'
import useAuthStore from '@/store/auth'
import { addToast, Button } from '@heroui/react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { OtpInput } from '../otp-input'

export const OTPLogin: React.FC = () => {
	const { token, otpAnim, phone, setOtpAnim, setIsPin, timer, setTimer } =
		useAuthStore()

	const router = useRouter()
	const [isLoadingToken, setIsLoadingToken] = React.useState(false)

	const onSubmitToken = async (pin: string) => {
		setIsLoadingToken(true)

		await api
			.verifyPhone(token || '', pin)
			.then(res => {
				setIsPin(true)

				addToast({
					title: 'Успешно',
					color: 'success',
				})

				setOtpAnim(false)

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

	const resendCode = async () => {
		await api
			.resendCode(token || '')
			.then(e => {
				setTimer()
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

	const { minutes, seconds } = CountdownTimer({ targetDate: timer })

	React.useLayoutEffect(() => {
		if (timer - 1000 <= Date.now()) {
			setTimer(0)
		}
	}, [minutes, seconds])

	const timers = React.useMemo(() => {
		return `Отправить еще раз через ${minutes}:${seconds} мин.`
	}, [seconds])

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
					onPress={() => {
						if (timer === 0) resendCode()
					}}
				>
					{timer === 0 ? 'Отправить еще раз' : timers}
				</Button>
			</div>
		</div>
	)
}
