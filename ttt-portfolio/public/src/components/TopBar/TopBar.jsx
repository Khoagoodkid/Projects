import React from 'react'
import "./TopBar.css"
import { Link } from 'react-router-dom'

function TopBar() {
    return (
        <div className='topBarBody'>
            <div className='webName'>
                Portfolio
            </div>
            <div className='navigators'>
                <Link to='/' className='nav'>Home</Link>
                <Link to='/aboutme' className='nav'>About Me</Link>
                <Link to='/' className='nav' >Products</Link>
                <Link to='/' className='nav'>Contact</Link>

            </div>
        </div>
    )
}

export default TopBar