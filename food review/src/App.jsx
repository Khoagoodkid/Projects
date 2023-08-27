import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SingleFood from './components/SingleFood'
import Intro from './components/Intro'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/foods" element={<HomePage />} />
        <Route path="/foods/:nameID" element={<SingleFood />} />
      </Routes>







    </BrowserRouter>
  )
}

export default App
