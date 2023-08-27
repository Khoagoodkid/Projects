import React, { createContext,useState,useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import UserInfo from './UserInfo'
import TodoDisplay from './TodoDisplay'
import "./Todo.css"
import { UserContext } from '../../components/UserContext'
export const colorContext = createContext()
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Todo() {
  const authUser = useLocation().state
  const {user,setUser} = useContext(UserContext)
  const [userColor,setUserColor] = useState(user?.color)
  useEffect(()=>{
    if(user){

      toast.success(`You are logged in as ${user.name}`)
    }
  },[])
  return (
    <div className='todoBody'>
      <ToastContainer/>
      <colorContext.Provider value={{userColor,setUserColor}}>
        <UserInfo authUser={authUser} />
        <TodoDisplay authUser={authUser} />
      </colorContext.Provider>
    </div>
  )
}

export default Todo