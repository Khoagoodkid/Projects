import React, { useState, useEffect } from 'react'
import "./Skills.css"
import NavBar from '../../components/NavBar/NavBar'
import Loading from '../../components/Loading/Loading'

import ProgressBar from '../../components/ProgressBar/ProgressBar'
import MonitorIcon from '@mui/icons-material/Monitor';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
const skills = [
    {
        name: 'Frontend',
        percent: 85,
        color: '#58ed55',
        boxShadow:'rgba(88, 237, 85,0.5)'
    },
    {
        name: 'Backend',
        percent: 55,
        color: '#f73650',
        boxShadow:'rgba(247, 54, 80,0.5)'
    },
    {
        name: 'ReactJS',
        percent: 80,
        color: '#ffee03',
        boxShadow:'rgba(255, 238, 3,0.5)'
    },
    {
        name: 'Javascript',
        percent: 70,
        color: '#5656f5',
        boxShadow:'rgba(86, 86, 245,0.5)'
    },
    {
        name: 'NodeJS',
        percent: 50,
        color: '#ffa14f',
        boxShadow:'rgba(255, 161, 79,0.5)'
    },

]
const services = [
    {
        name: 'User Experience / User Interface',
        img:<MonitorIcon/>,
    },
    {
        name: 'Game Development',
        img:<SportsEsportsIcon/>,
    },
    {
        name: 'Mobile App Development',
        img:<PhoneIphoneIcon/>,
    },
]
function Skills() {
    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        setTimeout(() => {

            setIsShown(true)
        }, [3000])
    }, [])

    return (

        <div className='skillsBody'>
            <NavBar />

            <div className='skillsContainer'

            >


                <Loading />
                {isShown && <>
                    <div className="display">
                        <div className="text">
                            <h1 style={{ color: '#0bd3b4', fontFamily: 'Gloria Hallelujah, cursive' }}>What do my skills include ?</h1>
                            <p> Since early, I have been curious about high-tech services and how it serves
                                human life technically. At the beginning, I tried creating basic websites and found it
                                really difficult to handle, but now I am proud to say that I am an expert web developer
                            </p>
                            <p>
                                First I have been exposed to front-end tools, including Html, Css, Javascript, for
                                roughly 2 years and started becoming full-stack developer by inquiring back-end systems,
                                including MongoDB, NodeJS, Express...
                            </p>

                        <div className='services'>
                            <h2 style={{ color: '#0bd3b4' }}>Other services</h2>
                            {services.map((service) => {
                                return (
                                    <div className='serviceCard'>
                                        {service.img}
                                        <span>{service.name}</span>
                                        </div>
                                )
                            })}
                        </div>
                        </div>
                    </div>
                    <div className='cube'>
                        {skills.map((s, index) => {
                            return (
                                <div style={{ width: '100%', height: '8em' }}>

                                    <ProgressBar skill={s} floatDir={index % 2 != 0 ? 'right' : 'left'} />
                                </div>
                            )
                        })}
                    </div>
                </>}



            </div>
        </div>
    )
}

export default Skills