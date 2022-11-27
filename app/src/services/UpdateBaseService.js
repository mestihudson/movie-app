export function updateBaseService() {
  return fetch('/api/update')
    .then((response) => {
      if (response.ok)
        return response.json()
      return Promise.reject(new Error(response))
    })
}
