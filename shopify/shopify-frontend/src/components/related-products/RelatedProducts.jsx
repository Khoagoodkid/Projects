import React from 'react'
import "./RelatedProducts.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
function RelatedProducts({ relatedProducts }) {
    return (
        <div className='related-product-body'>
            <h1 style={{   fontFamily: 'Pacifico, cursive'}}>
                Related Products
            </h1>
            <div className='related-product-container'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
              
                >
                    {relatedProducts.map(product => {
                        return (
                            <SwiperSlide>

                                <div className='product-card '>
                                    <div className='product-img-wrapper'>
                                        <img src={product.images[0]} />
                                    </div>
                                    <div className='product-info'>

                                        <h2>{product.title}</h2>
                                        <h3 style={{ marginTop: '-1.2em' }}>{product.price}.00$</h3>
                                    </div>
                                    <Link to={`/product/${product._id}`}>
                                        <button>View more</button>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
        </div>
    )
}

export default RelatedProducts