import {React, useEffect, useState} from 'react'
import { auth, LoggedIn, logoff } from '../firebase'
import {logInval} from './Login'

function Home() {
  const [userIn, setUser] = useState(false)

    useEffect(() => {
        async function checkUser(){
            const res = await LoggedIn();
            console.log(res !== null)
            setUser(res !== null)
        }
        checkUser();
      }, []);
  return (
      <button className='button' onClick={logoff}>
        </button>

      

      

  )
}

export default Home