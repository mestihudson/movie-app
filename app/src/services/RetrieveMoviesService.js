export function retrieveMoviesService() {
  return fetch('/api/movies')
    .then((response) => {
      if (response.ok)
        return response.json()
      return Promise.reject(new Error(response))
    })
}
