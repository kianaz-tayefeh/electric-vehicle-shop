import Link from 'next/link'

import { Text } from '@/components/uikit/Text'

export default function NotFound() {
  return (
    <div>
      <Text variant='h1'>Custom Error: 404 - Page Not Found</Text>
      <Text>Oops! The page you are looking for does not exist.</Text>
      <Link href='/'>Back to Home</Link>
    </div>
  )
}
