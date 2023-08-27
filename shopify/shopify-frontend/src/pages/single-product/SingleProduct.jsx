import React, { useEffect, useState, useContext } from 'react'
import "./SingleProduct.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API, BILLS_API, CART_API, COMMENTS_API, PRODUCT_API, SINGLE_PRODUCT_API } from '../../routes'
import Rating from '@mui/material/Rating'
import { AuthContext } from '../../App'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import TopBar from '../../components/top-bar/TopBar'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import Carousel from 'react-bootstrap/Carousel';
import Avatar from '../../components/avatar/Avatar'
import CommentCard from '../../components/comment-card/CommentCard'
import { ToastContainer, toast } from 'react-toastify'
import BudgetManager from '../../components/budget-manager/BudgetManager'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RelatedProducts from '../../components/related-products/RelatedProducts'
import { ratingStyle } from '../../styles'
function SingleProduct() {
    const { id } = useParams()
    const { user, setUser } = useContext(AuthContext)

    const [choices, setChoices] = useState('description')
    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState({
        userId: user._id,
        productId: id,
        content: '',
        created_at: new Date(),
        like: 0,
        dislike: 0,
        rating: 0,
    })

    const [product, setProduct] = useState(null)

    const [bill, setBill] = useState({
        userId: user._id,
        productId: id,
        amount: 0,
        total: 0,
        delivered_at: null,
        created_at: null

    })
    const daysAfterOrdered = 5
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [starColor,setStarColor] = useState(null)
    useEffect(() => {
        axios.get(SINGLE_PRODUCT_API + id)
            .then(res => {
                setProduct(res.data)
                fetchRelatedProducts(res.data)
            })
        fetchComments()
        window.scrollTo(0, 0)
    }, [id])
     const purchase = (bill) => {
        let date = new Date();

        axios.post(BILLS_API, {
            ...bill,
            created_at: new Date().toLocaleString(),
            delivered_at: new Date(date.setDate(date.getDate() + daysAfterOrdered)).toLocaleString(),

        })
        updateBudget(bill.total)
        setIsOpenModal(false)
        axios.patch(SINGLE_PRODUCT_API + 'selling-times/'+ product._id,{
            increment:  product.sellingTimes + 1
        })
        toast.success("You have bought the" + " "+ product?.title + 'successfully !')
    }
    const postCommentHandler = (e) => {
        e.preventDefault()

        if (comment.rating > 0) {

            axios.post(COMMENTS_API, comment)
            setCommentList([...commentList,
                comment
            ])

            setComment({
                ...comment,
                content: '',
                rating: 0,
            })
        } else {
            toast.error("Please rate the product!")
        }


    }
    const fetchComments = () => {
        axios.get(COMMENTS_API + id)
            .then(res => setCommentList(res.data))
    }
    const updateBudget = (money) => {
        setUser({
            ...user,
            budget: user.budget - money
        })
        axios.put(API + 'users/' + user._id, {
            moneyToDecrease: money
        })
    }
    const fetchRelatedProducts = (product) => {
        console.log(product?.category.name)
        axios.get(PRODUCT_API + product?.category.name)
            .then(res => {
                const dummyData = res.data.filter(product1 => {
                    return product1._id != product._id
                })
                setRelatedProducts(dummyData)})
    }
    const addToCart = () => {
        axios.post(CART_API, bill)
    }
    return (
        <div className='single-product-body'>
            <BudgetManager
                budget={user.budget}
                bill={bill}
                purchase={purchase}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                product={product}
            />
            <ToastContainer />
            <TopBar />
            <div className='single-product-container'>
                <div className='product-wrapper'>
                    <div className="left">
           
                        <Carousel>
                            {product?.images.map((image) => {
                                return (
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-120"
                                            src={image}
                                            alt="First slide"
                                        />

                                        {/* <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="right">
                        <h1>{product?.title}</h1>
                        <Rating name="read-only" value={parseInt(product?.rating)} precision={0.1} readOnly
                            emptyIcon={
                                <StarBorderIcon fontSize="inherit" style={{ color: 'white' }} />
                            }
                        />
                        <h2 style={{ color: 'red' }}>{product?.price}.00$</h2>
                        <hr />
                        <p>{product?.description}</p>
                        <hr />
                        <div className='buying-amount'>
                            <input value={bill.amount} />
                            <AddCircleIcon onClick={() => setBill({
                                ...bill, amount: bill.amount + 1,
                                total: (bill.amount + 1) * product?.price
                            })} />
                            <RemoveCircleIcon onClick={() => {
                                if (bill.amount > 0) {

                                    setBill({
                                        ...bill, amount: bill.amount - 1,
                                        total: (bill.amount - 1) * product?.price
                                    })
                                }
                            }
                            } />
                            <span>{product?.sellingTimes} products have been sold.</span>
                        </div>
                        <div className='add-buy-btn'>
                            <button className='add-to-cart-btn' 
                                onClick={() => addToCart()}
                            >
                                Add to cart  <ShoppingCartIcon />
                            </button>
                            <button className='buy-btn' onClick={() => {
                                if (bill.amount > 0) {

                                    setIsOpenModal(true)
                                } else {
                                    toast.error("Please select the number of product you want to buy")
                                }
                            }}>
                                Buy Now <PaidIcon />
                            </button>
                        </div>
                        <hr />
                        <span>Category: {product?.category?.name}</span>
                    </div>
                </div>

                <div className='product-description-container'>
                    <div className='choices'>
                        <h2 className={choices == 'description' ? 'choosen' : ''}
                            onClick={() => setChoices('description')}
                            style={{   fontFamily: 'Pacifico, cursive'}}
                        >Description</h2>
                        <h2 className={choices == 'comments' ? 'choosen' : ''}
                            onClick={() => setChoices('comments')}
                            style={{   fontFamily: 'Pacifico, cursive'}}
                        >Comments</h2>
                    </div>
                    <hr style={{ width: '80%' }} />
                    <div className="content">
                        {choices == 'description' &&
                            <div>
                                <p>Pellentesque magna libero, eleifend eu mauris ac, laoreet sollicitudin ex. Nunc id faucibus augue, ut semper erat. Aenean nulla libero, dignissim vitae odio quis, rhoncus accumsan lorem. Proin eget rhoncus tellus, et mattis magna. Nulla ut mattis turpis.
                                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis eg estas. Morbi venenatis rhoncus aliquam.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum nisl ac augue consequat, quis eleifend velit suscipit.
                                    Praesent interdum elit id enim ultricies sollicitudin.
                                    Vivamus magna tellus, condimentum vel lorem in, laoreet feugiat nibh.
                                    Donec id metus eget ante lobortis interdum. In volutpat lorem a sem placerat luctus.
                                    Duis ut diam augue. Donec id justo egestas, suscipit magna ac, volutpat lectus. Nulla condimentum in ex non aliquet.
                                    Quisque congue vel dui sed tempus. Quisque dictum mollis pretium. Phasellus purus leo, malesuada eget lacus aliquet, euismod euismod ipsum. Quisque condimentum ipsum felis, in suscipit nibh fermentum ut. Praesent ut fringilla lacus. In consequat feugiat purus eu maximus. Nam vel dictum tortor, eget fermentum massa. Pellentesque nulla ligula, tempus vitae aliquet eget, eleifend vel magna.
                                </p>
                            </div>
                        }
                        {choices == 'comments' &&
                            <div>
                                <div className='comment-display'>
                                    {commentList.length > 0 && commentList.map(comment => {
                                        return (
                                            <div>
                                                <CommentCard comment={comment}
                                                    commentList={commentList}
                                                    setCommentList={setCommentList}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <form className='comment-input' onSubmit={postCommentHandler}>
                                    <Avatar
                                        width='3em'
                                        height='3em'
                                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                        borderRadius='50%'
                                    />
                                    <div>
                                        <input
                                            onChange={(e) => setComment({ ...comment, content: e.target.value })}
                                            value={comment.content}
                                        />
                                        <Rating
                                            name="simple-controlled"
                                            value={comment.rating}
                                            onChange={(event, newValue) => {
                                                setComment({
                                                    ...comment,
                                                    rating: newValue
                                                });
                                                // console.log(event)
                                            }}
                                            onChangeActive={(event,newValue) => {
                                               setStarColor(ratingStyle[newValue] || null)
                                            }} 
                                            
                                            sx={{color: starColor || ratingStyle[comment.rating]}}
                                            emptyIcon={
                                                <StarBorderIcon fontSize="inherit" style={{ color: 'white' }} />
                                            }
                                        />
                                    </div>
                                    <button type='submit'>Post</button>
                                </form>
                            </div>
                        }
                    </div>
                    <hr style={{ width: '80%' }} />
                </div>
                <RelatedProducts
                    relatedProducts={relatedProducts}
                />
            </div>
        </div>
    )
}

export default SingleProduct