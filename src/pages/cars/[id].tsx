import { GetServerSidePropsContext } from 'next'

import { CarDetail } from '@/components/templates/CarDetail'
import { getCarById } from '@/services/car.service'
import { TypeCar } from '@/types/car.type'

type CarProps = {
  car: TypeCar
}

export default function Car(props: CarProps) {
  const { car } = props
  console.log('1 car', car)

  return (
    <div>
      <CarDetail car={car} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('context', context)

  return getCarById(context)
}
