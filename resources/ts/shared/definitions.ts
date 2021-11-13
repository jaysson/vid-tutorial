export type Teacher = {
  id: string
  firstName: string
  lastName: string
}

export type Topic = {
  id: string
  name: string
}

export type Tutorial = {
  id: string
  title: string
  description: string
  embedUrl: string
  thumbnail: string
  topic: Topic
  teacher: Teacher
}

export type ListResponse<T> = {
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
  data: T[]
}
