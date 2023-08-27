import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { io } from "socket.io"
const socket = io.connect('http://localhost:8080')
function App() {
  const [count, setCount] = useState(0)
  const sendMsg = () => {
    
  }
  return (
    <div className="App">
        <div >

        </div>
        <button>Send Message </button>
    </div>
  )
}

export default App
