import React from 'react'
import "./Profile.css"
import Avatar from '@mui/material/Avatar'
import ttt from '../../assets/ttt.jpg'
export default function Profile() {
  return (
    <div className='profileBody'>
        <Avatar 
        sx={{width:'10em',height:'10em'}}
        src={ttt}/>
        <div className='info'>
            <span className='name'>Thanh Truc Tran</span>
            <span>SheraTran</span>
            <span>Studied at Practical High School</span>
            <span>From Ho Chi Minh City, Vietnam</span>
        </div>
    </div>
  )
}
