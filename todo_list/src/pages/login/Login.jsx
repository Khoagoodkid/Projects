import React, { useEffect, useState, useContext } from 'react'
import Form from '../../components/Form'
import GetUserList from '../../GetUserList'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../components/UserContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const isLogin = true
function Login() {
  const { user, setUser } = useContext(UserContext)
  let navigate = useNavigate()
  const [authUser, setAuthUser] = useState({})
  const [userList, setUserList] = useState([])

  useEffect(() => {
    setUserList(GetUserList())
  }, [])
  useEffect(() => {
    if (JSON.stringify(authUser) !== JSON.stringify({})) {
      
      setUser(authUser)
      console.log(authUser)
      window.localStorage.setItem('isLoggedIn', true)
      window.localStorage.setItem('user', JSON.stringify(authUser))
      setTimeout(() => {
        navigate('/todos',
          { state: authUser }
        )
      }, [1000])

    } 
  },[authUser])
  const checkUser = (account) => {
    const user = userList.filter((user) => {
      return account.email == user.email && account.password == user.password
    })
    setAuthUser(user[0] || {})
    console.log(authUser)
    if(JSON.stringify(authUser) === JSON.stringify({})){
      toast.warning('This account does not exist!')
    }
    // setTimeout(()=>{

    //   if (JSON.stringify(authUser) === JSON.stringify({})){
    //     alert('This user does not exist!')
    //   }
    // },[500])



  }



  return (
    <div style={{ marginLeft: '10em' }}>
      <h1 style={{ color: 'white' }}>Login</h1>
      <ToastContainer
          position='top-right'
      />
      <Form isLogin={isLogin} checkUser={checkUser} authUser={authUser} />

    </div>





  )
}

export default Login