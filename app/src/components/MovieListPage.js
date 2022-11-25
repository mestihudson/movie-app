import { useEffect, useState } from 'react'

export default function MovieListPage({ retrieveMoviesService }) {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    retrieveMoviesService()
      .then((movies) => setCollection(movies))
  }, [])

  return (
    <>
      MovieListPage
      <ul>
        {
          collection.map((e, i) => <li key={i} data-testid='movie'>{e}</li>)
        }
      </ul>
    </>
  )
}
