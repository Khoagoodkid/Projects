import React, { useContext, useEffect, useState } from 'react'
import "./Delivering.css"
import axios from 'axios'
import { BILLS_API } from '../../routes'
import BillCard from '../bill-card/BillCard'
import { AuthContext } from '../../App'

function Delivering() {
    const {user,setUser} = useContext(AuthContext)

    const [bills, setBills] = useState(null)
    useEffect(() => {
        axios.get(BILLS_API + user._id)
            .then(res =>{
                console.log(res)
                setBills(res.data)
            })
    }, [])
    return (
        <>
            {bills?.map((bill) => {
                return (
                    <div>
                        <BillCard bill={bill}
                            bills={bills}
                            setBills={setBills}
                        />


                    </div>
                )
            })}

        </>

    )
}

export default Delivering