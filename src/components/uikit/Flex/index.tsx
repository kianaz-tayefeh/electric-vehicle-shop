import { HTMLAttributes } from 'react'

import { cn } from '@/helpers/common.helpers'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?:
    | 'row'
    | 'col'
    | { base: 'row' | 'col'; sm?: 'row' | 'col'; md?: 'row' | 'col'; lg?: 'row' | 'col' }
  wrap?: boolean
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Flex: React.FC<FlexProps> = ({
  className,
  direction = 'row',
  wrap = false,
  gap = '6',
  justify = 'start',
  align = 'start',
  children,
  ...props
}) => {
  const baseDirection = typeof direction === 'string' ? direction : direction.base || 'row'

  const flexClasses = cn(
    'flex',
    baseDirection === 'col' ? 'flex-col' : 'flex-row',
    typeof direction === 'object'
      ? [
          direction.sm ? `sm:flex-col` : '',
          direction.md ? `md:flex-row` : '',
          direction.lg ? `lg:flex-${direction.lg}` : '',
        ].join(' ')
      : '',
    wrap ? 'flex-wrap' : 'flex-nowrap',
    `gap-${gap}`,
    `justify-${justify}`,
    `items-${align}`,
    className,
  )

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  )
}
