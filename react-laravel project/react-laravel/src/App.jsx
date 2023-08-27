import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Edit from './components/Edit'
function App() {
  return (

  
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
