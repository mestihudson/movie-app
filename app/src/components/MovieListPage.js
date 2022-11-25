import { useEffect, useState } from 'react'

export default function MovieListPage({
  retrieveMoviesService, updateBaseService }) {
  const [collection, setCollection] = useState([])

  const retrieveMovies = () => {
    retrieveMoviesService()
      .then((movies) => setCollection(movies))
  }

  useEffect(() => {
    retrieveMovies()
  }, [])

  const onButtonClick = () => {
    updateBaseService()
      .then(() => {
        retrieveMovies()
      })
  }

  return (
    <>
      MovieListPage
      <ul>
        {
          collection.map((e, i) => <li key={i} data-testid='movie'>{e}</li>)
        }
      </ul>
      <button onClick={onButtonClick} data-testid='update-movie-base'
      >Atualizar</button>
    </>
  )
}
