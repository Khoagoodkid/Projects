import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
function Home() {
  const [users, setUsers] = useState([])
  const [user,setUser] = useState({email:'', username:'',password:''})
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/api/users')
    .then(res => {  
        setUsers(res.data.users)
    })
  },[])
    const submitHandler = (e) => {
      e.preventDefault()
      console.log(user)
      axios.post('http://127.0.0.1:8000/api/signup', user)
    }
    const deleteUser = (userId) => {
        axios.delete('http://127.0.0.1:8000/api/delete/' + userId)
    }
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
          <span>Email</span>
          <input onChange={(e)=> setUser({...user,email:e.target.value})}></input>
          <span>Username</span>
          <input onChange={(e)=> setUser({...user,username:e.target.value})}></input>
          <span>Password</span>
          <input onChange={(e)=> setUser({...user,password:e.target.value})}></input>
        <button type='submit'>Submit</button>

      </form>
      {users.map((user)=> {
        return (
          <div>
              <h2>{user.username}</h2>
              <span>{user.email}</span>
              <Link to = {`/edit/${user.id}`} >Edit</Link>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
        )
      })}
    </div>
  )
}

export default Home
