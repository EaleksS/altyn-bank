import { BtnTranslate } from '@/components/btn-translate'
import { Header } from '@/components/header'
import { InfoCard } from '@/components/info-card'
import { Slider } from '@/components/slider'
import { Transactions } from '@/components/transactions'

export default function Home() {
	return (
		<div className='w-full md:w-[450px] md:mx-auto md:rounded-3xl md:overflow-hidden bg-[#F6F6F6] min-h-fulldvh shadow-lg'>
			<div className='relative'>
				<div className='glow3 backdrop-blur-lg blur-lg'></div>
				<div className='glow2 backdrop-blur-lg blur-lg'></div>
				<div className='glow'></div>
				<Header />
				<InfoCard />
				<BtnTranslate />
				<Slider />
				<Transactions />
			</div>
		</div>
	)
}
