import { useEffect, useState } from 'react'

export default function MovieListPage({
  retrieveMoviesService, updateBaseService }) {
  const [collection, setCollection] = useState([])
  const [errorAlertMessage, setErrorAlertMessage] = useState('')
  const [showErrorAlertMessage, setShowErrorAlertMessage] = useState(false)
  const [successAlertMessage, setSuccessAlertMessage] = useState('')
  const [showSuccessAlertMessage, setShowSuccessAlertMessage] = useState(false)
  const [pages, setPages] = useState([])
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  const retrieveMovies = (page = 1) => {
    retrieveMoviesService(page)
      .then(({ movies, total }) => {
        const pages = new Array(Math.ceil(total / pageSize))
          .fill(0)
          .map((e, index) => {
            const key = index + 1
            return {
              label: key,
              key,
            }
          })
        setCurrentPage(page)
        setPages(pages)
        setCollection(movies)
      })
      .catch((error) => {
        setErrorAlertMessage('Sorry, it was not possible to retrieve movies to show')
        setShowErrorAlertMessage(true)
      })
  }

  useEffect(() => {
    retrieveMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onGoPageClick = (page) => {
    retrieveMovies(page)
  }

  const isCurrentPage = (page) => {
    return currentPage === page
  }

  return (
    <>
      MovieListPage
      <ul>
        {
          pages.length > 0 && (
            <li>
              <button
                data-testid='first-page' onClick={() => onGoPageClick(1)}
                disabled={isCurrentPage(1)}
              >Primeira</button>
            </li>
          )
        }
        {
          pages.map(({ key, label }) => (
            <li key={key}>
              <button data-testid='page' onClick={() => onGoPageClick(key)}
                disabled={isCurrentPage(key)}
              >{label}</button>
            </li>
          ))
        }{
          pages.length > 0 && (
            <li>
              <button
                data-testid='last-page'
                onClick={() => onGoPageClick(pages.length)}
                disabled={isCurrentPage(pages.length)}
              >Última</button>
            </li>
          )
        }
      </ul>
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
