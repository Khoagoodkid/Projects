import React, { useState } from 'react'
import "./BillManager.css"
import Delivering from '../../components/delivering/Delivering'
import Cart from '../../components/cart/Cart'

function BillManager() {
    const [choice, setChoice] = useState('shopping-cart')
    return (
        <div className='bill-manager-body'>
            <div className='bill-manager-wrapper'>
                <div className='bill-manager-choices'>
                    <h2 className={choice == 'shopping-cart' ? 'choosen' : ''}
                    onClick={() => setChoice('shopping-cart')}
                    >Shopping Cart</h2>
                    <h2 className={choice == 'delivering' ? 'choosen' : ''}
                           onClick={() => setChoice('delivering')}
                    >Delivering</h2>
                    <h2 className={choice == 'purchased' ? 'choosen' : ''}
                           onClick={() => setChoice('purchased')}
                    >Purchased</h2>
                </div>
                <div className="bill-manager-container">
                    {choice == 'delivering' && <Delivering/> }
                    {choice == 'shopping-cart' && <Cart/>}
                </div>
            </div>
        </div>
    )
}

export default BillManager