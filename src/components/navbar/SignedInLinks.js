import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
const SignedInLinks = () => {
  return (
    <div>
      <ul className="right hide-on-med-and-down">
        <li>  <Link to='/' style={{ textDecoration: 'none' }}>Home </Link> </li>
        <li>  <Link to='/wikiracer' style={{ textDecoration: 'none' }}>Wiki Racer </Link> </li>

        <li>  <Link to='/asltype'style={{ textDecoration: 'none' }}>ASL Type </Link> </li>




        <li><Link to='/login'style={{ textDecoration: 'none' }} ><CgProfile /></Link></li>
      </ul>
    </div>
  )
}

export default SignedInLinks