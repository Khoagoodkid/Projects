import React from 'react'
import "./Instruction.css"
const instructions = [
    {
        title: 'Spoilt for choice:',
        question: 'Where should I order?',
        description: `Shopify has been awarded about the high quality of products that meet or exceed all requirements
         for the security of your personal data - and also offer truly great service when problems arise.`,
        img: 'https://www.trustedshops.eu/wp-content/uploads/2020/11/where-should-i-order-1.png'
    },
    {
        title: 'Share experiences:',
        question: 'What do others say?',
        description: `What experiences have other buyers had with service, delivery and products? Use the reviews to find the shops and products that perfectly fit your needs.`,
        img: 'https://www.trustedshops.eu/wp-content/uploads/2020/11/what-do-others-say-1.png'
    },
    {
        title: 'Just to be on the safe side:',
        question: 'What happens if your package does not arrive?',
        description: `When shopping online, you don’t want to worry about whether your parcel will actually arrive or whether you will get your money back in case of a return.
         Enjoy the security offered by the Shopify Buyer Protection, and secure your purchases up to ₤ 2,500 per purchase – 
         no matter which payment method you opt for in the online shop.`,
        img: 'https://www.trustedshops.eu/wp-content/uploads/2022/05/2-modal-jetzt-absichern.svg'
    },

]

function Instruction() {
    return (
        <div className='instruct-body'>
            <h1>Instructions for you</h1>
            <hr style={{width:'20%', marginTop:'-1em',backgroundColor:'#fdc807',border:'none',height:'.1em'}}/>
            <div className='instruct-container'>
                {instructions.map((i, index) => {
                    return (
                        <>
                        <div className={(index + 1) % 2 == 0 ? 'instruct-card' : 'instruct-card reverse'}>
                            <div className='content'>
                                <span>{i.title}</span>
                                <h2>{i.question}</h2>
                                <p>{i.description}</p>
                            </div>
                            <div>
                                <img src={i.img}/>
                             </div>   
                        </div>
                        <div>
                            <img src='https://www.trustedshops.eu/wp-content/uploads/2020/11/arrow-1_yellow.svg'
                                style={{transform:(index + 1) % 2 == 0 ? " rotateX(180deg)" : "",
                                width:'50em', height:'15em'
                            }}
                            />
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Instruction