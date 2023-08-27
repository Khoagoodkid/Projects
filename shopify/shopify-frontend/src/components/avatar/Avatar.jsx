import React from 'react'

function Avatar({src, width,height,borderRadius}) {
  return (
    <img src={src} 
        style={{
            width:width,
            height:height,
            borderRadius:borderRadius
        }}
    />
  )
}

export default Avatar