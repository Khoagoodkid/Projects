import React, { useEffect, useState } from 'react'
import "./Intro.css"
import { Link } from 'react-router-dom'
function Intro() {



  return (
 
      <div className='introContainer'>
        <h1
          className='introText'
        >Chào mừng đến với</h1>
        <div className='textLoader'>

          <h1>THẾ GIỚI ẨM THỰC</h1>
        </div>
        <Link to='/foods  '>
          <a href='#' className='introBtn'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Tìm hiểu
          </a>
        </Link>

      </div>
  

  )
}

export default Intro