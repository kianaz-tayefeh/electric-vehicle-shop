import React, { useMemo } from 'react'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const { totalPages, currentPage, onChangePage } = props

  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages])

  return (
    <div className='flex justify-center space-x-2 mt-4'>
      <button
        className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onChangePage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}
