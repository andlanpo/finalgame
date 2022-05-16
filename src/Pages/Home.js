import {React, useEffect, useState} from 'react'
import { auth, LoggedIn, logoff } from '../firebase'
import {logInval} from './Login'
import picture from './background.png'
import './Home.css'
import { BiBrain } from 'react-icons/bi'

function Home() {
  return (
    <div>
      <h1 style={{textAlign:"center",
                  }}>Welcome to Knome Games</h1>
      <h1 style={{textAlign:"center",
                }}><BiBrain style={{size:5}}></BiBrain></h1>
    </div>
   
      

      

      

  )
}

export default Home