import React, { useContext,useState } from 'react'
import "./Profile.css"
import { AuthContext } from '../../App'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { API } from '../../routes';
import { toast,ToastContainer } from 'react-toastify';
const info = [
    'Username', 'Email', 'Password', 'Address'
]
function Profile() {
    const { user, setUser } = useContext(AuthContext)
    const [dummyUser, setDummyUser] = useState(user)
    const [edit, setEdit] = useState(false)
    const update = () => {
        axios.put(API + 'users/profile/' + user._id, dummyUser)
        setUser(dummyUser)
        setEdit(false)
        toast.success("Your profile has been updated succesfully!")
    }
    return (
        <div className='profile-body'>
            <ToastContainer/>
            <div className='profile-wrapper'>
                <div className="profile-img">

                    <img src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000' />
                    <div className="layer"></div>

                </div>
                <div className="profile-info">
                    <EditIcon sx={{
                        position: 'absolute',
                        top: '1em',
                        right: '1em',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                        onClick={() => setEdit(true)}
                    />
                    {edit ? (
                        <>

                            {info.map((i) => {
                                return (
                                    <div className='info-card'>
                                        <h3>{i}:</h3>
                                        <input value={dummyUser[i.toLowerCase()]}
                                            onChange={(e) => setDummyUser({
                                                ...dummyUser,
                                                [i.toLowerCase()]: e.target.value
                                            })}
                                        />
                                    </div>
                                )
                            })}
                            <button onClick={() => setEdit(false)}>Cancel</button>
                            <button onClick={() => update()}>Update Profile</button>
                        </>
                    ) : (
                        <>

                            {info.map((i) => {
                                return (
                                    <div className='info-card'>
                                        <h3>{i}:</h3>
                                        <span>{user[i.toLowerCase()]}</span>
                                    </div>
                                )
                            })}
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Profile