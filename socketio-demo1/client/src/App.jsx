import { useState,useEffect,react } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {io} from "socket.io-client"
const socket = io.connect('http://localhost:3001')
function App() {
  const [data, setData] = useState(null)
  const [msg,setMsg] = useState('')
  const sendMsg = () => {
    socket.emit("sendMsg", {msg})
  }
  useEffect(() => {
    socket.on("receiveMsg", data => {
      console.log(data)
      setData(data.msg)
    })
  },[socket])
  return (
    <div className="App">
        <div style={{display:'flex',flexDirection:'column'}}>
          <span>{data}</span>
            
        </div>
        <input onChange={(e) => setMsg(e.target.value)}/>
        <button onClick={() => sendMsg()}>Send Message </button>
      
    </div>
  )
}

export default App
