import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TutorialsList } from './pages/tutorials/list'
import { TutorialDetails } from './pages/tutorials/details'

export const Root = () => {
  return (
    <div className="text-sm text-gray-700">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/:id" element={<TutorialDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
