import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import "./SingleFood.css"
import Avatar from '@mui/material/Avatar'
import ShopDetails from "./ShopDetails";
import Rating from '@mui/material/Rating'
import ImageSlider from "./ImageSlider";

const app = initializeApp({
    apiKey: "AIzaSyApWYWkSb_HJQadX8qztfE_I17yf6LJfWs",
    authDomain: "test-6e1ac.firebaseapp.com",
    projectId: "test-6e1ac",
    storageBucket: "test-6e1ac.appspot.com",
    messagingSenderId: "14156452871",
    appId: "1:14156452871:web:93faaf14d7997b15cec6a2",
    measurementId: "G-6Y0YV0Q9W6"
})
const translator = {
    "price": "Giá tiền",
    "ingredients": "Nguyên liệu",
    "shops": "Các cửa hàng",
    "rating": "Đánh giá",
    "images": "Hình ảnh"

}

function SingleFood() {
    const nameID = useParams()

    const [offers, setOffers] = useState([])
    const bottomRef = useRef(null)
    const [food, setFood] = useState({})

    const [shop, setShop] = useState({})
    const [isShopShown, setIsShopShown] = useState(false)
    const [isImageShown, setIsImageShown] = useState(false)
    
    const apiCall = async () => {
        const database = getFirestore(app)
        const foodCol = collection(database, 'food_information');
        const foodSnapshot = await getDocs(foodCol);
        const foodList1 = foodSnapshot.docs.map(doc => doc.data());
        getSingleFood(foodList1)
    

    }
    useEffect(() => {
        apiCall()
     
    }, [])



    const getSingleFood = (foodList) => {

        const food1 = foodList.filter(food => {
            return food.nameID == nameID.nameID
        })

        setFood(food1[0])
        console.log({ food })
    }


    const getPrice = (price) => {

        setOffers([...offers, price])


    }
    const getIngredients = (ingredients) => {

        setOffers([...offers, ingredients])

    }
    const getShops = (shops) => {
        setOffers([...offers, shops])

    }
    const getComments = () => {

    }
    const getRating = (rating) => {
        setOffers([...offers, rating])
    }
    const getImages = (images) => {
        setIsImageShown(true)


    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [offers])

    return (

        
            <div className="singleFoodBody">
                <div className="features">

                    <span className="color"></span><button className="featureBtn" onClick={() => getPrice("price")}>Giá tiền</button>
                    <button className="featureBtn" onClick={() => getIngredients("ingredients")}>Nguyên liệu</button>
                    <button className="featureBtn" onClick={() => getShops("shops")}>Các cửa hàng</button>

                    <button className="featureBtn" onClick={() => getRating("rating")}>Đánh giá</button>
                    <button className="featureBtn" onClick={() => getImages("images")}>Hình ảnh</button>

                </div >
                <div className="chatArea">
                    <Avatar
                        alt="Remy Sharp"
                        src="https://xtmechanicalblog.com/upload/post/1661066792.chat-bot-head-set-760.jpeg"
                        sx={{ width: "5em", height: "5em" }}
                        className="botLogo"
                    />
                    <div className="boxChat" id="boxChat">

                        {offers.map(offer => {
                            return (
                                <div>

                                    <div className="userChat">
                                        <div className="userChatBubble">
                                            {translator[offer].toUpperCase()}
                                        </div>
                                    </div>
                                    {Array.isArray(food[offer]) && offer === "shops" ? (food[offer].map((res) => {
                                        return (
                                            <div className="botChat">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://st3.depositphotos.com/8950810/17657/v/1600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"
                                                    sx={{ width: "2em", height: "2em" }}

                                                />
                                                <div className="userChatBubble" id="shops" onClick={() => {
                                                    setIsShopShown(true)
                                                    setShop(res)
                                                    console.log({ shop, isShopShown })
                                                }}>
                                                    {res.name}
                                                </div>
                                            </div>
                                        )
                                    })) : (
                                        !Array.isArray(food[offer]) && offer === 'price' ? (
                                            <div className="botChat">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://st3.depositphotos.com/8950810/17657/v/1600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"
                                                    sx={{ width: "2em", height: "2em" }}

                                                />
                                                <div className="userChatBubble">
                                                    {food[offer]}
                                                </div>
                                            </div>

                                        ) : (
                                            offer === 'rating' ? (
                                                <div className="botChat">
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src="https://st3.depositphotos.com/8950810/17657/v/1600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"
                                                        sx={{ width: "2em", height: "2em" }}

                                                    />
                                                    <div className="userChatBubble">
                                                        <Rating name="read-only" value={food[offer]}
                                                            precision={0.5}
                                                            readOnly
                                                            size="small"

                                                        />

                                                    </div>
                                                </div>

                                            ) : (
                                                food[offer].map((res) => {
                                                    return (
                                                        <div className="botChat">
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src="https://st3.depositphotos.com/8950810/17657/v/1600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"
                                                                sx={{ width: "2em", height: "2em" }}

                                                            />
                                                            <div className="userChatBubble">
                                                                {res}

                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )

                                        )

                                    )}




                                </div>
                            )
                        })}

                        <div ref={bottomRef}>

                        </div>
                    </div>
                    <div className="userInput">Bấm vào nút bên trái để xem chi tiết</div>
                </div>
                <ShopDetails shop={shop} isShopShown={isShopShown} />
                <ImageSlider isImageShown={isImageShown} setIsImageShown={setIsImageShown} imgList={food.imgs} />

            </div >
        

    )
}
export default SingleFood