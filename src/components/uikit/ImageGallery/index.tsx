import { useState } from 'react'

import Image from 'next/image'

import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type ImageGalleryProps = {
  images: string[]
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div className='w-full'>
      {/* Main Image Display */}
      <Swiper
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Pagination, Thumbs]}
        className='w-full'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full h-[400px]'>
              <Image
                src={image}
                alt={`Car Image ${index}`}
                layout='fill'
                objectFit='cover'
                className='rounded-lg shadow-md'
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Gallery */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[Thumbs, FreeMode]}
        className='mt-4 w-full'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='cursor-pointer'>
            <div className='relative w-full h-20'>
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                layout='fill'
                objectFit='cover'
                className='rounded-md border-2 border-transparent hover:border-blue-500 transition-all'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
