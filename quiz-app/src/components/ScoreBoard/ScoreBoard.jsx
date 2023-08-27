import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { usersUrl } from '../../tools'
import { RoomIdContext } from '../GamePlay/GamePlay'
import "./ScoreBoard.css"
function ScoreBoard() {
    const roomId = useContext(RoomIdContext)
    const [users, setUsers] = useState(null)
    useEffect(() => {
        fetchScores()
    }, [])
    const fetchScores = async () => {
        const res = await axios.get(usersUrl)
        console.log(res.data)
        const filter = res.data.filter(user => {
            return user.roomId == roomId
        })
        filter.sort((a,b) => {
            return b.points - a.points
        })
        setUsers(filter)
    }
    return (
        <div className='scoreBoard'>
            {users?.map((user) => {
                return (
                    <div className='userCard'>
                        <div>
                            {user.name}
                        </div>  
                        <div>
                            {user.points}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ScoreBoard