import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount'
import Todo from './pages/todolist/Todo'
import { UserContext } from './components/UserContext'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
function App() {
  let navigate = useNavigate()
  const loggedInUser = window.localStorage.getItem('user')
  const [user, setUser] = useState(null)
  useEffect(()=>{
    navigate('/login')
    setUser(JSON.parse(loggedInUser))
  },[])
  const loggedIn = window.localStorage.getItem('isLoggedIn')
  
  return (
    
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>

          <Route path='/login' element={user ? <Todo/> :<CreateAccount />} />
          <Route path='/todos' element={user ? <Todo />: <CreateAccount/>} />
        </Routes>
      </UserContext.Provider>
   
  )
}

export default App
