import { CarListItem } from '@/components/templates/CarListItem'
import { getCarData } from '@/services/car.service'
import { TypeCar } from '@/types/car.type'
import { GetServerSidePropsContext } from 'next'

type CarProps = {
  car: TypeCar
}

export default function Car(props: CarProps) {
  const { car } = props
  console.log('1 car', car)

  return (
    <div>
      <CarListItem car={car} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getCarData(context)
}
