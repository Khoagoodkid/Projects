import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Form from '../../components/Form'
import { url } from '../../StartFirebase'
import GetUserList from '../../GetUserList'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
function SignUp() {
  let navigate = useNavigate()
  const [userList,setUserList] = useState([])
  useEffect(()=>{
    setUserList(GetUserList())
  },[])
  const getAccount = (account) => {
 
 
    const userCheck = userList.some((user)=>{
        return  user.email == account.email
    })
    if(account.name === '' || account.email === '' || account.password === ''){
      toast.warning('Please fill in all necessary information!')
    }
    else if(userCheck){
      toast.warning('This email has been used!')
    } else {

      url.post(`/users.json`, account)
        .then(res => {
  
  
          console.log(res)
          // setUserList(GetUserList())
          toast.success('Your account has been sucessfully created!')
          
        })
        .catch(err => console.log(err))
        // setTimeout(()=>{
        //   window.location.reload()
        // },[2000])
        
    }
    

  }
  


  return (
    <div>

      <h1 style={{color:'white'}}>Register</h1>
      <ToastContainer/>
      <Form onSubmit={getAccount} />

    </div>
  )

}

export default SignUp