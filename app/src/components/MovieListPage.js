import { useEffect } from 'react'

export default function MovieListPage({ retrieveMoviesService }) {
  useEffect(() => {
    retrieveMoviesService()
  }, [])
  return (
    <>
      MovieListPage
    </>
  )
}
