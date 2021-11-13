export const fetcher = (request: RequestInfo) => {
  return fetch(request).then((response) => response.json())
}
