import axios from 'axios'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

axios.defaults.baseURL = base_url

interface Login {
	session: string
	detail: string
}

export const api = {
	// [Получение токена]
	async login(phone: string) {
		return await axios.post(`/auth/login/`, { phone: phone }).then(res => {
			return res.data as Login
		})
	},
	// [Запросить код еще раз]
	async resendCode(token: string) {
		return await axios
			.post(
				`/auth/resend-code/`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(res => {
				return res.data
			})
	},
	// [Верефикация номера]
	async verifyPhone(token: string, code: string) {
		return await axios
			.post(
				`/auth/verify-phone/`,
				{ code: code },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(res => {
				return res.data
			})
	},
	// [Верефикация пин-кода]
	async verifyPin(token: string, pin_code: string) {
		return await axios
			.post(
				`/auth/verify-pin/`,
				{ pin_code: pin_code },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(res => {
				return res.data
			})
	},
	// [Создание пин-кода]
	async setPin(token: string, pin_code: string) {
		return await axios
			.post(
				`/auth/set-pin/`,
				{ pin_code: pin_code },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(res => {
				return res.data
			})
	},
}
