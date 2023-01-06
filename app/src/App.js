import MovieListPage from './components/MovieListPage'
import { updateBaseService } from './services/UpdateBaseService'
import { retrieveMoviesService } from './services/RetrieveMoviesService'

import './App.css'

export default function App() {
  return (
    <div className='container'>
      <MovieListPage
        retrieveMoviesService={retrieveMoviesService}
        updateBaseService={updateBaseService}
      />
    </div>
  )
}
