import React, { useContext, useState } from 'react'
import "./ChargeMoney.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import { API } from '../../routes';
import { AuthContext } from '../../App';
import { toast,ToastContainer } from 'react-toastify';

function ChargeMoney() {
    const { user, setUser } = useContext(AuthContext)
    const [cardName, setCardName] = useState(null)
    const [money, setMoney] = useState(null)
    const [cardId,setCardId] = useState(null)
    const [isProcessing,setIsProcessing] = useState(false)
    const chargeHandler = () => {
        if (money) {

            axios.put(API + 'users/charge/' + user._id, {
                moneyToIncrease: money
            })
            setIsProcessing(true)
            setTimeout(() => {
                setIsProcessing(false)
                setUser({
                    ...user,
                    budget:user.budget + parseInt(money)
                })
                setCardName('')
                setMoney('')
                setCardId('')
                toast.success("You have charged" + " " + parseInt(money) + "$ " + "sucessfully !"  )
            },[3000])
           
        }
    }
    return (
        <div className='charge-money-body'>
            <ToastContainer/>
            <div className='charge-container'>
                <h2 style={{   fontFamily: 'Pacifico, cursive'}}>Charge your money</h2>
                <FormControl sx={{
                    color: 'white',
                    width: '80%'
                }} >
                    <InputLabel id="demo-simple-select-label">Type of Card</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cardName}
                        label="Card Type"
                        onChange={(e) => setCardName(e.target.value)}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Credit Card Number" variant="outlined"
                    value={cardId}
                    sx={{ width: '80%' }}
                    onChange={(e) => setCardId(e.target.value)}
                />
                <TextField id="outlined-basic" label="Amount" variant="outlined"
                    sx={{ width: '80%' }}
                    value={money}
                    onChange={(e) => {
                        setMoney(e.target.value)
                    }}
                />
                <button onClick={() => {
                    chargeHandler()
                }}
                    disabled={isProcessing}
                >{isProcessing ? 'Processing...':'Charge Now'}</button>
            </div>
        </div>
    )
}

export default ChargeMoney