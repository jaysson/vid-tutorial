import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TutorialsList } from './pages/tutorials/list'

export const Root = () => {
  return (
    <div className="text-sm text-gray-700">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TutorialsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
