'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'

export const Slider: React.FC = () => {
	return (
		<div className='mt-10'>
			<div className=' relative z-10 flex justify-between px-3 sm:px-5'>
				<h2>Магазин</h2>
				<Link href='.#' className='text-primary'>
					Все
				</Link>
			</div>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={16}
				pagination={{
					clickable: true,
				}}
				className='mySwiper'
			>
				{[1, 2, 3, 4, 5, 6, 7].map(e => (
					<SwiperSlide key={e} className=' shadow-md'>
						<div className=' relative w-[180px] h-[80px]'>
							<Image
								src='/HbDul2iQJ9k.jpg'
								alt='img'
								width={200}
								height={80}
								className=' rounded-[20px_20px_0_0]'
							/>
							<div className=' absolute top-0 bottom-0 right-0 left-0 bg-gray-500/70 rounded-[20px_20px_0_0]'></div>
							<Image
								src='/steam.png'
								alt='steam'
								width={40}
								height={40}
								className='!w-10 !h-10 absolute top-5 left-5'
							/>
						</div>

						<h3 className='mx-3 my-2 text-[15px]'>Steam</h3>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
