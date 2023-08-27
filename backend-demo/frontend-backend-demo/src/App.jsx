import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import { Button } from 'bootstrap'
function App() {
  const [user, setUser] = useState(null)
  const [searchUser, setSearchUser] = useState(null)
  const [userList, setUserList] = useState(null)
  const url = 'http://localhost:3000/users/'
  const submitHandler = (e) => {
    e.preventDefault()
    axios.post(url, user)
  }
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    axios.get(url)
      .then(res => {
        console.log(res.data)
        setUserList(res.data)
      })

  }
  const getUserData = (id) => {

    axios.get(url + id)
      .then(res => console.log(res.data))
    // axios.get('http://localhost:3000/profile')
  }
  const deleteUser = (id) => {
    axios.delete(url + id)
      .then(res => console.log(res))
  }
  const updateUser = (id) => {
    axios.patch(url + id, {
      name: user.name,
      age: user.age
    })
  }
  
  return (
    <div className="App">
      <form class="row g-3" method='GET' action='http://localhost:3000/profile'  >
        <div class="col-auto">
          <label for="staticEmail2" class="visually-hidden">Name</label>
          <input type="text" readonly class="form-control-plaintext" id="staticEmail2" name='name'/>
        </div>
        <div class="col-auto">
          <label for="inputPassword2" class="visually-hidden">Age</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="Password" name = 'age'/>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
        </div>
      </form>
      <form onSubmit={submitHandler}>
        <span>Name</span>
        <input onChange={(e) => setUser({
          ...user,
          name: e.target.value
        })} />
        <span>Age</span>
        <input onChange={(e) => setUser({
          ...user,
          age: e.target.value
        })} />
        <button style={{ backgroundColor: 'red' }}
          type='submit'
        >Submit</button>
      </form>
      <div>
        <button onClick={() => getData()}>Get Data</button>
        {userList?.map(user => {
          return (
            <div>
              <h2>{user.name}</h2>
              <span>Age : {user.age}</span>
              <button onClick={() => getUserData(user._id)}>Get user</button>
              <button onClick={() => deleteUser(user._id)}>Delete User</button>
              <button onClick={() => updateUser(user._id)}>Update user</button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
