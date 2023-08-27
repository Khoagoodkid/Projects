import React, { useState } from 'react'
import "./SignUp.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { users_api } from '../../routes';
import Verification from '../Verification/Verification';
function SignUp() {
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [verifyCode,setVerifyCode] = useState(null)
    const submitHandler = async(e) => {
        e.preventDefault()
        const res = await axios.get(users_api)
        const check = res.data.some(user => {
            return newUser.email == user.email 
        })
        // console.log(newUser)
        if (newUser.email && newUser.name && newUser.password && !check) {
            const verifyCode = Math.floor(Math.random() * 999999) + 100000
            axios.post('http://localhost:3000/code', {newUser, verifyCode})
            console.log("created!")
            setVerifyCode(verifyCode)
        }   
    }
    const postAccount = () => {
        axios.post('http://localhost:3000/users', {newUser, verifyCode})
    }

    return (
        <div className='signUpBody'>

            {verifyCode &&    <Verification verifyCode={verifyCode}
                postAccount ={postAccount}
            />}
         
            <h1>Sign Up</h1>
            <span>Connect to the world!</span>
            <form onSubmit={submitHandler}>
                <div className='row'>
                    <EmailIcon className='icon' />
                    <input type='email'
                        onChange={(e) => setNewUser({
                            ...newUser,
                            email: e.target.value
                        })}
                    />

                </div>
                <div className="row">
                    <PersonIcon className='icon' />
                    <input type='name'
                        onChange={(e) => setNewUser({
                            ...newUser,
                            name: e.target.value
                        })} />

                </div>
                <div className="row">
                    <LockIcon className='icon' />
                    <input type='password'
                        onChange={(e) => setNewUser({
                            ...newUser,
                            password: e.target.value
                        })} />

                </div>
                <button type='submit'>
                    Sign up
                </button>
            </form></div>
    )
}

export default SignUp