import React, { useContext } from 'react'
import "./TopBar.css"
import { AuthContext } from '../../App'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.css';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
function TopBar() {
    const { user, setUser } = useContext(AuthContext)
    return (
        <div className='topbar-body'>
            {/* <div className='search-container'>
                <div className='search-wrapper'>
                    <SearchIcon sx={{color:'#252525',fontSize:'6em'}} />
                    <input placeholder='Enter products here...'/>

                </div>
            </div> */}
            <div>
                <h1>
                    Welcome back, {user.username}!

                </h1>
            </div>
            <div className='user-container'>
                <div>
                    <h2 style={{ marginTop: '0em' }}>{user.username}</h2>
                    <span style={{ marginTop: '-1em' }}>Budget: {user.budget}$</span>
                    <div>
                        <DropdownButton id="dropdown-basic-button" title="Account Manager">
                            <Link to="/profile">
                                <Dropdown.Item href="#/action-1">
                                    Profile

                                </Dropdown.Item>
                            </Link>
                            <Link to="/charge-money">
                                <Dropdown.Item href="#/action-2">
                                    Charge money

                                </Dropdown.Item>
                            </Link>
                            <Link to="/bills">
                                <Dropdown.Item href="#/action-3">
                                    Bills

                                </Dropdown.Item>
                            </Link>
                        </DropdownButton>
                    </div>
                </div>
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
            </div>
        </div>
    )
}

export default TopBar