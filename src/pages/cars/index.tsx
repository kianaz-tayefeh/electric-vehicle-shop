import Head from 'next/head'
import { GetServerSidePropsContext } from 'next'
import { TypeCar } from '@/types/car.type'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { CarListItem } from '@/components/templates/CarListItem'
import { SORTING_ORDERS } from '@/constants/common.constants'
import { useDebounceMethod } from '@/hooks/useDebounceMethod'
import { DEFAULT_CARS_PARAMS } from '@/constants/car.constants'
import { getCarsData } from '@/services/car.service'
import { Pagination } from '@/components/uikit/Pagination'

type CarsProps = {
  cars: TypeCar[]
  sort: string
  order: string
  search: string
  page: number
  totalPages: number
}

export default function Cars(props: CarsProps) {
  const { cars, sort, order, search, page, totalPages } = props

  const router = useRouter()

  const updateRouterQueries = useCallback(
    (search: string, sort: string, order: string, page?: number) =>
      router.push({
        pathname: '/cars',
        query: { ...router.query, search, sort, order, page },
      }),
    [router],
  )
  const debouncedUpdateRouterQueries = useDebounceMethod(updateRouterQueries)

  const sortOptions = Object.values(SORTING_ORDERS).map(order => {
    return { label: `price - ${order}`, value: `price-${order}` }
  })

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

  const handleChangePage = useCallback(
    (page: number) => {
      updateRouterQueries(search, sort, order, page)
    },
    [updateRouterQueries, search, sort, order],
  )

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
            placeholder='Search by brand or model'
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
        <Pagination totalPages={totalPages} currentPage={page} onChangePage={handleChangePage} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getCarsData(context)
}
