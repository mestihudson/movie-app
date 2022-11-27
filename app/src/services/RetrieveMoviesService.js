export function retrieveMoviesService() {
  return fetch('/api/movies')
    .then((response) => response.json())
}
