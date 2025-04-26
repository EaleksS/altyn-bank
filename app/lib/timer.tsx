import { useEffect, useState } from 'react'

interface Props {
	targetDate: number
}

const CountdownTimer = ({ targetDate }: Props) => {
	const calculateTimeLeft = () => {
		const difference = targetDate - Date.now()
		let timeLeft = {
			minutes: 0,
			seconds: 0,
		}

		if (difference > 0) {
			timeLeft = {
				minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((difference % (1000 * 60)) / 1000),
			}
		} else {
			timeLeft = {
				minutes: 0,
				seconds: 0,
			}
		}
		return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(timer)
	}, [targetDate])

	return { minutes: timeLeft.minutes, seconds: timeLeft.seconds }
}

export default CountdownTimer
