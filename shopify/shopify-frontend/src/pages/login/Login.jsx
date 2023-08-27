import React,{useState,useContext} from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import { API } from '../../routes'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'

function Login() {
    const {user,setUser} = useContext(AuthContext)
    const [account,setAccount] = useState({
        email:'',
        password:''
    })
    const loginHandler = (e) => {
        e.preventDefault()
        console.log(account)
        axios.get(API + 'users')
        .then(res => {
            const dummyUser = res.data.find(user => {
                return user.email == account.email && user.password == account.password
            })
            if(!dummyUser) {
                toast.error("Your email and password are invalid")
            } else {
                setUser(dummyUser)

            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='login-body'>
        <ToastContainer/>
        <div className='signup-container'>
            <h1>Login</h1>
            <p>Shopify - The world of shopping is waiting for you.</p>
            <form className='signup-form' onSubmit={loginHandler} >
                <h2>Email</h2>
                <input 
                type='email' required
                onChange={(e) => setAccount({...account,email:e.target.value})}
                />
             
                <h2>Password</h2>
                <input 
                 type='text' required
                 onChange={(e) => setAccount({...account,password:e.target.value})}
            />
       
                <div className='signup-footer'>

                <button type='submit' >Log In</button>
                <Link to="/signup">
                    <a href="">Don't have an account?</a>
                </Link>
                </div>
            </form>


        </div>
    </div>
  )
}

export default Login