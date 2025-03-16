import { JSX, useRef } from 'react'

import { Grid } from '../Grid'
import { useVirtualizer } from '@tanstack/react-virtual'

type VirtualizationProps = {
  items: object[]
  size: number
  component: (props: any) => JSX.Element
  className?: string
  columns?: number // Number of columns in the grid (default: 3)
}

export const Virtualization = ({
  items,
  size,
  component: Component,
  className,
  columns = 3,
}: VirtualizationProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const rows = useVirtualizer({
    count: Math.ceil(items.length / columns),
    getScrollElement: () => containerRef.current,
    estimateSize: () => size,
    overscan: 3,
  })

  return (
    <div className={`overflow-y-auto ${className || ''}`} ref={containerRef}>
      <div
        className='relative flex justify-center'
        style={{
          height: rows.getTotalSize(),
        }}
      >
        {rows.getVirtualItems().map((row, rowIndex) => {
          const startIndex = row.index * columns
          const endIndex = Math.min(startIndex + columns, items.length)
          const rowItems = items.slice(startIndex, endIndex)

          return (
            <div
              key={row.key}
              className='absolute'
              style={{
                top: `${row.start + rowIndex * 8}px`,
              }}
            >
              <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
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
