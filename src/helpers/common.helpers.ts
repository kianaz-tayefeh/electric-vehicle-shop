import { DEFAULT_DEBOUNCE_TIME, PAGINATION, SORTING_ORDERS } from '@/constants/common.constants'

export const isInString = (mainString: string, searchString: string): boolean =>
  mainString?.toLowerCase?.()?.includes(searchString?.toLowerCase?.())

export const sortArray = <T, K extends keyof T>(
  array: T[],
  key: K,
  order = SORTING_ORDERS.asc,
): T[] =>
  [...array].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]

    return typeof valA === 'string'
      ? order === SORTING_ORDERS.asc
        ? valA.localeCompare(valB as string)
        : (valB as string).localeCompare(valA)
      : order === SORTING_ORDERS.asc
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number)
  })

export const paginateArray = <T>(array: T[], page: number) => {
  const totalPages = Math.ceil(array.length / PAGINATION)
  const start = (page - 1) * PAGINATION
  const paginateds = array.slice(start, start + PAGINATION)

  return { totalPages, paginateds }
}

export const getPriceFormat = (price: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

export const debounceMethod = <T extends (...args: any[]) => void>(
  func: T,
  time = DEFAULT_DEBOUNCE_TIME,
) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), time)
  }
}

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}
