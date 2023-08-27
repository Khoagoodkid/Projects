import React from 'react'
import "./NavigationBar.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import IceSkatingOutlinedIcon from '@mui/icons-material/IceSkatingOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from 'react-router-dom';
const navs = [
    {
        name:'Home',
        icon:<HomeOutlinedIcon sx={{fontSize:'2.3em'}}/>,
        to:"../"
    },
    {
        name:'Clothes',
        icon:<CheckroomOutlinedIcon sx={{fontSize:'2.3em'}}/>,
        to:"Clothes"
    },
    {
        name:'Furniture',
        icon:<KingBedOutlinedIcon sx={{fontSize:'2.3em'}}/>,
        to:"Furniture"
    },
    {
        name:'Shoes',
        icon:<IceSkatingOutlinedIcon sx={{fontSize:'2.3em'}}/>,
        to:"Shoes"
    },
    {
        name:'Electronics',
        icon:<ElectricalServicesOutlinedIcon sx={{fontSize:'2.3em'}}/>,
        to:"Electronics"
    },
    
]
function NavigationBar() {
    return (
        <div className='nav-body'>
            <div className='nav-top'>

                <h1 >Shopify</h1>
                <div className='nav-container'>
                    {navs.map(nav => {
                        return (
                            <Link className='nav-card' to={`/products/${nav.to}`}>
                                {nav.icon}
                                <h3 >{nav.name}</h3>
                                </Link>
                        )
                    })}
                </div>
            </div>
            <div className='nav-footer'>
                    <MenuOutlinedIcon  sx={{fontSize:'2.3em',cursor:'pointer'}}/>
                    <h3>More</h3>

            </div>
        </div>
    )
}

export default NavigationBar