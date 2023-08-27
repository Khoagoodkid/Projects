import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AccountMananger from './pages/AccountMananger/AccountMananger'
export const AuthContext = createContext()
function App() {
  const [user, setUser] = useState(null)

  return (

    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<AccountMananger />} />

        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
