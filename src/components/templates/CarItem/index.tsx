import Link from 'next/link'

import { Badge } from '@/components/uikit/Badge'
import { Card } from '@/components/uikit/Card'
import { CardContent } from '@/components/uikit/CardContent/CardContent'
import { CardFooter } from '@/components/uikit/CardFooter'
import { Flex } from '@/components/uikit/Flex'
import { ImageLoader } from '@/components/uikit/ImageLoader'
import { Text } from '@/components/uikit/Text'
import { getPriceFormat } from '@/helpers/common.helpers'
import { TypeCar } from '@/types/car.type'

import { BatteryCharging, Euro, Gauge, Zap } from 'lucide-react'

type CarItemProps = {
  item: TypeCar
}

export const CarItem = (props: CarItemProps) => {
  const { item: car } = props

  return (
    <Card>
      {/* Car Image */}
      <CardContent className='p-0'>
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

        {/* Specs with Icons */}
        <Flex gap='3'>
          <Flex align='center' gap='1'>
            <Zap size={16} className='text-brand-500' />
            <Text>{car.battery_capacity_kWh} kWh</Text>
          </Flex>
          <Flex align='center' gap='1'>
            <BatteryCharging size={16} className='text-success' />
            <Text>{car.range_km} km</Text>
          </Flex>
          <Flex align='center' gap='1'>
            <Gauge size={16} className='text-secondary' />
            <Text>{car.charging_speed_kW} kW</Text>
          </Flex>
        </Flex>
      </CardContent>

      {/* Pricing */}
      <CardFooter>
        <Text variant='p'>Price</Text>
        <Flex align='end' gap='0'>
          <Text variant='h3' color='primary'>
            <Euro size={12} className='inline' />
            {getPriceFormat(car.price)}
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  )
}
