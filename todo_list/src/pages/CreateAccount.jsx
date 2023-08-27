import React from 'react'
import SignUp from './signup/SignUp'
import Login from './login/Login'
import "./CreateAccount.css"
function CreateAccount() {
  return (
    <div className='createAccountContainer'>
        <SignUp/>
        <Login />

    </div>
  )
}

export default CreateAccount