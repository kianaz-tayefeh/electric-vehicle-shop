import React from 'react'

import { Button } from '@/components/uikit/Button'
import { Card } from '@/components/uikit/Card'
import { CardContent } from '@/components/uikit/CardContent/CardContent'
import { Flex } from '@/components/uikit/Flex'
import { ImageGallery } from '@/components/uikit/ImageGallery'
import { Text } from '@/components/uikit/Text'
import { getPriceFormat } from '@/helpers/common.helpers'
import { TypeCar } from '@/types/car.type'

import {
  AlertCircle,
  BatteryCharging,
  Calendar,
  Euro,
  Gauge,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'

interface CarDetailProps {
  car: TypeCar
}

export const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  if (!car) return null

  return (
    <Card className='p-6 sm:p-8 md  :p-10 shadow-lg'>
      <Flex direction={{ base: 'col', sm: 'col', md: 'row' }} gap='6' justify='start' align='start'>
        {/* Image Gallery */}
        <div className='w-full md:w-1/2'>
          <Text variant='h1' className='mb-4 text-center md:text-left'>
            {car.brand} {car.model} ({car.year})
          </Text>
          <ImageGallery images={car.images} />
        </div>

        {/* Car Details */}
        <CardContent className='p-5 mt-4 w-full md:w-1/2'>
          <Flex direction={{ base: 'col' }} gap='4'>
            <Text variant='h3' color='brand-500' className='text-xl md:text-2xl'>
              {getPriceFormat(car.price)} €
            </Text>

            <Flex align='center' gap='2'>
              <Gauge size={18} />
              <Text>{car.kilometer_count.toLocaleString('de-DE')} km</Text>
            </Flex>

            <Flex align='center' gap='2'>
              <BatteryCharging size={18} />
              <Text>
                {car.battery_capacity_kWh} kWh | {car.charging_speed_kW} kW
              </Text>
            </Flex>

            <Flex align='center' gap='2'>
              <Zap size={18} />
              <Text>{car.range_km} km range</Text>
            </Flex>

            <Flex align='center' gap='2'>
              <Users size={18} />
              <Text>{car.seats} seats</Text>
            </Flex>

            <Flex align='center' gap='2'>
              <Calendar size={18} />
              <Text>{car.condition === 'New' ? 'Brand New' : 'Used'}</Text>
            </Flex>

            <Flex align='center' gap='2'>
              <MapPin size={18} />
              <Text>{car.location}</Text>
            </Flex>

            <Text color={car.color !== 'White' ? 'primary' : 'muted'}>
              <strong>Color:</strong> {car.color}
            </Text>

            <Text>
              <strong>Drivetrain:</strong> {car.drivetrain}
            </Text>

            {car.autopilot && <Text>✅ Autopilot Enabled</Text>}

            <Flex align='center' gap='2'>
              <AlertCircle size={18} color={car.accidents ? 'red' : 'gray'} />
              <Text color={car.accidents ? 'danger' : 'muted'}>
                {car.accidents ? car.accident_description : 'No accidents'}
              </Text>
            </Flex>
          </Flex>

          {/* Ownership Costs */}
          <div className='mt-6'>
            <Text variant='h4' className='text-lg'>
              Ownership Costs
            </Text>
            <Flex align='center' gap='2'>
              <Euro size={18} />
              <Text>Estimated Charging Cost: 5€ / 100 km</Text>
            </Flex>
            <Flex align='center' gap='2'>
              <ShieldCheck size={18} />
              <Text>Road Tax: 0€ (EV Exempt)</Text>
            </Flex>
          </div>

          {/* Government Incentives */}
          <div className='mt-6'>
            <Text variant='h4' className='text-lg'>
              Government Incentives
            </Text>
            <Text>- Eligible for up to 6,000€ EV subsidy</Text>
            <Text>- Reduced company car tax rate</Text>
          </div>

          {/* Call to Action */}
          <Flex direction={{ base: 'col', md: 'row' }} gap='4' className='mt-8'>
            <Button variant='outline' className='w-full md:w-auto'>
              Request a Test Drive
            </Button>
            <Button variant='secondary' className='w-full md:w-auto'>
              Contact Seller
            </Button>
          </Flex>
        </CardContent>
      </Flex>
    </Card>
  )
}
