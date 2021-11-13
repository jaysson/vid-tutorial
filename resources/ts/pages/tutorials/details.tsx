import React from 'react'
import { Tutorial } from '../../shared/definitions'
import { useParams } from 'react-router-dom'
import useSwr from 'swr'
import { TUTORIALS_ENDPOINT } from '../../shared/constants'
import { fetcher } from '../../shared/helpers/fetcher'
import { CircularSpinner } from '../../shared/components/spinners'

/* Hooks */
const useTutorial = () => {
  const { id } = useParams<'id'>()
  return useSwr<Tutorial>(`${TUTORIALS_ENDPOINT}/${id}`, fetcher)
}

/* Container */
export const TutorialDetails = () => {
  const { isValidating, data, error } = useTutorial()
  if (isValidating) {
    return (
      <div className="my-10 text-center">
        <CircularSpinner />
      </div>
    )
  }
  if (error) {
    return <p className="m-6 p-6 text-red-500 bg-red-100">Something went wrong</p>
  }
  const { thumbnail, teacher, topic, description, title, embedUrl } = data!
  return (
    <main>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          src={embedUrl}
          allowFullScreen
        />
      </div>
      <article className="flex m-6">
        <div>
          <img src={thumbnail} alt={title} className="rounded-lg" />
        </div>
        <div className="flex-1 pl-4">
          <header>
            <h3 className="text-gray-900 font-semibold text-lg mb-1">{title}</h3>
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
    </main>
  )
}
