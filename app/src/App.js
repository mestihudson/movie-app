import MovieListPage from './components/MovieListPage'
import { updateBaseService } from './services/UpdateBaseService'
import { retrieveMoviesService } from './services/RetrieveMoviesService'

export default function App() {
  return (
    <>
      <MovieListPage
        retrieveMoviesService={retrieveMoviesService}
        updateBaseService={updateBaseService}
      />
    </>
  )
}
