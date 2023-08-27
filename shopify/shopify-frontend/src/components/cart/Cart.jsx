import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import axios from 'axios'
import { CART_API } from '../../routes'
import BillCard from '../bill-card/BillCard'
import { ToastContainer, toast } from 'react-toastify'
import { SINGLE_PRODUCT_API, BILLS_API } from '../../routes'
function Cart() {
    const { user, setUser } = useContext(AuthContext)
    const [carts, setCarts] = useState(null)
    useEffect(() => {
        axios.get(CART_API + user._id)
            .then(res => setCarts(res.data))
    }, [])
    const purchase = (bill, product) => {
        let date = new Date();
        let daysAfterOrdered = 5
        axios.post(BILLS_API, {
            ...bill,
            created_at: new Date().toLocaleString(),
            delivered_at: new Date(date.setDate(date.getDate() + daysAfterOrdered)).toLocaleString(),

        })


        axios.patch(SINGLE_PRODUCT_API + 'selling-times/' + product._id, {
            increment: product.sellingTimes + 1
        })
        toast.success("You have bought the" + " " + product?.title + 'successfully !')
        deleteFromCart(bill._id)
    }
    const deleteFromCart = (id) => {
        axios.delete(CART_API + id)
        setCarts(carts.filter(cart => {
            return cart._id != id
        }))
    }
    return (
        <>
            <ToastContainer />
            {carts?.map((cart) => {
                return (
                    <div>
                        <BillCard
                            bill={cart}
                            option='cart'
                            purchase={purchase}
                            deleteFromCart={deleteFromCart}
                        />

                    </div>

                )
            })}
        </>
    )
}

export default Cart