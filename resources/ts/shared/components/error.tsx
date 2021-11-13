import React from 'react'

const getErrorMessage = (e: any): string => {
  const errorOptions = [
    e.data?.response?.data?.message,
    e.response?.data?.message,
    e.response?.data?.error,
    e.data?.message,
    e.message,
    'Something went wrong',
  ]
  return errorOptions.find((value) => !!value)
}

export const ErrorView = ({ error }: { error: any }) => {
  return <p className="m-6 p-6 text-red-500 bg-red-100">{getErrorMessage(error)}</p>
}
