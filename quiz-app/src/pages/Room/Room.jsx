import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { questions } from '../../../db'
const socket = io("http://localhost:8080")
import axios from 'axios'
const url = 'http://localhost:3000/rooms/'
import "./Room.css"
import Avatar from '@mui/material/Avatar'
import dummy from '../../assets/dummy.jpg'
import MemberCard from '../../components/MemberCard/MemberCard'
import GamePlay from '../../components/GamePlay/GamePlay'
function Room({ question, user, members, me,isStart }) {
    const roomId = useParams()
    const [room, setRoom] = useState(null)
    // const [members, setMembers] = useState([])
    // const [question, setQuestion] = useState(null)
    useEffect(() => {
        // axios.get(url + roomId.id)
        //     .then(res => {
        //         // console.log(res.data)
        //         setRoom(res.data)
        //         setMembers(res.data.members)
        //     })
        //     .catch(err => console.log(err))
        // socket.on("newMember", socketId => {
        //     console.log(socketId)
        //     members.push(socketId)
        //     console.log(members)
        // })
        // socket.on("getQuestion", question => {
        //     setQuestion(question)
        // })
    }, [])
    const sendQuestion = (question) => {
        if (roomId) {
            socket.emit("sendQuestion", { ...question, roomId })
        }
    }
    return (
        <>
            {!isStart ? (<div className='lobby'>
                <div className='userInfo'>
                    <div className='me'>
                        <Avatar src={dummy} sx={{ width: "8em", height: '8em' }} />
                        <h1>{user.name}</h1>

                    </div>
                </div>
                <div className='membersContainer'>
                    <div>
                        <h2>Participants: {members.length}</h2>
                    </div>
                    <div className='membersDisplay'>
                        {members.map((socketId) => {
                            return (
                                <div style={{ width: 'auto' }} key={socketId}>
                                    <MemberCard socketId={socketId} dummy={dummy} />

                                </div>
                            )
                        })}
                    </div>
                </div>
                <span style={{ color: 'white' }}>{question?.questionText}</span>
                <div>
                    {/* {questions.map((question, index) => {
            return (
                <div onClick={() => {
                    sendQuestion(question)
                }}>
                    <span>{index + 1}</span>
                    {question?.questionText}
                </div>
            )
        })} */}
                </div>
            </div>) : (
                <GamePlay question={question}/>
            )}
        </>
    )
}

export default Room