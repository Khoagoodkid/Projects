import React, { useContext, useEffect, useState } from 'react'
import "./UserInfo.css"
import Avatar from '@mui/material/Avatar'
import { UserContext } from '../../components/UserContext'
import Color from './Color'
function UserInfo({ authUser }) {
    const { user, setUser } = useContext(UserContext)
    const [colorOpen, setColorOpen] = useState(false)
    const loggedInUser = JSON.parse(window.localStorage.getItem('user'))
    useEffect(()=>{
     
      
        // console.log(loggedInUser)
        // console.log(user)
    },[loggedInUser])
    const logOut = ( ) => {
        setTimeout(() => {
            window.localStorage.removeItem('user')
            setUser(null)
        }, [2000])
    }
    return (
        <div className='userInfoContainer'>
            {colorOpen ? (

                <Color setColorOpen={setColorOpen}/>
            ) : (
                <>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://png.pngitem.com/pimgs/s/270-2707071_clipboard-to-do-list-dates-appointment-objective-gambar.png"
                        sx={{ width: '10em', height: '10em' }}
                    />
                    <h2 className='todoListIntro'>Todo List</h2>
                    <span className='todoListIntro'>A SERVICE THAT MAKES YOU LESS MEMORIZING WORKS TO BE DONE</span>
                    <div className='userInfo'>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://baominh.tech/wp-content/uploads/2020/09/nhan-dan-facebook.png"
                            sx={{ width: '2em', height: '2em' }}
                        />
                        <span style={{ marginLeft: '0.5em' }}>{loggedInUser.email}</span>

                    </div>
                    <div className='bottomBtn'>

                        <button className='LogOutBtn' onClick={() =>
                            logOut()
                        }>Log Out</button>
                        <button className='changeColorBtn'
                            onClick={() => setColorOpen(true)}
                        >
                            Change Color
                        </button>
                    </div>
                </>
            )}
        </div>

    )
}

export default UserInfo