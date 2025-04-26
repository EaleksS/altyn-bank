import { Login } from '@/components/auth/login'
import { OTPLogin } from '@/components/auth/otp-login'

export default function Auth() {
	return (
		<>
			<div className='glow3 backdrop-blur-lg blur-lg'></div>
			<div className='glow2 backdrop-blur-lg blur-lg'></div>
			<div className='glow4'></div>
			<div className='w-full min-h-fulldvh z-20 flex items-center justify-center '>
				<Login />
				<OTPLogin />
			</div>
		</>
	)
}
