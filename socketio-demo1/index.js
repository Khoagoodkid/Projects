const express = require('express')
const app = express()
const cors = require('cors')
const {Server} = require('socket.io') 
app.use(cors())

const http = require('http')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
            origin:'http://127.0.0.1:5173',
            methods:["GET","POST"]
    }
})

io.on("connection", socket => {
    console.log('User connected',socket.id)
    socket.on("sendMsg" , data => {
       
      
        socket.broadcast.emit("receiveMsg", data)
    })
})
server.listen(3001, () => {
    console.log("server is running")
})