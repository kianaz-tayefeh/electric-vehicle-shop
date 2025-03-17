import {
  LG_BREAKPOINT,
  MD_BREAKPOINT,
  SM_BREAKPOINT,
  XL_BREAKPOINT,
} from '@/constants/common.constants'
import { useState, useEffect } from 'react'

type Columns = { base: number; sm?: number; md?: number; lg?: number; xl?: number }

export const useResponsiveColumns = (columns: Columns) => {
  const [columnCount, setColumnCount] = useState(columns.base)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      setColumnCount(
        width >= XL_BREAKPOINT
          ? (columns.xl ?? columns.base)
          : width >= LG_BREAKPOINT
            ? (columns.lg ?? columns.base)
            : width >= MD_BREAKPOINT
              ? (columns.md ?? columns.base)
              : width >= SM_BREAKPOINT
                ? (columns.sm ?? columns.base)
                : columns.base,
      )
    }

    const observer = new ResizeObserver(updateColumns)
    observer.observe(document.body)

    updateColumns()
    return () => observer.disconnect()
  }, [columns])

  return columnCount
}
