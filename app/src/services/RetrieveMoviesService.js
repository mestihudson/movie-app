export function retrieveMoviesService(page = 1) {
  const uri = '/api/movies?' + new URLSearchParams({ page })
  return fetch(uri)
    .then((response) => {
      if (response.ok)
        return response.json()
      return Promise.reject(new Error(response))
    })
}
