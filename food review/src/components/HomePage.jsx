import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import "./HomePage.css"
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
const app = initializeApp({
  apiKey: "AIzaSyApWYWkSb_HJQadX8qztfE_I17yf6LJfWs",
  authDomain: "test-6e1ac.firebaseapp.com",
  projectId: "test-6e1ac",
  storageBucket: "test-6e1ac.appspot.com",
  messagingSenderId: "14156452871",
  appId: "1:14156452871:web:93faaf14d7997b15cec6a2",
  measurementId: "G-6Y0YV0Q9W6"
})
const pageNum = ['1', '2', '3', '4', '5', '6']


function HomePage() {
  const [foodList, setFoodList] = useState([])
  const [showStart, setShowStart] = useState(0)
  const [showEnd, setShowEnd] = useState(3)
  const [isLoading,setIsLoading] = useState(false)
  const apiCall = async () => {
    const database = getFirestore(app)
    const foodCol = collection(database, 'food_information');
    const foodSnapshot = await getDocs(foodCol);
    const foodList = foodSnapshot.docs.map(doc => doc.data());
    setFoodList(foodList)

  }

  useEffect(() => {
    apiCall()
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },3000)
  }, [])
  console.log(foodList)

  const displayPage = (num) => {
    setShowEnd(num * 3)
    setShowStart(num * 3 - 3)
  }
  return (
    <div className="homeBody">
      {isLoading ? (
      <ClimbingBoxLoader color='#f0e1b1'isLoading={isLoading} size='3em' style={{marginTop:'50%'}}/>
      ) : (<>
        <div className="cards">

        {foodList.slice(showStart, showEnd).map(food => {
          return (
            <div className="food-card">
              <div className="face face1">
                <div className="introContent">
                  <img className="food-img" src={food.img} />
                  <h1>{food.name}</h1>
                </div>
              </div>


              <div className="face face2">
                <div className="introContent">
                  <p>{food.briefReview}</p>
                  <Link to={`/foods/${food.nameID}`} key={food.nameID} >
                    <button className="viewBtn" >Tìm hiểu thêm</button>


                  </Link>

                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pagination">
        <button className="pageBtn" onClick={() => {
          setShowStart(Math.max(0, showStart - 3))
          setShowEnd(Math.max(3, showEnd - 3))
        }}>Trang trước</button>
        {pageNum.map(page => {
          return (
            <button className="pageBtn" onClick={() => displayPage(page)}>{page}</button>
          )

        }
        )}
        <button className="pageBtn" onClick={() => {
          setShowStart(Math.min(15, showStart + 3))
          setShowEnd(Math.min(18, showEnd + 3))
        }}>Trang sau</button>
      </div>
      </>

      )}


    </div>
  )
}

export default HomePage