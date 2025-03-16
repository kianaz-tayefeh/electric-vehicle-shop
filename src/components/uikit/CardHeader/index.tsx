import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/helpers/common.helpers'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return <div className={cn('card-header', className)}>{children}</div>
}
