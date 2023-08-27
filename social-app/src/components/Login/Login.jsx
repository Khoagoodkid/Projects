import React, { useContext, useState } from 'react'
import "./Login.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { users_api } from '../../routes';
import axios from 'axios';
import { AuthContext } from '../../App';
export default function Login() {
    const {user,setUser} = useContext(AuthContext)
    const [auth, setAuth] = useState({
        email:'',
        password:''
    })
    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await axios.get(users_api)
        console.log(res.data)
        const check = res.data.find(user => {
            return user.email == auth.email && user.password == auth.password
        })
        if(check) {
            // console.log(check)
            setUser(check)
        }
    }
    return (
        <div className='loginBody'>
            <h1>Login</h1>
            <span>Connect to the world!</span>
            <form onSubmit={submitHandler}>
                <div className='row'>
                    <EmailIcon className='icon' />
                    <input type='email'
                        onChange={(e) => setAuth({
                            ...auth,
                            email:e.target.value
                        })}
                    />

                </div>
                <div className="row">
                    <LockIcon className='icon' />
                    <input type='password'
                        onChange={(e) => setAuth({
                            ...auth,
                            password:e.target.value
                        })}/>

                </div>
                <button type='submit'>
                    Log in
                </button>
            </form>

        </div>
    )
}
