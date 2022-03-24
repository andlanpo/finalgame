import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li> <Link to='/signup'>Sign Up</Link> </li>
      </ul>
    </div>
  )
}

export default SignedOutLinks