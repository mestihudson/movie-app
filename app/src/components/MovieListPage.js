import { useEffect, useState } from 'react'

import Pagination from './Pagination'

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
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState({
    title: '',
    description: '',
    director: '',
    producer: '',
    banner: ''
  })
  const [totalMovies, setTotalMovies] = useState(0)

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
        setTotalMovies(total)
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

  const onPosterClick = (movie) => {
    toggleDetails(true, movie)
  }

  const onBannerClick = () => {
    toggleDetails(false)
  }

  const toggleDetails = (show, movie) => {
    setShowDetails(show)
    if (movie) {
      let { banner } = movie
      banner = banner !== '' ? `https://image.tmdb.org/t/p/w500/${banner}` : ''
      setDetails({ ...movie, banner })
    }
  }

  const paginationPageItemOnClick = (page) => {
    onGoPageClick(page)
  }

  return (
    <>
      MovieListPage
      <button onClick={onButtonClick} data-testid='update-movie-base'
      >Atualizar</button>
      <Pagination total={totalMovies} limit={pageSize} current={currentPage}
        goToPage={(page) => paginationPageItemOnClick(page)}
      />
      <div className="movies-wrapper">
        {
          collection
            .map((movie, i) => {
              let { id, title, poster } = movie
              poster = `https://image.tmdb.org/t/p/w154/${poster}`
              return (
                <div key={id} data-testid='movie'
                  className="movie-box"
                  title='Clique para mais informações'
                >
                  <img src={poster} alt={title} width="100"
                    onClick={(e) => onPosterClick(movie)}
                  /><br/>
                  <span>{title}</span>
                </div>
              )
            })
        }
      </div>
      {
        showDetails && (
          <div className="movie-box-detail">
            <span>{details.title}</span><br/>
            <img src={details.banner} alt={details.title}
              onClick={() => onBannerClick()}
              title='Clique para esconder'
            /><br/>
            <span>{details.description}</span><br/>
            <span>Dirigido por: {details.director}</span><br/>
            <span>Produzido por: {details.producer}</span><br/>
          </div>
        )
      }
      {
        !collection.length &&
          <span data-testid='empty-movie-list-message'
          >Sorry, there is no movie to show!</span>
      }
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
