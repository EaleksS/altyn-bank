export const formatPhoneClean = (phone: string) => {
	return phone
		.replaceAll('+', '')
		.replaceAll(')', '')
		.replaceAll('(', '')
		.replaceAll('-', '')
		.replaceAll(' ', '')
}