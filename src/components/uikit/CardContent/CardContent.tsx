import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/helpers/common.helpers'

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn('p-4', className)}>{children}</div>
}
