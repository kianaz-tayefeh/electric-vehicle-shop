import { LinkButton } from '@/components/uikit/Link'

export default function NotFound() {
  return (
    <div>
      <h1>Custom Error: 404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <LinkButton label='Back to Home' link='/' />
    </div>
  )
}
