import {React, useEffect, useState} from 'react'
import { auth, LoggedIn, logoff } from '../firebase'
import {logInval} from './Login'

function Home() {
  return (
      <button className='button' onClick={logoff}>
        </button>

      

      

  )
}

export default Home