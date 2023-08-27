import React,{useState} from 'react'
import "./Verification.css"
// import { reactCodeInput } from 'CodeInputField.scss'
import ReactCodeInput from 'react-code-input'
import axios from 'axios';

function Verification({verifyCode,postAccount}) {
    const [pinCode,setPinCode] = useState('')
    const handlePinChange = pinCode => {
        setPinCode(pinCode);
        if(pinCode == verifyCode){
            postAccount()
        }
      };
  return (
    <div className='veriBody'>
        <h1>Verification</h1>
        <p>We have sent the verifing code to your email, please use it to complete creating account </p>

        <ReactCodeInput  id="pinCode"
        type="text"
        // isValid={isPinCodeValid}
        fields={6}
        onChange={handlePinChange}
        value={pinCode} />
    </div>
  )
}

export default Verification