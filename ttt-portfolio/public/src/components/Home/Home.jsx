import React from 'react'
import "./Home.css"
import TopBar from '../TopBar/TopBar'
import overlay from '../../assets/overlay1.png'
import boy from '../../assets/boy.png'
function Home() {
    return (
        <div className='homeBody'>
            <TopBar />
            <div className='intro'>
                <div className='info'>
                    <span >Hi! I'm Shera Tran</span>
                    <span style={{color:'#e4a32f'}}>UX/UI Designer</span>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown 
                        printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className='contact'>
                        <div className='email'> 
                            <span>Email</span>
                            <span>thanhtructran@gmail.com</span>
                        </div>
                        <div className='advance'>
                            <span>Advance</span>
                            <span>thanhtructran@hotmail.com</span>
                        </div>
                    </div>
                    <div className='contactBtn'>
                        <button>Contact Me</button>
                        <button>Hire Me</button>
                    </div>
                </div>
                <div className='image'>
                    <img src ={overlay}/>
                    <img src={boy} style={{height:'50em'}}/>
                </div>
            </div>
           
          
        </div>
    )
}

export default Home