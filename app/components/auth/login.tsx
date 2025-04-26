'use client'

import { formatPhoneClean } from '@/lib'
import { api } from '@/service/api.service'
import useAuthStore from '@/store/auth'
import { addToast, Button, Input } from '@heroui/react'
import { useMask } from '@react-input/mask'
import clsx from 'clsx'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	phone: string
}

export const Login: React.FC = () => {
	const { otpAnim, setOtpAnim, setPhone, setToken, setTimer } = useAuthStore()

	const [isLoading, setIsLoading] = React.useState(false)

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
				setTimer()
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
