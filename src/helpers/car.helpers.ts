import { CAR_SORTING_KEYS } from '@/constants/car.contacts'
import { SORTING_ORDERS } from '@/constants/common.constants'
import { TypeCar } from '@/types/car.type'
import { GetServerSidePropsContext } from 'next'

export const extractCarQueries = (context: GetServerSidePropsContext) => {
  const { query } = context
  const search = (query.search as string) || ''
  const sortKey = (query.sort as keyof TypeCar) || CAR_SORTING_KEYS.name
  const sortOrder = (query.order as string) || SORTING_ORDERS.asc
  const page = parseInt(query.page as string) || 1

  return { search, sortKey, sortOrder, page }
}
