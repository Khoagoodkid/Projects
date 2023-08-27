import React, { useEffect,useState } from 'react'
import "./Home.css"
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import TopBar from '../../components/top-bar/TopBar'
import axios from 'axios'
import { PRODUCT_API } from '../../routes'
import Quality from '../../components/quality/Quality'
import Instruction from '../../components/instruction/Instruction'
import Contact from '../../components/contact/Contact'
function Home() {
  const [newestProduct,setNewestProduct] = useState(null)
  useEffect(() => {
    getNewestProduct()
  },[])
  const getNewestProduct = () => {
    axios.get(PRODUCT_API)
    .then(res => {
      res.data.sort((a,b) => {
        return  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
      console.log(res.data[0])
      setNewestProduct(res.data[0])
    })
    
  }
  return (
    <div className='home-body'>
        <NavigationBar/>
        <div className='main-container'>
          
            <TopBar/>
            <div className='newest-product-container'>
                <h1>{newestProduct?.title}</h1>
                <img src={newestProduct?.images[0]} className='newest-product'/>
                <img src={'./Vector2.png'} className='vector'/>
                <span className='newest-1'>Newest !!!</span>
                <span className='newest-2'>Newest !!!</span>
                <span className='newest-3'>Newest !!!!</span>
                <span className='newest-4'>Newest !!!</span>

            </div>
            <Quality/>
            <Instruction/>
            <Contact/>
        </div>
           

    </div>
  )
}

export default Home