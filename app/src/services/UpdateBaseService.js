export function updateBaseService() {
  return fetch('/api/update')
    .then((response) => response.json())
}
