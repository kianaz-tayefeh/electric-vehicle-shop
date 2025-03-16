import { LinkButton } from '@/components/uikit/LinkButton'
import { getPriceFormat } from '@/helpers/common.helpers'
import { TypeCar } from '@/types/car.type'
import Image from 'next/image'

type CarListItemProps = {
  car: TypeCar
}

export const CarListItem = (props: CarListItemProps) => {
  const { car } = props

  return (
    <div
      style={{
        border: '1px solid #dedede',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        cursor: 'pointer',
        borderRadius: 10,
      }}
    >
      <div style={{ padding: 20 }}>
        <Image src={car.images[0]} alt='car image' width={250} height={38} priority />
      </div>
      <div style={{ padding: 20 }}>
        <b>{car.brand}</b> {car.model} <small>({car.year}) </small>
        <b>{car.kilometer_count}</b>
        <i>{car.condition === 'New' && '*'}</i>
        <p>{getPriceFormat(car.price)} Euro</p>
        <p>{car.range_km} km</p>
        <p style={{ color: car.color !== 'White' ? car.color : '' }}>{car.color}</p>
        <p>{car.drivetrain}</p>
        <p>{car.battery_capacity_kWh}</p>
        <p>{car.charging_speed_kW}</p>
        <p>{car.seats} seats</p>
        <p>location: {car.location}</p>
        <p>autopilot ? {car.autopilot}</p>
        <p>accidents ? {car.accidents ? car.accident_description : 'No'}</p>
        <LinkButton label='Read more' link={`/cars/${car.model}`} />
      </div>
    </div>
  )
}
