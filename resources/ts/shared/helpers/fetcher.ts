export const fetcher = (request: RequestInfo) => {
  return fetch(request).then((response) => {
    if (!response.ok) {
      throw response
    }
    return response.json()
  })
}
