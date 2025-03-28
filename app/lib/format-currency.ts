export const formatCurrency = (currencyString: string) => {
	const priceStr = parseFloat(`${currencyString}`).toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
	})

	if (priceStr.includes(',00')) return `${priceStr.slice(0, -5)} ₽`

	return priceStr
}
