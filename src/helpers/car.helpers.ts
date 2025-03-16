import { SORTING_ORDERS } from '@/constants/common.constants'
import { TypeCar } from '@/types/car.type'
import { GetServerSidePropsContext } from 'next'

export const extractCarQueries = (context: GetServerSidePropsContext) => {
  const { query } = context
  const search = (query.search as string) || ''
  const sort = (query.sort as keyof TypeCar) || 'price'
  const order = (query.order as string) || SORTING_ORDERS.asc
  const page = parseInt(query.page as string) || 1

  return { search, sort, order, page }
}
