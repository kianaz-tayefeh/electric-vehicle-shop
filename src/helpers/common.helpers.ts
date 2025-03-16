import { DEFAULT_DEBOUNCE_TIME, PAGINATION, SORTING_ORDERS } from '@/constants/common.constants'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const isInString = (mainString: string, searchString: string): boolean =>
  mainString?.toLowerCase?.()?.includes(searchString?.toLowerCase?.())

export const sortArray = <T>(array: T[], sortKey: keyof T, sortOrder = SORTING_ORDERS.asc): T[] => {
  return array?.sort((a: any, b: any) => {
    const valA = a[sortKey]
    const valB = b[sortKey]

    if (typeof valA === 'string') {
      return sortOrder === SORTING_ORDERS.asc ? valA.localeCompare(valB) : valB.localeCompare(valA)
    }

    return sortOrder === SORTING_ORDERS.asc ? valA - valB : valB - valA
  })
}

export const paginateArray = <T>(array: T[], page: number) => {
  const totalPages = Math.ceil(array.length / PAGINATION)
  const start = (page - 1) * PAGINATION
  const paginateds = array.slice(start, start + PAGINATION)

  return { totalPages, paginateds }
}

export const getPriceFormat = (price: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

export const debounceMethod = (func: any, debounceTime = DEFAULT_DEBOUNCE_TIME) => {
  if (!func || !debounceTime) return func

  let timer: ReturnType<typeof setTimeout>

  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, debounceTime)
  }
}

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
