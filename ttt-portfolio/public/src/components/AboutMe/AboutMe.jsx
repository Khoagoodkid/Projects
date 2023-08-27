import React from 'react'
import TopBar from '../TopBar/TopBar'
import "./AboutMe.css"
import Profile from '../Profile/Profile'
import { platforms } from '../../tools/Platform'
import Avatar from '@mui/material/Avatar'
function AboutMe() {
    return (
        <div className='aboutMeBody'>

            <TopBar />

            <Profile />
            <div className='container1'>
                <div className='summary'>
                    <h1>Summary</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the i
                        ndustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scr
                        ambled it to make a type specimen book.</p>
                </div>

            </div>
            <div className='platforms'>
                <h1>Platforms</h1>
                <div className='platformsDisplay'>


                    {platforms.map((platform) => {
                        return (
                            <div className='platformCard'>
                                <img src={platform.url} />
                                <span>{platform.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='container2'>
                <div className='technicalSkills'>
                    <h1>Technical Skills</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the i
                        ndustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scr
                        ambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the i
                        ndustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scr
                        ambled it to make a type specimen book.</p>
                </div>

            </div>

        </div>
    )
}

export default AboutMe