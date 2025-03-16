import Link from 'next/link'

export const LinkButton = (props: { link: string; label: string }) => {
  const { link, label } = props

  return (
    <span style={{ color: 'blue' }}>
      <Link href={link}>{label || 'Go to About Page'}</Link>
    </span>
  )
}
