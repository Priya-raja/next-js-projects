'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>You need to configure the environment variables in Readme.md</p>
      <p>The environment variables are MAPBOX_API,UNSPLASH_ACCESS_KEY,AIRTABLE_TOKEN. Create these inside .env.local</p>
      <button
        onClick={() => reset()}
        className="bg-purple-951 min-w-[120px] text-white pb-2 pt-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  )
}