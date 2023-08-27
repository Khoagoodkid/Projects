const express = require('express')
const app = express()
const cors = require('cors')
const {Server} = require('socket.io') 
app.use(cors())

const http = require('http')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:'http://127.0.0.1:5174',
        methods:["GET","POST"]
    }
})
server.listen(8080, () => {
    console.log("server is running")
})
let users = []
const addUser = (userId,socketId) => {
    !users.some(user => user.userId === userId) && 
    users.push( {
        userId,
        socketId
    })
    console.log(users)
}
const removeUser = (socketId) => {
    
    
    users = users.filter(user => user.socketId !== socketId)
    console.log(users)
}
io.on("connection", socket => {
    socket.on('addUser', userId => {
        addUser(userId,socket.id)
        io.emit('getUsers', users)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
        console.log("user disconnected")
        io.emit('getUsers', users)
    })
})