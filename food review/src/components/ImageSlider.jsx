import React from 'react'
import ReactModal from 'react-modal'
import "./ImageSlider.css"
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import CloseIcon from '@mui/icons-material/Close';
const bg = {
    overlay:{
        background:'rgba(0,0,0,0.7)'
    }
}
function ImageSlider({ isImageShown, setIsImageShown, imgList }) {
    console.log({ imgList })
    return (
        <ReactModal isOpen={isImageShown} className="imgModal" style={bg}>
            <CloseIcon color='info' fontSize='large' className='closeIcon' onClick={()=>setIsImageShown(false)}/>
            <div className="slide-container">
                <Slide>
                    {imgList !== undefined ? (imgList.map((slideImage, index) => (
                        <div className="each-slide" key={index}>
                            <div className='imgContainer'>
                                <img src={slideImage} style={{ width: "100%", height: "100%",borderRadius:"0.5em" }} className="img1" />
                            </div>
                        </div>
                    ))) : ('')}

                </Slide>
            </div>
        </ReactModal>


    )
}

export default ImageSlider