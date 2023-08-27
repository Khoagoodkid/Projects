import axios from 'axios'
import React,{useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../routes'
import "./SignUp.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
    const [btnContent,setBtnContent] = useState('Sign Up')
    const [btnOpacity,setBtnOpacity] = useState(1)
    const checkRobot = useRef()
    const [account,setAccount] = useState({
        email:'',
        username:'',
        password:'',
        birthday:'',
        budget:0,
        address:'your address',


    })  
    const signUpHandler = async (e) => {
        e.preventDefault()
        console.log(account)
      
        const res = await axios.get(API + 'users')
        if( !checkRobot.current.checked) toast.error("Check the box to make sure you are not robot")
        else if(!res.data.some((user) => {return user.email == account.email})  ){
            setBtnContent('...Creating')
            setBtnOpacity(0.2)
            setTimeout(() => {

                 axios.post(API+'signup',account) 
                toast.success('Your account has been created successfully')
                setBtnContent('Sign Up')
                setBtnOpacity(1)
                setAccount({
                    email:'',
                    username:'',
                    password:'',
                    birthday:'',
                    budget:0,
                    address:'',
            
            
                })
            },2000)
        } else {
            toast.error("Your email has been used!")
        }
        
     
        
    }
  
  return (
    <div className='signup-body'>
        <ToastContainer/>
        <div className='signup-container'>
            <h1>Sign Up</h1>
            <p>Shopify - The world of shopping is waiting for you.</p>
            <form className='signup-form' onSubmit={signUpHandler} >
                <h2>Email</h2>
                <input onChange={(e) => setAccount({...account,email:e.target.value})} 
                type='email' required
                    value = {account.email}
                />
                <h2>Username</h2>
                <input onChange={(e) => setAccount({...account,username:e.target.value})}
                 type='text' required
                 value = {account.username}/>
                <h2>Password</h2>
                <input onChange={(e) => setAccount({...account,password:e.target.value})}
                 type='text' required
                 value = {account.password}/>
                <div className='robot-check'>
                <input type='checkbox' ref={checkRobot}/>
                <span>I'm not a robot</span>
                </div>
                <div className='signup-footer'>

                <button type='submit' style={{opacity:btnOpacity}}>{btnContent}</button>
                <Link to="/">
                    <a href="">Already have an account?</a>
                </Link>
                </div>
            </form>


        </div>

    </div>
  )
}

export default SignUp