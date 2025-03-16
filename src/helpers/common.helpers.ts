import { DEFAULT_DEBOUNCE_TIME, PAGINATION, SORTING_ORDERS } from '@/constants/common.constants'

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

export const getPriceFormat = (
  propPrice: string | number,
  decimalSeparator = ',',
  thousandSeparator = '.',
) => {
  const price = propPrice?.toString?.()

  if (!price || price.trim() === '') return ''

  let [integerPart, decimalPart] = price.split('.')

  if (isNaN(Number(integerPart))) return ''

  const thousandsRegex = /(\d+)(\d{3})/
  while (thousandsRegex.test(integerPart)) {
    integerPart = integerPart.replace(thousandsRegex, '$1' + thousandSeparator + '$2')
  }

  if (decimalPart !== undefined) {
    decimalPart = decimalPart.replace(/[^0-9]/g, '')
    decimalPart = decimalPart.substring(0, 2)
  }

  if (price.slice(-1) === '.' && decimalSeparator === ',') {
    return `${integerPart}${decimalSeparator}`
  }

  return decimalPart !== undefined ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart
}

export function debounceMethod(func: any, debounceTime = DEFAULT_DEBOUNCE_TIME) {
  if (!func || !debounceTime) return func

  let timer: ReturnType<typeof setTimeout>

  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, debounceTime)
  }
}
