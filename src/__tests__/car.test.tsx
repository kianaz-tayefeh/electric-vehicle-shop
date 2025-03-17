import { useRouter } from 'next/router'

import Cars from '@/pages/cars'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    query: {},
  })),
}))

describe('Cars Component', () => {
  const mockPush = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: {},
    })
  })

  const mockCars = [
    {
      id: 1,
      brand: 'Tesla',
      model: 'Model S',
      condition: 'New',
      images: ['image1.jpg'],
      drivetrain: 'AWD',
      battery_capacity_kWh: 100,
      range_km: 600,
    },
    {
      id: 2,
      brand: 'Nissan',
      model: 'Leaf',
      condition: 'Used',
      images: ['image2.jpg'],
      drivetrain: 'FWD',
      battery_capacity_kWh: 40,
      range_km: 250,
    },
  ]

  test('sort selection updates query params', async () => {
    render(<Cars cars={mockCars} sort='price' order='asc' search='' page={1} totalPages={2} />)

    const selectButtons = screen.getAllByTestId('sort-input')
    const selectButton = selectButtons[0]
    fireEvent.click(selectButton)

    const option = screen.getByText('price - desc')
    fireEvent.click(option)

    await waitFor(() => {
      console.log(mockPush.mock.calls)
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/cars',
        query: expect.objectContaining({ sort: 'price', order: 'desc', search: '' }),
      })
    })
  })

  test('pagination updates query params', () => {
    render(<Cars cars={mockCars} sort='price' order='asc' search='' page={1} totalPages={2} />)
    const nextPageButtons = screen.getAllByTestId('next')
    const nextPageButton = nextPageButtons[0]
    fireEvent.click(nextPageButton)

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/cars',
      query: expect.objectContaining({ page: 2 }),
    })
  })

  test('search input updates query params', async () => {
    render(<Cars cars={mockCars} sort='price' order='asc' search='' page={1} totalPages={2} />)

    const searchInputs = screen.getAllByTestId('search-input')
    const searchInput = searchInputs[0]

    fireEvent.change(searchInput, { target: { value: 'Tesla' } })

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/cars',
        query: expect.objectContaining({ search: 'Tesla', sort: 'price', order: 'asc' }),
      })
    })
  })
})
