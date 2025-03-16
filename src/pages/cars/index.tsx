import { useCallback } from 'react'

import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { CarFilters } from '@/components/templates/CarFilters'
import { CarItem } from '@/components/templates/CarItem'
import { Divider } from '@/components/uikit/Divider'
import { EmptyContent } from '@/components/uikit/EmptyContent'
import { Flex } from '@/components/uikit/Flex'
import { Pagination } from '@/components/uikit/Pagination'
import { Title } from '@/components/uikit/Title'
import { Virtualization } from '@/components/uikit/Virtualization'
import { getCarsData } from '@/services/car.service'
import { TypeCar } from '@/types/car.type'

type CarsProps = {
  cars: TypeCar[]
  sort: string
  order: string
  search: string
  page: number
  totalPages: number
}

// height: calc(100vh - 200px);

const Cars = (props: CarsProps) => {
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

  const handleChangePage = useCallback(
    (page: number) => {
      updateRouterQueries(search, sort, order, page)
    },
    [updateRouterQueries, search, sort, order],
  )

  return (
    <div>
      <Title order={4}>Electric Vehicles</Title>
      <Divider size='md' className='mb-6' />

      <Flex justify='center' align='center'>
        <CarFilters
          updateRouterQueries={updateRouterQueries}
          search={search}
          sort={sort}
          order={order}
        />
      </Flex>

      {!cars.length && (
        <EmptyContent message='No electric vehicles found. Try a different search.' />
      )}

      <Virtualization
        items={cars}
        size={480}
        component={CarItem}
        className='h-[calc(100vh-300px)]'
      />
      <Pagination totalPages={totalPages} currentPage={page} onChangePage={handleChangePage} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getCarsData(context)
}

export default Cars
