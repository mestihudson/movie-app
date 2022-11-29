import { useEffect, useState } from 'react'

export default function MovieListPage({
  retrieveMoviesService, updateBaseService }) {
  const [collection, setCollection] = useState([])
  const [errorAlertMessage, setErrorAlertMessage] = useState('')
  const [showErrorAlertMessage, setShowErrorAlertMessage] = useState(false)
  const [successAlertMessage, setSuccessAlertMessage] = useState('')
  const [showSuccessAlertMessage, setShowSuccessAlertMessage] = useState(false)

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
        setSuccessAlertMessage('Base successful updated')
        setShowSuccessAlertMessage(true)
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
          collection.map(({ id, title }, i) => <li key={id} data-testid='movie'>{title}</li>)
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
      {
        showSuccessAlertMessage &&
          <span data-testid='success-alert-message'>{successAlertMessage}</span>
      }
    </>
  )
}
