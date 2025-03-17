import { ReactNode } from 'react'

import { cn } from '@/helpers/common.helpers'

type BadgeProps = {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  className?: string
  children: ReactNode
}

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => {
  return <span className={cn('badge', `badge-${variant}`, className)}>{children}</span>
}
