import React, { useEffect,useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import bellIcon from '../../assets/bell_icon.svg'
import profileImg from '../../assets/profile_img.png'
import carrotIcon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {

    const navRef = useRef();

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY>=80){
                navRef.current.classList.add('nav-dark');
            }else{
                navRef.current.classList.remove('nav-dark')
            }
        })
    },[])
  return (
    <div className='navbar' ref={navRef}>
        <div className="navbar-left">
            <img src={logo} alt="logo image" />
            <ul>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse by Languages</li>
            </ul>
        </div>
        <div className="navbar-right">
            <img src={searchIcon} alt="search icon image" className='icons' />
            <p>Children</p>
            <img src={bellIcon} alt="bell icon image" className='icons' />
            <div className="navbar-profile">
                <img src={profileImg} alt="profile image" className='profile' />
                <img src={carrotIcon} alt="search icon image"  />
                <div className="dropdown">
                    <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
