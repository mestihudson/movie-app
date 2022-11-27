import { useEffect, useState } from 'react'

export default function MovieListPage({
  retrieveMoviesService, updateBaseService }) {
  const [collection, setCollection] = useState([])
  const [errorAlertMessage, setErrorAlertMessage] = useState('')
  const [showErrorAlertMessage, setShowErrorAlertMessage] = useState(false)

  const retrieveMovies = () => {
    retrieveMoviesService()
      .then((movies) => setCollection(movies))
      .catch((error) => {
        setErrorAlertMessage('Sorry, it was not possible to retrieve movies to show')
        setShowErrorAlertMessage(true)
      })
  }

  useEffect(() => {
    retrieveMovies()
  }, [])

  const onButtonClick = () => {
    updateBaseService()
      .then(() => {
        retrieveMovies()
      })
      .catch((error) => {
        setErrorAlertMessage('Sorry, it was not possible to update base')
        setShowErrorAlertMessage(true)
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
      {
        !collection.length &&
          <span data-testid='empty-movie-list-message'
          >Sorry, there is no movie to show!</span>
      }
      <button onClick={onButtonClick} data-testid='update-movie-base'
      >Atualizar</button>
      {
        showErrorAlertMessage &&
          <span data-testid='error-alert-message'>{errorAlertMessage}</span>
      }
    </>
  )
}
