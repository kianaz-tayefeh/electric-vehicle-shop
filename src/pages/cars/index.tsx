import Head from 'next/head'
import carsData from '../../data/vehicle_data.json'
import { GetServerSidePropsContext } from 'next'
import { TypeCar } from '@/types/car.type'
import { isInString, paginateArray, sortArray } from '@/helpers/common.helpers'
import { extractCarQueries } from '@/helpers/car.helpers'

type CarsProps = {
  cars: TypeCar[]
}

export default function Cars(props: CarsProps) {
  const { cars } = props
  console.log('1 cars', cars)

  return (
    <div>
      <Head>
        <title>CARS</title>
        <meta name='description' content='Testcase' />
      </Head>
      <div>
        {Math.random()}
        {cars.map(car => {
          return (
            <div key={car.price}>
              <h1>
                {car.brand} - {car.model} - {car.year} - {car.price}
              </h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { search, sortKey, sortOrder, page } = extractCarQueries(context)

  const cars = carsData.data
  const filteredCars = cars.filter(
    car => isInString(car.brand, search) || isInString(car.model, search),
  )
  const sortedCars = sortArray(filteredCars, sortKey, sortOrder)
  const { totalPages, paginateds: paginatedCars } = paginateArray(sortedCars, page)

  return {
    props: {
      cars: paginatedCars,
      search,
      sortKey,
      sortOrder,
      page,
      totalPages,
    },
  }
}
