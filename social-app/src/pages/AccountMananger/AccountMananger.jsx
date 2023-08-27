import React, { useState } from 'react'
import Login from '../../components/Login/Login'
import SignUp from '../../components/SignUp/SignUp'
import "./AccountMananger.css"

function AccountMananger() {
    const [form, setForm] = useState('')
    return (
        <div className='accountManagerBody'>
            <div className="accountManagerContainer"

            >


                <div className="account">
                    <div className="top">
                        <a  onClick={() => setForm('login')}>Login </a>
                        <a  onClick={() => setForm('signup')}>Sign up</a>
                    </div>
                    <div className="body">
                        {form === 'login' ? (

                            <Login />
                        ) : (
                            <SignUp />
                        )}

                    </div>
                </div>
                {/* <img src='bg.jpg'/> */}

            </div>
        </div>
    )
}

export default AccountMananger