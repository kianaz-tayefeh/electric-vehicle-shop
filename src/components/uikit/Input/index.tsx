import * as React from 'react'

import { cn } from '@/helpers/common.helpers'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', icon, ...props }, ref) => (
    <div className='input-wrapper'>
      {icon && <div className='input-icon'>{icon}</div>}
      <input
        type={type}
        className={cn('input', icon ? 'pl-10' : '', className)}
        ref={ref}
        {...props}
      />
    </div>
  ),
)

Input.displayName = 'Input'
