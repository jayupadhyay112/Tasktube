import '../App.css'
import ProfilePopover from './ProfilePopover'

import { Link } from "react-router-dom"
import logo from '../photos/logo.png'
import { useState, useEffect } from 'react'
const Navbar = () => {
    
const [user, setUser] = useState(localStorage.getItem('token') );
const [name, setname] = useState(localStorage.getItem('name') );
    return (
        <>
            <div className="header">
                <div className="logo">
                    <img src={logo} style={{ borderRadius: 100, background: '#fff' }} />
                    <h2 id="name" style={{ background: 'none' }}><Link to ='/' 
                    style={{
                        textDecoration:'none',
                        color:'#fff',
                        background:'none',
                        fontSize:'34px'
                    }}>TaskTube</Link></h2>
                </div>
                <nav className="contain">
                    <Link to="/Home" style={{ background: 'none', color: '#fff', textDecoration: 'none', fontSize: '20px' }}>Home</Link>
                    <Link to="/YTube" style={{ background: 'none', color: '#fff', textDecoration: 'none', fontSize: '20px' }}>You Tube</Link>
                    <Link to="/ChatAI" style={{ background: 'none', color: '#fff', textDecoration: 'none', fontSize: '20px' }}>Chat AI</Link>

                </nav>
                {!user ?
                    <button id="login" ><Link to="Login" style={{ background: 'none', color: 'black', textDecoration: 'none', fontSize: '16px' }}>Login</Link></button>
                    : <ProfilePopover name={name} />

                }

            </div>
        </>
    )
}
export default Navbar
