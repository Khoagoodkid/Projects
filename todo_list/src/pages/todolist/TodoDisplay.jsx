import React, { useEffect, useState, useContext } from 'react'
import "./TodoDisplay.css"
import { url } from '../../StartFirebase'
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox'
import { colorContext } from './Todo';
function TodoDisplay({ authUser }) {
    const {userColor,setUserColor} = useContext(colorContext)
    const [todos, setTodos] = useState([])
    const [job, setJob] = useState('')
    const [todoIDStore, setTodoIDStore] = useState([])
    const [checkAll, setCheckAll] = useState(null)
    const [doneJobStyle, setDoneJobStyle] = useState({})
    const [isDoneAll, setIsDoneAll] = useState(false)
    const loggedInUser = JSON.parse(window.localStorage.getItem('user'))
    useEffect(() => {
        setTodos([])
        setTimeout(() => {

            getAuthUserJob()
        }, 500)
        // setCheckAll('')
        // setDoneJobStyle({})
        setUserColor(loggedInUser.color)
        // console.log(userColor)
    }, [])

    const getAuthUserJob = () => {

        url.get('/todos.json')
            .then(res => {
                const fetchedTodos = []
                const fetchedTodoIDStore = []
                for (const key in res.data) {
                    if (res.data[key]._id == loggedInUser._id && res.data[key].isDone == false) {       
                        fetchedTodos.push({
                            content: res.data[key].content,
                            todoId: key
                        })
                        fetchedTodoIDStore.push(key)

                    }

                }
                // console.log(fetchedTodoIDStore)
                setTodos(fetchedTodos)
                setTodoIDStore(fetchedTodoIDStore)
            })

    }
    const addJob = () => {
        setIsDoneAll(false)
        setCheckAll(null)
        if (job) {

            url.post('/todos.json', {
                content: job,
                _id: loggedInUser._id,
                isDone: false,
            })
        }
        // console.log(job)
        setJob('')
        setTimeout(() => {
            getAuthUserJob()

        }, 100)

    }
    const deleteJob = (todoID) => {
        // console.log(todoID)
        url.delete(`/todos/${todoID}.json`,)
            .then(() => {
                console.log('success!')
            })
            .catch((err) => {
                console.log(err)
            })
        setTimeout(() => {
            getAuthUserJob()

        }, 100)
    }
    const clearAll = () => {
        // console.log(todoIDStore)
        for (const id of todoIDStore) {
            url.delete(`/todos/${id}.json`,)
                .then(() => {
                    console.log('success!')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        setTimeout(() => {
            getAuthUserJob()

        }, 1000)
        // setIsChecked(false)
    }
    const doneJobHandle = (e, job) => {
        if (e) {
            doneJob(job)
        }
    }
    const doneJob = (job) => {
        url.patch(`/todos/${job.todoId}.json`, {
            _id: job._id,
            content: job.content,
            isDone: true
        })
        doneJobStyling(job.todoId)
        setTimeout(() => {
            getAuthUserJob()

        }, 1000)
    }
    const doneJobStyling = (todoId) => {
        console.log(todoId)
        setDoneJobStyle({
            ...doneJobStyle,
            [todoId]: 'doneJobStyle'
        })
        console.log(doneJobStyle)
    }
    const doneAll = () => {
        setIsDoneAll(true)
        setCheckAll(true)
        for (const id of todoIDStore) {

            url.patch(`/todos/${id}.json`, {
                _id: job._id,
                content: job.content,
                isDone: true
            })


        }
        setTimeout(() => {
            getAuthUserJob()

        }, 1000)
    }
    return (
        <div className='todoDisplayContainer'>

            <div style={{ height: '95%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input className='todoInput'
                    placeholder='WHAT ARE YOU GOING TO DO'
                    onChange={(e) => {
                        setJob(e.target.value)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addJob()
                        }
                    }}
                    value={job}
                    required
                />
                <div style={{ width: '90%' }}>

                    {todos?.map((job) => {
                        return (
                            <div className='jobCard' key={job.todoId} style={{backgroundColor:userColor}} >
                                <div >

                                    <Checkbox
                                        onChange={(e) => doneJobHandle(e.target.checked, job)}

                                    />
                                    <span className={isDoneAll ? 'doneJobStyle' : doneJobStyle[job.todoId]} >{job.content}</span>
                                </div>


                                <ClearIcon className='clearIcon' onClick={() => {
                                    deleteJob(job.todoId)
                                }} />
                            </div>
                        )

                    })}
                    <div className='features'>
                        <button className='doneAllBtn' onClick={() => doneAll()}>Complete All</button>
                        <button className='clearAllBtn' onClick={() => clearAll()}>Clear All</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TodoDisplay