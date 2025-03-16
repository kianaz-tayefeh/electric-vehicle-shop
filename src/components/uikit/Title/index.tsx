import { ElementType, HTMLAttributes } from 'react'

import { cn } from '@/helpers/common.helpers'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  order?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Title: React.FC<TitleProps> = ({ order = 4, children, className, ...props }) => {
  const HeadingTag: ElementType = `h${order}`
  return (
    <div className={cn('mb-4', className)} {...props}>
      <HeadingTag className='text-xl font-semibold'>{children}</HeadingTag>
    </div>
  )
}
