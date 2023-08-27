import React, { useContext, useEffect, useState } from 'react'
import "./BillCard.css"
import axios from 'axios'
import { API, BILLS_API, SINGLE_PRODUCT_API } from '../../routes'
import { AuthContext } from '../../App'
function BillCard({ bill, bills, setBills, option,purchase,deleteFromCart }) {
  const { user, setUser } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    axios.get(SINGLE_PRODUCT_API + bill.productId)
      .then(res => setProduct(res.data))
  }, [])
  const cancelBill = () => {
    axios.delete(BILLS_API + bill._id)
    setBills(bills.filter(bill1 => {
      return bill1._id != bill._id
    }))
    refund()
  }
  const refund = () => {
    axios.put(API + 'users/charge/' + user._id, {
      moneyToIncrease: bill.total
    })
    setUser({
      ...user,
      budget: user.budget + bill.total
    })
  }
 
  return (
    <div className='bill-card-body'>
      <img src={product?.images[0]} />
      <div className='product-info'>
        <h2>{product?.title}</h2>
        <span>Category: {product?.category.name}</span>
        <span>x{bill.amount}</span>
        <span>Total: {bill.total}$</span>
      </div>
      {option != 'cart' ? (
        <>

          <span className='delivering-status'>Delivering</span>
          <button className='cancel-btn'
            onClick={() => cancelBill()}
          >Cancel the bill</button>
        </>
      ) : (<div style={{
        position:'absolute',
        right:'1em',
        bottom:'1em',
        display:'flex',
        gap:'.5em'

      }}>


        <button className='purchase-btn'
          onClick={() => purchase(bill, product)}
        >Purchase</button>
        <button className='remove-btn'
          onClick={() => deleteFromCart(bill._id)}
        >Remove from cart</button>
      </div>)}
    </div>
  )
}

export default BillCard