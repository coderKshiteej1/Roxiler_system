import React, { useEffect, useState } from 'react'
import  './navbar.css'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()
  
  return (
    <div className='navbar-div glassify'>
        <Link className={location.pathname==="/"?"underline":""} to="/">Home</Link>
        <Link className={location.pathname==="/statistic"?"underline":""} to="/statistic">statistic</Link>
    </div>
  )
}

export default NavBar