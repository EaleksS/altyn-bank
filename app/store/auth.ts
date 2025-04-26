import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
	token: string
	phone: string
	otpAnim: boolean
	isPin: boolean
	timer: number
	setToken: (token: string) => void
	setPhone: (phone: string) => void
	setOtpAnim: (otpAnim: boolean) => void
	setIsPin: (isPin: boolean) => void
	setTimer: (timer?: number) => void
}

const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			token: '',
			phone: '',
			otpAnim: false,
			isPin: false,
			timer: 0,
			setToken: token => {
				set({ token: token })
			},
			setPhone: phone => {
				set({ phone: phone })
			},
			setOtpAnim: otpAnim => {
				set({ otpAnim: otpAnim })
			},
			setIsPin: isPin => {
				set({ isPin: isPin })
			},
			setTimer: timer => {
				if (timer === 0) {
					return set({ timer: 0 })
				}
				set({ timer: Date.now() + 300000 })
			},
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)

export default useAuthStore
