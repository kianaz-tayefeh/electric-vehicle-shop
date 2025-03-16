export const handleException = (error: Error, errorSource = ''): void => {
  console.error('errorSource', errorSource, error)

  // toast api error
  // collect errors or use sentry
}
