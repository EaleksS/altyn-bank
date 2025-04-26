'use client'

import { Input } from '@heroui/input'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

interface OtpInputProps {
	length?: number
	onOtpSubmit?: (otp: string) => void
	type?: 'password' | 'text'
	variant?: 'bordered' | 'flat' | 'faded' | 'underlined' | undefined
	className?: string
}

export const OtpInput: React.FC<OtpInputProps> = ({
	length = 4,
	onOtpSubmit = () => {},
	type = 'text',
	variant = 'bordered',
	className = '',
}) => {
	const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0]?.focus()
		}
	}, [])

	const handleChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value
		if (isNaN(Number(value))) return

		const newOtp = [...otp]

		if (value.length === length) {
			setOtp(value.split(''))
			inputRefs.current[length - 1]?.focus()

			return onOtpSubmit(value)
		}

		newOtp[index] = value.substring(value.length - 1)
		setOtp(newOtp)

		const combinedOtp = newOtp.join('')
		if (combinedOtp.length === length) onOtpSubmit(combinedOtp)

		if (value && index < length - 1 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleClick = (index: number) => {
		if (inputRefs.current[index]) {
			inputRefs.current[index].setSelectionRange(1, 1)
		}

		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf('')]?.focus()
		}
	}

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (
			e.key === 'Backspace' &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	return (
		<>
			{otp.map((value, index) => (
				<Input
					key={index}
					type={type}
					ref={input => {
						inputRefs.current[index] = input as HTMLInputElement
						return
					}}
					variant={variant}
					value={value}
					onChange={e => handleChange(index, e)}
					onClick={() => handleClick(index)}
					onKeyDown={e => handleKeyDown(index, e)}
					className={clsx('otpInput', className)}
					classNames={{
						input: 'text-center',
					}}
					inputMode='numeric'
				/>
			))}
		</>
	)
}
