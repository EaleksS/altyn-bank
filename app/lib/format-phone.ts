export const formatPhoneNumber = (phoneNumber: string) => {
	phoneNumber = phoneNumber.replace(/\D/g, '').slice(-10)

	return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8)}`
}
