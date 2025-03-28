import { Header } from '@/components/header'
import { InfoCard } from '@/components/info-card'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'

export default function Home() {
	return (
		<div className='w-full md:w-[450px] md:mx-auto md:rounded-3xl md:overflow-hidden bg-[#F6F6F6] min-h-fulldvh shadow-lg'>
			<div className='relative '>
				<div className='glow3 backdrop-blur-lg blur-lg'></div>
				<div className='glow2 backdrop-blur-lg blur-lg'></div>
				<div className='glow'></div>
				<Header />
				<h2 className='mt-5 relative z-10 px-3 sm:px-5 text-xl font-semibold'>
					Счет списание
				</h2>
				<InfoCard className='mt-1' />
				<div className='px-3 sm:px-5 my-10 flex flex-col justify-between '>
					<div className='flex flex-col gap-3 flex-1'>
						<Input
							label='Получатель'
							placeholder='Введите номер получателя'
							size='lg'
							type='number'
							classNames={{
								inputWrapper: 'bg-white',
							}}
						/>
						<Input
							label='Сумма перевода'
							placeholder='Введите сумму перевода'
							size='lg'
							type='number'
							classNames={{
								inputWrapper: 'bg-white',
							}}
						/>
						<Textarea
							label='Сообщение получателю'
							size='md'
							type='text'
							classNames={{
								inputWrapper: 'bg-white',
								label: 'text-yellow-400',
							}}
						/>
						<Button
							color='warning'
							fullWidth
							size='lg'
							className='bg-yellow-400'
						>
							Продолжить
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
