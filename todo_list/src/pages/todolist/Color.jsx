import React,{useState,useContext} from 'react'
import { SketchPicker } from 'react-color'
import { colorContext } from './Todo'
import HomeIcon from '@mui/icons-material/Home';
import "./Color.css"
import { UserContext } from '../../components/UserContext';
import { url } from '../../StartFirebase';
function Color({setColorOpen}) {
    const {user,setUser} = useContext(UserContext)
    const {userColor,setUserColor} = useContext(colorContext)
    const [color,setColor] = useState('')
    const changeHandle = ( color)=> {
        setColor(color.hex)
        setUserColor(color.hex)
        changeUserData()
    }
    const changeUserData = () => {
        url.patch(`/users/${user._id}.json`,{
            email:user.email,
            name:user.name,
            
            password:user.password,
            color:userColor
        }) 
        .then((res)=> {
            // console.log('success!')
        })
        .catch(err => console.log(err))
        window.localStorage.setItem('user',JSON.stringify({
            email:user.email,
            name:user.name,
            password:user.password,
            color:userColor,
            _id:user._id
        }))
        setUser({
            ...user,
            color:userColor
        })
    }
  return (
    <div className='colorContainer'>
        <SketchPicker
            color={color}
            onChangeComplete={changeHandle}
        />
      
       <HomeIcon style={{marginRight:'95%',cursor:'pointer'}} fontSize='large' onClick={()=> setColorOpen(false)}/>
    </div>
  )
}

export default Color