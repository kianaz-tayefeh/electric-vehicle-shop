import { DEFAULT_DEBOUNCE_TIME } from '@/constants/common.constants'
import { debounceMethod } from '@/helpers/common.helpers'
import { useCallback } from 'react'

export const useDebounceMethod = (method: any, debounceTime = DEFAULT_DEBOUNCE_TIME) => {
  return useCallback(debounceMethod(method, debounceTime), [])
}
