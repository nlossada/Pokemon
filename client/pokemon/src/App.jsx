import { useState } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './views/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Form from './views/Form/Form'
import NotFound from './views/NotFound/NotFound'



const App = () => {
  const location = useLocation();

  return (
    <>
      {
        location.pathname === "/" ? null : <NavBar />
      }
      <Routes>

        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/detail/:id'
          element={<Detail />}
        />
        <Route
          path='/form'
          element={<Form />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  )
}

export default App
