import { CarDetail } from '@/components/templates/CarDetail'
import { CarItem } from '@/components/templates/CarItem'
import { TypeCar } from '@/types/car.type'

import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

const mockCar = {
  id: '6',
  brand: 'Renault',
  model: 'Zoe',
  year: 2018,
  price: 19999,
  range_km: 300,
  color: 'Grey',
  condition: 'Used',
  battery_capacity_kWh: 41,
  charging_speed_kW: 22,
  seats: 5,
  drivetrain: 'FWD',
  location: 'Stuttgart',
  autopilot: false,
  kilometer_count: 35000,
  accidents: true,
  accident_description: 'Front fender replaced after minor collision',
  images: [
    'https://ev-database.org/img/auto/Audi_e-tron/Audi_e-tron-01@2x.jpg',
    'https://ev-database.org/img/auto/Audi_e-tron/Audi_e-tron-02@2x.jpg',
  ],
} as TypeCar

test('CarDetail renders correctly', () => {
  render(<CarDetail car={mockCar} />)
  expect(screen.getByText(/Renault Zoe/i)).toBeDefined()
  expect(screen.getByText(/2018/i)).toBeDefined()
  expect(screen.getByText(/Used/i)).toBeDefined()
  expect(screen.getByText(/Front fender replaced after minor collision/i)).toBeDefined()
})

test('CarItem renders correctly', () => {
  render(<CarItem item={mockCar} />)
  expect(screen.getByText(/Stuttgart/i)).toBeDefined()
})
