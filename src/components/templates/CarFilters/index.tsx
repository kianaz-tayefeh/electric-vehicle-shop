import { useCallback, useMemo, useState } from 'react'

import { Button, Input, Select } from '@/components/uikit'
import { DEFAULT_CARS_PARAMS } from '@/constants/car.constants'
import { SORTING_ORDERS } from '@/constants/common.constants'
import { useDebounceMethod } from '@/hooks/useDebounceMethod'

import { Search } from 'lucide-react'

type CarFiltersProps = {
  updateRouterQueries: (search: string, sort: string, order: string) => void
  search: string
  sort: string
  order: string
}

export const CarFilters: React.FC<CarFiltersProps> = props => {
  const { search, sort, order, updateRouterQueries } = props

  const debouncedUpdateRouterQueries = useDebounceMethod(updateRouterQueries)
  const [searchInputValue, setSearchInputValue] = useState(search)

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value
      setSearchInputValue(search)

      debouncedUpdateRouterQueries(search, sort, order)
    },
    [debouncedUpdateRouterQueries, sort, order],
  )

  const sortOptions = useMemo(() => {
    return Object.values(SORTING_ORDERS).map(order => {
      return { label: `price - ${order}`, value: `price-${order}` }
    })
  }, [])

  const handleChangeSort = useCallback(
    (selectedValue: string) => {
      const [sort, order] = selectedValue.split('-')
      updateRouterQueries(search, sort, order)
    },
    [updateRouterQueries, search],
  )

  const handleResetFilters = useCallback(() => {
    updateRouterQueries(
      DEFAULT_CARS_PARAMS.search,
      DEFAULT_CARS_PARAMS.sort,
      DEFAULT_CARS_PARAMS.order,
    )
    setSearchInputValue('')
  }, [updateRouterQueries])

  return (
    <div className='flex flex-col lg:flex-row xl:flex-row justify-between items-center gap-6 mb-6'>
      <Input
        type='text'
        name='searchCar'
        data-testid='search-input'
        value={searchInputValue}
        onChange={handleChangeSearch}
        placeholder='Search by brand or model'
        icon={<Search className='h-5 w-5' />}
      />
      <Select
        options={sortOptions}
        onChange={handleChangeSort}
        value={`${sort}-${order}`}
        data_testid='sort-input'
      />
      <Button onClick={handleResetFilters} className='w-80' variant='outline'>
        Reset filters
      </Button>
    </div>
  )
}
