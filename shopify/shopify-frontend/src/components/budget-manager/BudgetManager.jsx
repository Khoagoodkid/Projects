import React from 'react'
import "./BudgetManager.css"
import ReactModal from 'react-modal'

function BudgetManager({ budget, bill, purchase, isOpenModal, setIsOpenModal, product }) {
    const customStyles = {
       
        overlay: {zIndex: 10}
      };
    return (
        <ReactModal isOpen={isOpenModal} className='budget-manager-body'
            style={customStyles}
        >
            <div className='budget-manager-wrapper'>
                <div className='budget-manager-container'>
                    <h2>Do you want to buy {product?.title}</h2>
                    <div className='bill-info'>
                        <img src={product?.images[0]} style={{ width: '10em' }} />
                        <div >
                            <span>{product?.title}</span>
                            <span>Your budget: {budget}.00$$</span>
                            <span>Total: {bill.total}.00$$</span>
                            <hr style={{width:'90%'}}/>
                            <span
                                style={{
                                    color:budget >= bill.total ? '#2fed62':'#ed1552'
                                }}
                            >You have left: {budget-bill.total}.00$$</span>
                            {budget<bill.total && <span style={{color:'#ed1552'}}>You don't have enough money</span>}
                        </div>
                    </div>
                    <div className='btn'>
                        <button onClick={() => setIsOpenModal(false)}>Back</button>
                        <button onClick={() => purchase(bill)}
                            disabled={budget < bill.total}
                        >Purchase</button>
                    </div>
                </div>
            </div>

        </ReactModal>
    )
}

export default BudgetManager