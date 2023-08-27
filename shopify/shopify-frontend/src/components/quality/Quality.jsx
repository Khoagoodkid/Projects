import React from 'react'
import "./Quality.css"
const qualities = [
    {
        name:'Buyer Protection',
        description: 'Secure your purchases – no matter how you pay ',
        thumb:"https://www.trustedshops.eu/wp-content/uploads/2021/01/Buyer-protection.svg",
    },
    {
        name:'Trustmark',
        description: 'Fully trusting our excellent with high securing system, otherwise you will be given a refund',
        thumb:"https://www.trustedshops.eu/wp-content/uploads/2022/03/@2xtrustmark-header.png",
    },
    {
        name:'Convenience',
        description: 'Immediately purchasing your favorite product within a few clicks',
        thumb:"https://cdn-icons-png.flaticon.com/512/1557/1557527.png",
    },
]
function Quality() {
  return (
    <div className='quality-body'>
        <h1>About Our Services</h1>
        <hr style={{width:'20%', marginTop:'-1em',backgroundColor:'#fdc807',border:'none',height:'.1em'}}/>
        <div className='quality-container'>
            {qualities.map(quality => {
                return <div className='quality-card'>
                        <img src={quality.thumb}/>
                        <h2>{quality.name}</h2>
                        <p style={{fontSize:'1.2em'}}>{quality.description}</p>
                    </div>
            })}
        </div>
    </div>
  )
}

export default Quality