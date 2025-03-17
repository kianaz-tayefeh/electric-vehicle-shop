import Head from 'next/head'
import Link from 'next/link'

import { Text } from '@/components/uikit'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center '>
      <Head>
        <title>Electric Vehicles for Sale</title>
        <meta name='description' content='Explore eco-friendly electric vehicles for sale' />
      </Head>

      <section className='py-16 text-center mt-30'>
        <div className='max-w-4xl mx-auto'>
          <Text variant='h1' className='mb-6'>
            Drive the Future with Electric Cars
          </Text>
          <Text variant='p' className='text-xl text-gray-600 mb-6'>
            Explore our wide range of electric vehicles designed for sustainability, performance,
            and luxury.
          </Text>

          <Link
            href={'/cars'}
            className='bg-green-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600'
            passHref
          >
            Browse Our Models
          </Link>
        </div>
      </section>
    </div>
  )
}
