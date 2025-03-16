import { useState } from 'react'

import Image from 'next/image'

import {
  IMAGE_LOADER_MINIMUM_TIME_FOR_ANIMATION,
  IMAGE_LOADER_STATES,
} from '@/constants/image.constants'
import { cn } from '@/helpers/common.helpers'

import './image-loader.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export type ImageLoaderProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

export const ImageLoader = (props: ImageLoaderProps) => {
  const { src, alt = 'image', className, width, height } = props

  const [imageState, setImageState] = useState(IMAGE_LOADER_STATES.loading)
  const [mountingTime] = useState(new Date().getTime())

  const handleLoadImage = () => {
    const loadedTime = new Date().getTime() - mountingTime
    setImageState(
      loadedTime < IMAGE_LOADER_MINIMUM_TIME_FOR_ANIMATION
        ? IMAGE_LOADER_STATES.cached
        : IMAGE_LOADER_STATES.loaded,
    )
  }

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      {imageState === IMAGE_LOADER_STATES.loading && <Skeleton width={width} height={height} />}
      <Image
        src={src}
        onLoad={handleLoadImage}
        alt={alt}
        width={width}
        height={height}
        priority
        className={`image ${imageState === IMAGE_LOADER_STATES.loading && 'loading'}
          ${imageState === IMAGE_LOADER_STATES.cached && 'cached'}
        `}
      />
    </div>
  )
}
