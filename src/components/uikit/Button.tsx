import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/helpers/common.helpers'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) => <button className={cn('btn', `btn-${variant}`, `btn-${size}`, className)} {...props} />
