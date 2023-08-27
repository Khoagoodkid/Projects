import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home/Home'
import Room from './pages/Room/Room'
function App() {
  return (
   <div className='App'>
      <Home/>
   </div>
  )
}

export default App
