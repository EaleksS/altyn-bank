import { SetPin } from '@/components/auth/set-pin'
import { VerifyPin } from '@/components/auth/verify-pin'

export default function AuthPin() {
	return (
		<>
			<div className='glow3 backdrop-blur-lg blur-lg'></div>
			<div className='glow2 backdrop-blur-lg blur-lg'></div>
			<div className='glow4'></div>
			<div className='w-full min-h-fulldvh z-20 flex items-center justify-center'>
				<VerifyPin />
				<SetPin />
			</div>
		</>
	)
}
