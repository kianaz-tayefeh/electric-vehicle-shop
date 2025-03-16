import { extractCarQueries } from '@/helpers/car.helpers'
import { GetServerSidePropsContext } from 'next'
import carsData from '../data/vehicle_data.json'
import { isInString, paginateArray, sortArray } from '@/helpers/common.helpers'

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

export const getCarData = (context: GetServerSidePropsContext) => {
  console.log('1 context', context)
  const cars = carsData.data
  const car = cars.find(car => car.model === context.params?.id) || {}

  return {
    props: {
      car,
    },
  }
}
