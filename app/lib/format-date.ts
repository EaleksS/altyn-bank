import { tz } from '@date-fns/tz'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

export const formatDateToReadable = (createdAt: string): string => {
	const date = new Date(createdAt)
	// const day = date.getUTCDate()
	// const monthName = format(date, 'MMMM', { locale: ru })
	// const dayOfWeek = format(date, 'EEE', { locale: ru }).substring(0, 2)

	// return `${day} ${monthName}, ${dayOfWeek}`

	return date.toLocaleString()

	return format(date, 'PPPP', { in: tz('Europe/Moscow'), locale: ru })
}
