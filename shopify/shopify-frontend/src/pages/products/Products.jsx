import React, { useEffect, useState } from 'react'
import "./Products.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { PRODUCT_API } from '../../routes';
import NavigationBar from '../../components/navigation-bar/NavigationBar';
import TopBar from '../../components/top-bar/TopBar';
import { Link } from 'react-router-dom';
function Products() {
    const [products, setProducts] = useState(null)
    const { category } = useParams();
    useEffect(() => {
        axios.get(PRODUCT_API + category)
            .then(res => setProducts(res.data))
    }, [category])

    return (
        <div className='products-body'>
            <NavigationBar />
            <div className="products-container">
                <TopBar />
                <div className='products-display'>
                    {products?.slice(0, 3).map((product) => {
                        return (
                            <div className='product-card top'>
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
                        )
                    })}
                    <div className='products-advertisement'>
                        <div className='row'>
                            <img src="https://martech.org/wp-content/uploads/2017/05/how-to-structure-the-perfect-shopping-campaign-featured-large.png" />
                        </div>
                        <div className='row'>

                            <img src="https://st4.depositphotos.com/3591429/23741/v/1600/depositphotos_237416222-stock-illustration-big-sale-promotion-shop-advertisement.jpg" alt="" />
                            <img src="https://st4.depositphotos.com/3591429/23741/v/1600/depositphotos_237416222-stock-illustration-big-sale-promotion-shop-advertisement.jpg" alt="" />
                        </div>
                    </div>


                    {products?.slice(3, products.length).map((product) => {
                        return (
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
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Products