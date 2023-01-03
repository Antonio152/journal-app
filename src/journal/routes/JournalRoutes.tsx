import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Journal } from '../pages/Journal'

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Journal/>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}
