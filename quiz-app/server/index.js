const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const { connectToDb, getDb } = require("./db")
const http = require('http')
const server = http.createServer(app)
var bodyParser = require('body-parser')
let db
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })

        server.listen(8080, () => {
            console.log("Server is running on port 8080")
        })
        db = getDb()
    }
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
})
const rooms = {}
const unAnswered = {}
io.on("connection", socket => {
    socket.emit("getMe", socket.id)
    console.log(socket.id)
    socket.on("createRoom", roomId => {
        if (!rooms[roomId]) {
            rooms[roomId] = []
        }
        // && db.collection("rooms")
        //     .insertOne({
        //         roomId,
        //         creator: socket.id,
        //         members: []
        //     })
    })

    socket.on("joinRoom", (roomId) => {
        // console.log(roomId)
        if (roomId in rooms) {
            socket.join(roomId)
            rooms[roomId].push(socket.id)
            io.to(roomId).emit("newMember", rooms[roomId])

        }
        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected!")
            rooms[roomId]?.splice(rooms[roomId].indexOf(socket.id), 1)
            // rooms[roomId]?.filter(user => {
            //     return user !== socket.id
            // })
            // console.log(rooms[roomId])
            io.to(roomId).emit("memberLeft", rooms[roomId])
            db.collection("users")
                .deleteOne({ socketId: socket.id })
        })


    })
    socket.on("startQuiz", (isStartSignal) => {


        io.to(isStartSignal.roomId).emit("openQuiz", isStartSignal.isStart)
    })
    socket.on("sendQuestion", question => {
        console.log(question)

        unAnswered[question.roomId] = rooms[question.roomId]?.slice(0)
        console.log(rooms[question.roomId])
        io.to(question.roomId).emit('getUnAnswered', unAnswered[question.roomId])
        socket.to(question.roomId).emit("getQuestion", question)
    })
    socket.on("answeredSignal", signal => {
        unAnswered[signal.roomId].splice(unAnswered[signal.roomId].indexOf(signal.socketId), 1)
        io.to(signal.roomId).emit('getUnAnswered', unAnswered[signal.roomId])
    })
})

app.post("/users", (req, res) => {
    // console.log(req.body)
    db.collection("users")
        .insertOne(req.body)
})
app.get('/users/:socketId', (req, res) => {
    // console.log(req.params.socketId)
    db.collection("users")
        .findOne({ socketId: req.params.socketId })
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json("Got error!")
        })
})
app.patch('/users/:socketId', (req, res) => {
    // console.log(req.params.socketId)
    // console.log(req.body)
    db.collection("users")
        .updateOne({ socketId: req.params.socketId }, {
            $set: { points: req.body.curPoint }
        })
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json("Got error!")
        })
})
app.get("/users/:roomId", (req, res) => {
    db.collection("users").find().toArray()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json("Got error!")
        })

})
let users = []
app.get("/users", (req, res) => {
    db.collection("users").find().toArray()
        .then(doc => {
            users = doc.slice()
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json("Got error!")
        })
})