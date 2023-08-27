import React from 'react'
import "./FrameworkSlider.css"
import Khoa from '../../assets/Khoa.png'
import test from '../../assets/test.jpg'
import TagCloud from 'TagCloud'


import { useEffect, useRef, useState } from 'react'
// import { Tag } from '@mui/icons-material'
function FrameworkSlider() {
    const isLoaded = useRef(false)
    const texts = [
        'Html', 'Css', 'Javascript',
        'Flutter', 'Mongoose', 'React',
        'Npm', 'Material UI', 
        'Bootstrap', 'NodeJS', 'MongoDB',
        'Express', 'Firebase', 'JQuery', 'Laravel',
        'Php', 'MySQL','ReactJS','Scss'
    ];
    useEffect(() => {
        if (isLoaded.current) return
        setTimeout(() => {

            loadTagCloud()
        }, [3000])
        isLoaded.current = true
    }, [])
    const loadTagCloud = () => {
        TagCloud('.slider', texts, {
            radius: 350,
            maxSpeed: 'fast',
            initSpeed:'fast',
            direction: 135,
            keep: true,


        })
        // setIsLoaded(false)
    }
    return (
        <div className='sliderBody' id='sliderBody'>
            <div className='slider'>

            </div>



        </div>
    )
}

export default FrameworkSlider