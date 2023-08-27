import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import TopBar from './components/TopBar/TopBar'
import AboutMe from './components/AboutMe/AboutMe'
function App() {
  const [count, setCount] = useState(0)

  return (




      // {/* <TopBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aboutme' element={<AboutMe />} />
          
        </Routes>
      </BrowserRouter>
     
 

  )
}

export default App
