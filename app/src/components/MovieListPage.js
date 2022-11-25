import { useEffect, useState } from 'react'

export default function MovieListPage({
  retrieveMoviesService, updateBaseService }) {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    retrieveMoviesService()
      .then((movies) => setCollection(movies))
  }, [])

  const onButtonClick = () => {
    updateBaseService()
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
