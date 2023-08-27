import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import "./MemberCard.css"
import axios from 'axios'
import { usersUrl } from '../../tools'
function MemberCard({ socketId, dummy }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        console.log(socketId)
        getUser()
    }, [])
    const getUser = async () => {

        const res = await axios.get(usersUrl + socketId)
        // console.log(res.data)
        setUser(res.data)
    }
    return (
        <div className='memberCard'>
            
            <Avatar src={dummy} sx={{ witdh: '3em', height: '3em' }} />
            <h1>{user?.name}</h1>

        </div>
    )
}

export default MemberCard