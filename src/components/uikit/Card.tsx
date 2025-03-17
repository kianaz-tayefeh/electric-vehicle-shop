import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/helpers/common.helpers'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn('card', className)}>
      <div className='card-content'>{children}</div>
    </div>
  )
}
