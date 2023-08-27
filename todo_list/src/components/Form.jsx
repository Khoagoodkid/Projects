import React, { useEffect, useState } from 'react'
import "./Form.css"
import TextField from '@mui/material/TextField'
// import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Form({ isLogin, onSubmit, checkUser, authUser }) {
    let navigate = useNavigate()
    const [account, setAccount] = useState({
        email: '',
        name: '',
        password: '',
        // _id: '',
    })
    const [boxIsChecked, setBoxIsChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const submitHandler = (e) => {
        
        e.preventDefault()
        if (boxIsChecked) {
           
            {
                isLogin ? (
                    
                    checkUser(account)
                    
                ) : (
                    onSubmit({
                        ...account,
                        // _id: uuidv4()
                    })
                  
                )
            }
        
            setAccount({
                email: '',
                name: '',
                password: '',
                // _id: '',
            })
        } else {
            alert('You have to check the box!!')
        }



    }
    const checkHandle = (e) => {
        if (e.target.checked) {
            setBoxIsChecked(true)
        } else {
            setBoxIsChecked(false)
        }
    }
    return (
        <form className="formBody" onSubmit={submitHandler} >

            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <FilledInput
                    type='email'
                    className="form-control"
                    value={account.email}
                    size="100%"
                    variant="filled"
                    helperText="Please enter your email"
                    onChange={(e) => setAccount({ ...account, email: e.target.value })} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            {isLogin ? ('') : (
                <div className="form-group">
                    <label for="exampleInputUsername1">Username</label>
                    <FilledInput
                        className="form-control"
                        variant="filled"
                        size='medium'
                        helperText="Please enter your name"
                        value={account.name}
                        onChange={(e) => setAccount({ ...account, name: e.target.value })} />

                </div>
            )}
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <FilledInput
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    value={account.password}
                    variant="filled"
                    helperText="Please enter your password"
                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}

                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    }

                />

            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={checkHandle} />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Form