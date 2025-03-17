import { JSX, useMemo, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useResponsiveColumns } from '@/hooks/useResponsiveColumns'

type VirtualizationProps<T> = {
  items: T[]
  size: number
  component: (props: { item: T; size: number }) => JSX.Element
  className?: string
  columns?: { base: number; sm?: number; md?: number; lg?: number; xl?: number }
}

export const Virtualization = <T,>({
  items,
  size,
  component: Component,
  className = '',
  columns = { base: 1, sm: 1, md: 1, lg: 2, xl: 3 },
}: VirtualizationProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const columnCount = useResponsiveColumns(columns)

  const rowCount = useMemo(() => Math.ceil(items.length / columnCount), [items.length, columnCount])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => size,
    overscan: 1,
  })

  return (
    <div ref={containerRef} className={`overflow-y-auto ${className}`}>
      <div
        className='relative flex justify-center'
        style={{
          height: rowVirtualizer.getTotalSize(),
        }}
      >
        {rowVirtualizer.getVirtualItems().map(row => {
          const startIndex = row.index * columnCount
          const rowItems = items.slice(startIndex, startIndex + columnCount)

          return (
            <div key={row.index} className='absolute' style={{ top: `${row.start}px` }}>
              <div className={`grid gap-4 grid-cols-${columnCount}`}>
                {rowItems.map((item, columnIndex) => (
                  <div key={`item-${startIndex + columnIndex}`} className='p-2'>
                    <Component item={item} size={size} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
