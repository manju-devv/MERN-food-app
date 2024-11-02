import React from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='lol'>
        <img className='logo' src={assets.logo} alt=''/>
        <p>Admin Panel</p>
      </div>
      <img className='profile' src={assets.prof_img} alt=''/>
    </div>
  )
}

export default Navbar
