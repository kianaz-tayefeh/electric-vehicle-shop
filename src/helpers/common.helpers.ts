import { PAGINATION, SORTING_ORDERS } from '@/constants/common.constants'

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
