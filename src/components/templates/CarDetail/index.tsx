import React from 'react'

import { Button, Card, CardContent, ImageGallery, Text } from '@/components/uikit'
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

type CarDetailProps = {
  car: TypeCar
}

export const CarDetail: React.FC<CarDetailProps> = ({ car }) => {
  if (!car) return null

  const carInfo = [
    { icon: <Gauge size={18} />, text: `${car.kilometer_count.toLocaleString('de-DE')} km` },
    {
      icon: <BatteryCharging size={18} />,
      text: `${car.battery_capacity_kWh} kWh | ${car.charging_speed_kW} kW`,
    },
    { icon: <Zap size={18} />, text: `${car.range_km} km range` },
    { icon: <Users size={18} />, text: `${car.seats} seats` },
    { icon: <Calendar size={18} />, text: car.condition === 'New' ? 'Brand New' : 'Used' },
    { icon: <MapPin size={18} />, text: car.location },
  ]

  const ownershipCosts = [
    { icon: <Euro size={18} />, text: 'Estimated Charging Cost: 5€ / 100 km' },
    { icon: <ShieldCheck size={18} />, text: 'Road Tax: 0€ (EV Exempt)' },
  ]

  const governmentIncentives = [
    { text: 'Eligible for up to 6,000€ EV subsidy' },
    { text: 'Reduced company car tax rate' },
  ]

  return (
    <Card className='p-6 sm:p-8 md:p-10 shadow-lg'>
      <div className='flex flex-col lg:flex-row gap-6 items-start'>
        {/* Image Gallery */}
        <div className='w-full lg:w-1/2'>
          <Text variant='h1' className='mb-4 text-center lg:text-left'>
            {car.brand} {car.model} ({car.year})
          </Text>
          <ImageGallery images={car.images} />
        </div>

        {/* Car Details */}
        <CardContent className='p-5 w-full lg:w-1/2'>
          <Text variant='h3' color='brand-500' className='text-2xl'>
            {getPriceFormat(car.price)} €
          </Text>

          <div className='flex flex-col gap-3 mt-4'>
            {carInfo.map((detail, index) => (
              <div key={index} className='flex items-center gap-2'>
                {detail.icon}
                <Text>{detail.text}</Text>
              </div>
            ))}

            <Text className={car.color !== 'White' ? 'text-primary' : 'text-muted'}>
              <strong>Color:</strong> {car.color}
            </Text>

            <Text>
              <strong>Drivetrain:</strong> {car.drivetrain}
            </Text>

            <div className='flex items-center gap-2'>
              <AlertCircle size={18} className={car.accidents ? 'text-red-500' : 'text-gray-400'} />
              <Text className={car.accidents ? 'text-danger' : 'text-muted'}>
                {car.accidents ? car.accident_description : 'No accidents'}
              </Text>
            </div>
          </div>

          {/* Ownership Costs */}
          <div className='mt-6'>
            <Text variant='h4' className='text-lg'>
              Ownership Costs
            </Text>
            {ownershipCosts.map(({ icon, text }, index) => (
              <div key={index} className='flex items-center gap-2'>
                {icon}
                <Text>{text}</Text>
              </div>
            ))}
          </div>

          {/* Government Incentives */}
          <div className='mt-6'>
            <Text variant='h4' className='text-lg'>
              Government Incentives
            </Text>
            {governmentIncentives.map(({ text }, index) => (
              <Text key={index}>- {text}</Text>
            ))}
          </div>

          {/* Call to Action */}
          <div className='flex flex-col md:flex-row gap-4 mt-8'>
            <Button variant='outline' className='w-full md:w-auto'>
              Request a Test Drive
            </Button>
            <Button variant='secondary' className='w-full md:w-auto'>
              Contact Seller
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
