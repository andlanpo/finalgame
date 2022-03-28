import {React, useEffect, useState} from 'react'
import { auth, LoggedIn, logoff } from '../firebase'
import {logInval} from './Login'

function Home() {
  const [website, setWebsite] = useState("https://www.wikipedia.org");
  return (
    <div>
      <button className='button' onClick={logoff}>
        </button>
        <iframe src={website} title="W3Schools Free Online Web Tutorials"></iframe>
    </div>
      

      

      

  )
}

export default Home