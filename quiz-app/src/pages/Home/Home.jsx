import React, { useState, useEffect, createContext } from 'react'
import "./Home.css"
import { io } from 'socket.io-client'
import { questions } from '../../../db'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Room from '../Room/Room'
import bg from '../../assets/bg.jpg'
import TextField from '@mui/material/TextField'
import { dbUrl,usersUrl } from '../../tools'
import Questions from '../../components/Questions/Questions'
export const GamePlayContext = createContext()
const socket = io("http://localhost:8080")

// const url = 'http://localhost:3000/'

function Home() {
    const [count, setCount] = useState(0)
    const [roomId, setRoomId] = useState(null)
    const [question, setQuestion] = useState(null)
    const [me, setMe] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const [members, setMembers] = useState([])
    const [isCreator, setIsCreator] = useState(false)
    const [isStart, setIsStart] = useState(false)
    const [user, setUser] = useState({
        name: null,
        points: 0

    })
    const [curQuestion,setCurQuestion] = useState(0)
    const [unAnswered, setUnAnswered] = useState(null)
    useEffect(() => {
        socket.on("getQuestion", question => {
            setQuestion(question)
        })
        socket.on("getMe", socketId => {
            console.log(socketId)
            setMe(socketId)

        })
        socket.on("newMember", members => {
            console.log(members)
            setMembers(members)
        })
        socket.on("memberLeft", members => {
            setMembers(members)
        })
        socket.on("openQuiz", isStart => {
            setIsStart(isStart)
            console.log(isStart)
            sendQuestion(questions[0])
        })
        socket.on("getUnAnswered", unAnswered => {
            console.log(unAnswered)
            setUnAnswered(unAnswered)
        })
    }, [])

    const createRoom = () => {
        if (roomId) {

            socket.emit("createRoom", roomId)
        }

        setIsCreator(true)



    }
    const joinRoom = () => {
        socket.emit("joinRoom", (roomId))
        setIsLogin(true)
        login()
    }
    const sendQuestion = (question) => {
        // if (roomId) {
            console.log(question)
            socket.emit("sendQuestion", { ...question, roomId })
        // }
    }
    const login = () => {
        axios.post(dbUrl + 'users', {
            ...user,
            socketId: me,
            roomId
        })
            .then(res => {
                setUser({
                    ...user,
                    socketId: me,
                    roomId
                })
            })

    }
    const startQuiz = () => {

        // console.log("hi")
        socket.emit("startQuiz", {
            isStart: true,
            roomId
        })
    

    }
    const answerQuestion = (isCorrect) => {

        socket.emit('answeredSignal', {
            socketId: me,
            roomId
        })
        if(isCorrect ) {
            let curPoint = user.points + 10
            setUser({
                ...user,
                points: curPoint
            })
            console.log(curPoint)
            axios.patch(usersUrl + me, {curPoint})
        }
        // if(isCorrect){
        //     axios.patch(usersUrl + me, )
        // }
    } 
    return (
        <div className="homeBody" style={{ backgroundImage: `url(${bg})` }}>
            {isCreator &&


                <Questions questions={questions}
                    sendQuestion={sendQuestion}
                    setIsStart={setIsStart}
                    startQuiz={startQuiz}
                    curQuestion={curQuestion}
                    setCurQuestion = {setCurQuestion}
                    isStart={isStart}
                />
            }

            {isLogin && (<GamePlayContext.Provider value={{ unAnswered, answerQuestion, me }}>
                <Room question={question} user={{ ...user, socketId: me }} me={me} members={members} isStart={isStart} />
            </GamePlayContext.Provider>
            )

            }
            {
                !isCreator && !isLogin && <div className='home'>

                    <div className='info name'>
                        <span>Name</span>
                        <div>
                            <TextField id="standard-basic" label="Name" variant="standard"
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                            />
                        </div>


                    </div>
                    <div className='info createRoom'>

                        <span>Create Room</span>
                        <div>

                            <TextField id="standard-basic" label="Room ID" variant="standard"
                                onChange={(e) => setRoomId(e.target.value)}
                                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                            />
                            {/* <Link to={user.name && roomId ? (`/rooms/${roomId}`) : ('/')} > */}
                            <button onClick={() => createRoom()}>Create</button>
                        </div>
                        {/* </Link> */}
                    </div>
                    <div className='info joinRoom'>

                        <span>Join Room</span>
                        <div>

                            <TextField id="standard-basic" label="Room ID" variant="standard"
                                onChange={(e) => setRoomId(e.target.value)}
                                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                            />
                            {/* <Link to={user.name && roomId ? (`/rooms/${roomId}`) : ('/')} > */}
                            <button onClick={() => joinRoom()}>Join</button>
                        </div>
                    </div >
                    {/* </Link> */}

                    {/* <div>
                        {question?.questionText}
                    </div> */}
                </div>
            }

        </div >
    )
}

export default Home