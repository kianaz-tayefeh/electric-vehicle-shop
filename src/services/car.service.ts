import { GetServerSidePropsContext } from 'next'

import { SORTING_ORDERS } from '@/constants/common.constants'
import { isInString, paginateArray, sortArray } from '@/helpers/common.helpers'
import { TypeCar } from '@/types/car.type'

import carsData from '../data/vehicle_data.json'

const extractCarQueries = (context: GetServerSidePropsContext) => {
  const { query } = context
  const search = (query.search as string) || ''
  const sort = (query.sort as keyof TypeCar) || 'price'
  const order = (query.order as string) || SORTING_ORDERS.asc
  const page = parseInt(query.page as string) || 1

  return { search, sort, order, page }
}

export const getCarsData = (context: GetServerSidePropsContext) => {
  const { search, sort, order, page } = extractCarQueries(context)

  const cars = carsData.data
  const filteredCars = cars.filter(
    car => isInString(car.brand, search) || isInString(car.model, search),
  )
  const sortedCars = sortArray(filteredCars, sort, order)
  const { totalPages, paginateds: paginatedCars } = paginateArray(sortedCars, page)

  return {
    props: {
      cars: paginatedCars,
      search,
      sort,
      order,
      page,
      totalPages,
    },
  }
}

export const getCarById = (context: GetServerSidePropsContext) => {
  const cars = carsData.data
  const car = cars.find(car => car.id === context.params?.id) || {}

  return {
    props: {
      car,
    },
  }
}
