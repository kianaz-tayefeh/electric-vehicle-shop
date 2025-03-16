import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/helpers/common.helpers'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const CardFooter = ({ className, children }: CardFooterProps) => {
  return <div className={cn('card-footer', className)}>{children}</div>
}
