import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/uikit/Button'
import { Flex } from '@/components/uikit/Flex'
import { Input } from '@/components/uikit/Input'
import { Select } from '@/components/uikit/Select'
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
export const CarFilters = (props: CarFiltersProps) => {
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
    <Flex
      direction={{ base: 'col', sm: 'row', md: 'row' }}
      justify='between'
      align='center'
      gap='4'
      className='mb-6'
    >
      <Input
        type='text'
        value={searchInputValue}
        onChange={handleChangeSearch}
        placeholder='Search by brand or model'
        icon={<Search className='h-5 w-5' />}
      />
      <Select options={sortOptions} onChange={handleChangeSort} value={`${sort}-${order}`} />
      <Button onClick={handleResetFilters} className='w-80' variant='outline'>
        Reset filters
      </Button>
    </Flex>
  )
}
