import React from 'react'
import TextField from '@mui/material/TextField'
import "./Contact.css"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const details = [
    {
        name:'email',
        icon: <EmailOutlinedIcon sx={{fontSize:'1.5em'}}/>,
        text:'shopify@gmail.com'
    },
    {
        name:'phone',
        icon: <LocalPhoneOutlinedIcon sx={{fontSize:'1.5em'}}/>,
        text:'0123456789'
    },
    {
        name:'address',
        icon: <BusinessOutlinedIcon sx={{fontSize:'1.5em'}}/>,
        text:'46 Green Street'
    },
    {
        name:'openingHour',
        icon: <AccessTimeOutlinedIcon sx={{fontSize:'1.5em'}}/>,
        text:'8.00 - 17.00'
    },

]
function Contact() {
  return (
    <div className='contact-body'>
        
        <h1>Contact us</h1>
        <hr style={{width:'10%', marginTop:'-1em',backgroundColor:'#fdc807',border:'none',height:'.1em'}}/>
        <p>If you face any trouble, feel free to contact us via the form or the information below.</p>
        <form>
        <h2>Email</h2>
        <TextField id="standard-basic" label="guest@gmail.com" variant="standard" sx={{borderBottom:'.1em solid white',label:{color:'white'},input:{color:'white'},marginTop:'-2em'}} />
        <h2>Username</h2>
        <TextField id="standard-basic" label="guest" variant="standard" sx={{borderBottom:'.1em solid white',label:{color:'white'},input:{color:'white'},marginTop:'-2em'}} />
        <h2>Content</h2>
        <TextField id="standard-basic" label="What do want to say" 
        variant="standard" 
        sx={{borderBottom:'.1em solid white',label:{color:'white'},input:{color:'white'},marginTop:'-2em'}} />


        </form>
        <div className='detail-container'>
            <h2>Info</h2>
          
            {details.map(detail => {
                return (
                    <div className='detail-card'>
                        {detail.icon}
                        <span>{detail.text}</span>
                        </div>
                )
            })}
        </div>
        <div className='admin-image-container'> 

        </div>
    </div>
  )
}

export default Contact