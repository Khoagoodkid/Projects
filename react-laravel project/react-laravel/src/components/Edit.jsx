import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Edit() {
    const {id} = useParams();
    const [update,setUpdate] = useState(null);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/' + id)
        .then(res => {
            console.log(res)
        })
    },[])
    const submitHandler = async (e) => {
        e.preventDefault()

    const res = await axios.put(`http://127.0.0.1:8000/api/update/${id}`, update)
        if(res.data.status == 200){
            console.log("success")
        }
        
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
          <span>Email</span>
          <input onChange={(e)=> setUpdate({...update,email:e.target.value})}></input>
          <span>Username</span>
          <input onChange={(e)=> setUpdate({...update,username:e.target.value})}></input>
          {/* <span>Password</span>
          <input onChange={(e)=> setUpdate({...update,password:e.target.value})}></input> */}
        <button type='submit'>Submit</button>

      </form>
        </div>
  )
}

export default Edit