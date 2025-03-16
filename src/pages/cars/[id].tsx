import { useRouter } from 'next/router'

export default function Car() {
  const router = useRouter()
  const { id } = router.query

  return <div>Car: {id}</div>
}
