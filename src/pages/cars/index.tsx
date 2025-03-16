import Head from 'next/head'
import carsData from '../../data/vehicle_data.json'
import { GetServerSidePropsContext } from 'next'
import { TypeCar } from '@/types/car.type'
import { isInString, paginateArray, sortArray } from '@/helpers/common.helpers'
import { extractCarQueries } from '@/helpers/car.helpers'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { CarListItem } from '@/components/templates/CarListItem/CarListItem'
import { SORTING_ORDERS } from '@/constants/common.constants'
import { useDebounceMethod } from '@/hooks/useDebounceMethod'
import { DEFAULT_CARS_PARAMS } from '@/constants/car.constants'

type CarsProps = {
  cars: TypeCar[]
  sort: string
  order: string
  search: string
}

export default function Cars(props: CarsProps) {
  const { cars, sort, order, search } = props

  const router = useRouter()

  const updateRouterQueries = useCallback(
    (search: string, sort: string, order: string) =>
      router.push({
        pathname: '/cars',
        query: { ...router.query, search, sort, order },
      }),
    [router],
  )
  const debouncedUpdateRouterQueries = useDebounceMethod(updateRouterQueries)

  const handleChangeSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value
      const [sort, order] = selectedValue.split('-')

      updateRouterQueries(search, sort, order)
    },
    [updateRouterQueries, search],
  )

  const [searchInputValue, setSearchInputValue] = useState(search)
  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value
      setSearchInputValue(search)

      debouncedUpdateRouterQueries(search, sort, order)
    },
    [debouncedUpdateRouterQueries, sort, order],
  )

  const handleResetFilters = useCallback(() => {
    updateRouterQueries(
      DEFAULT_CARS_PARAMS.search,
      DEFAULT_CARS_PARAMS.sort,
      DEFAULT_CARS_PARAMS.order,
    )
    setSearchInputValue('')
  }, [updateRouterQueries])

  const sortOptions = Object.values(SORTING_ORDERS).map(order => {
    return { label: `price - ${order}`, value: `price-${order}` }
  })

  return (
    <div>
      <Head>
        <title>CARS</title>
        <meta name='description' content='Testcase' />
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <input
            type='text'
            value={searchInputValue}
            onChange={handleChangeSearch}
            style={{ outline: '1px solid black' }}
          />
          <select onChange={handleChangeSort} value={`${sort}-${order}`}>
            {sortOptions.map(option => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={handleResetFilters}>Reset filters</button>
        </div>
        {!cars.length && <p>No cars found, Please change the filters.</p>}
        {cars.map(car => {
          // @TODO fix this key
          return <CarListItem key={`${car.brand}${car.model}${car.year}${car.price}`} car={car} />
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
