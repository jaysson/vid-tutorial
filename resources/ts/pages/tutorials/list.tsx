import React, { useCallback, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import qs from 'qs'
import { TUTORIALS_ENDPOINT } from '../../shared/constants'
import { fetcher } from '../../shared/helpers/fetcher'
import { ListResponse, Tutorial } from '../../shared/definitions'
import Observer from '@researchgate/react-intersection-observer'
import { ChangeHandler } from '@researchgate/react-intersection-observer/typings/types'
import { CircularSpinner } from '../../shared/components/spinners'
import { debounce } from 'debounce'
import { Link } from 'react-router-dom'
import { ErrorView } from '../../shared/components/error'

/* Types */

/* Hooks */
const useTutorials = () => {
  const [query, setQuery] = useState('')

  const { error, isValidating, size, setSize, data } = useSWRInfinite<ListResponse<Tutorial>>(
    (pageIndex, previousData) => {
      if (previousData && !previousData.meta.nextPageUrl) {
        return null
      }
      const queryString = qs.stringify(
        { query, page: pageIndex + 1 },
        { addQueryPrefix: true, arrayFormat: 'brackets' }
      )
      return `${TUTORIALS_ENDPOINT}${queryString}`
    },
    (key) => fetcher(key)
  )
  const tutorials = data?.flatMap((page) => page.data)
  const handleIntersectionChange: ChangeHandler = useCallback(
    (entry) => {
      if (!data || !tutorials) {
        return
      }
      const totalRecords = data[data.length - 1].meta.total
      if (entry.isIntersecting && !isValidating && !error && totalRecords > tutorials.length) {
        setSize(size + 1).then()
      }
    },
    [data, tutorials, size, setSize, error, isValidating]
  )

  return { error, data, isValidating, setQuery: debounce(setQuery, 500), handleIntersectionChange }
}

/* Components */
const SearchInput = ({ onChange }: { onChange: (value: string) => any }) => {
  return (
    <input
      className="p-4 w-full max-w-screen-sm border border-gray-200 rounded-2xl"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tutorials..."
    />
  )
}

const TutorialPreview = ({ title, description, thumbnail, teacher, topic, id }: Tutorial) => {
  return (
    <article className="flex">
      <Link to={`/${id}`}>
        <img src={thumbnail} alt={title} className="rounded-lg" />
      </Link>
      <div className="flex-1 pl-4">
        <header>
          <Link to={`/${id}`}>
            <h3 className="text-gray-900 font-semibold text-lg mb-1">{title}</h3>
          </Link>
        </header>
        <p>{description}</p>
        <footer className="flex mt-4">
          <p className="mr-4">
            <strong className="font-semibold text-gray-900">Teacher</strong>: {teacher.firstName}{' '}
            {teacher.lastName}
          </p>
          <p>
            <strong className="font-semibold text-gray-900">Topic</strong>: {topic.name}
          </p>
        </footer>
      </div>
    </article>
  )
}

/* Container */
export const TutorialsList = () => {
  const { data, isValidating, setQuery, handleIntersectionChange, error } = useTutorials()
  const results = data?.flatMap((page) => page.data)

  return (
    <div>
      <section className="py-40 px-6 text-center bg-gray-100">
        <h1 className="text-7xl font-semibold mb-10">Vid-Tutorial</h1>
        <SearchInput onChange={setQuery} />
      </section>
      <h4 className="p-6 font-semibold text-lg border-b">
        Here are the tutorials matching your query:
      </h4>
      <main className="mt-3 container-lg mx-auto py-10">
        {results?.map(({ id, description, title, embedUrl, thumbnail, topic, teacher }, index) => (
          <div className="mx-4" key={id}>
            <TutorialPreview
              id={id}
              title={title}
              description={description}
              embedUrl={embedUrl}
              thumbnail={thumbnail}
              topic={topic}
              teacher={teacher}
            />
            {index < results.length - 1 && <hr className="my-6" />}
          </div>
        ))}
        {!!error && <ErrorView error={error} />}
        <Observer onChange={handleIntersectionChange}>
          <div className="text-center mt-6">{isValidating && <CircularSpinner />}</div>
        </Observer>
      </main>
    </div>
  )
}
