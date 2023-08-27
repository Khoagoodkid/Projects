import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Avatar from '@mui/material/Avatar'
import "./ShopDetails.css"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
function ShopDetails({ shop, isShopShown }) {

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)


  return (
    isShopShown ? (
      <div className='bodyShopDetails'>
        <h1> {shop.name}</h1>
        <div className='basicInfoContainer'>
          <span className='basicInfo'>Địa chỉ: {shop.address}</span>
          <span className='basicInfo'>Giờ mở cửa: {shop.openingHours}</span>
          <span className='basicInfo'>Giá: {shop.price}</span>
          <span className='basicInfo'>Bình luận</span>
        </div>
        <div className='reviewContainer'>
          <KeyboardDoubleArrowLeftIcon className='arrow' fontSize='large' onClick={()=>{
            setStart(Math.max(0,start-1))
            setEnd(Math.max(1,end-1))
          }}/>
          {shop.review.slice(start, end).map((review) => {
            return (
              <div className='reviewCard'>
                <div className='imgBx'>
                  <Avatar src='https://baominh.tech/wp-content/uploads/2020/09/nhan-dan-facebook.png'
                    sx={{ width: "100%", height: "100%" }}
                    className="userAvatar" />
                </div>
                <div className='content'>
                  <div className='userDetails'>
                    <h2>{review.name}<br /><span>{review.status}</span></h2>
                    <p >{review.comment}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <KeyboardDoubleArrowRightIcon className='arrow' fontSize='large' onClick={()=>{
            setStart(Math.min(shop.review.length-1,start+1))
            setEnd(Math.min(shop.review.length,end+1))
          }}/>
        </div>
      </div>

    ) : (
      <div className='bodyShopDetails'>
        <h2 style={{marginTop:'70%'}}>Chi tiết cửa hàng</h2>
      </div>
    )




  )
}

export default ShopDetails