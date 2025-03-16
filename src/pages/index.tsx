import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center '>
      <Head>
        <title>HOME PAGE</title>
        <meta name='description' content='Testcase' />
      </Head>
      <div className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        HOME
        <Image
          className='dark:invert'
          src='https://www.logo.wine/a/logo/Ford_Australia/Ford_Australia-Logo.wine.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        XXXX 2222 {process.env.NEXT_PUBLIC_API_URL}
        <div className='flex gap-4 items-center flex-col sm:flex-row'></div>
      </div>
    </div>
  )
}
