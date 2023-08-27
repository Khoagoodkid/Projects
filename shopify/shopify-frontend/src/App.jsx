import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import SingleProduct from './pages/single-product/SingleProduct'
import ChargeMoney from './pages/charge-money/ChargeMoney'
import BillManager from './pages/bills-manager/BillManager'
import Profile from './pages/profile/Profile'
export const AuthContext = createContext()
function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user,setUser}}>

        <Routes>

          <Route path='/' element={user ? <Home/> : <Login/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/products/:category' element={<Products/>}/>
          <Route path='/product/:id' element={<SingleProduct/>}/>
          <Route path='/charge-money' element={<ChargeMoney/>}/>
          <Route path='/bills' element={<BillManager/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </AuthContext.Provider>

    </BrowserRouter>
  )
}

export default App
