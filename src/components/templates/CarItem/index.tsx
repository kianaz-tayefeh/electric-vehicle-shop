import { JSX } from 'react'

import Link from 'next/link'

import { Badge, Card, CardContent, CardFooter, ImageLoader, Text } from '@/components/uikit'
import { getPriceFormat } from '@/helpers/common.helpers'
import { TypeCar } from '@/types/car.type'

import { BatteryCharging, Euro, Gauge, Zap } from 'lucide-react'

type CarItemProps = {
  item: TypeCar
}

export const CarItem = ({ item: car }: CarItemProps): JSX.Element => {
  return (
    <Card>
      {/* Car Image */}
      <CardContent>
        <Badge variant='success' className='mb-5'>
          {car.condition}
        </Badge>

        <Link href={`/cars/${car.id}`} passHref>
          <ImageLoader
            src={car.images[0]}
            alt='Car image'
            width={317}
            height={178}
            className='cursor-pointer'
          />
        </Link>
      </CardContent>

      {/* Car Details */}
      <CardContent>
        <Text variant='h4'>
          {car.brand} {car.model}
        </Text>
        <Text variant='subtitle' className='mb-3'>
          {car.model} • {car.brand} • {car.drivetrain}
        </Text>

        <div className='flex gap-3'>
          <div className='flex items-center gap-2'>
            <Zap size={16} className='text-brand-500' />
            <Text>{car.battery_capacity_kWh} kWh</Text>
          </div>
          <div className='flex items-center gap-2'>
            <BatteryCharging size={16} />
            <Text>{car.range_km} km</Text>
          </div>
          <div className='flex items-center gap-2'>
            <Gauge size={16} className='text-secondary' />
            <Text>{car.charging_speed_kW} kW</Text>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Text variant='p'>Price</Text>
        <div className='flex items-end gap-0'>
          <Text variant='h3' color='primary'>
            {getPriceFormat(car.price)}
          </Text>
        </div>
      </CardFooter>
    </Card>
  )
}
