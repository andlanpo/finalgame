import React, { useState } from 'react'
import {GamesDropDown, ProfileDropdown} from "./MenuItems"
import { Link} from "react-router-dom"
import "./Dropdown.css"
import { signOut } from 'firebase/auth'

export function GamesDropdown() {
     const [dropdown, setDropdown] = useState(false);
  return (
    <>
     <ul className = {dropdown ? "games-menu clicked" : "games-menu"} onClick= {() => setDropdown(!dropdown)}>
                    {GamesDropDown.map(item => {
                        return(
                            <li key = {item.id} className ={item.cName}
                            onClick= {() => setDropdown(!dropdown)}>
                            <Link to={item.url}>{item.title}</Link>   
                        </li>
                        )
                    })} 
                </ul> 
    
    </>
  )
}

export function ProfDropdownFunc() {
    const [dropdown, setDropdown] = useState(false);
 return (
   <>
    <ul className = {dropdown ? "prof-menu clicked" : "prof-menu"} onClick= {() => setDropdown(!dropdown)}>
                   {ProfileDropdown.map(item => {
                       if(item.title === "Log off"){
                        return(
                            <li key = {item.id} className ={item.cName}
                            onClick= {() => setDropdown(!dropdown)}>
                            <Link to={item.url} onClick = {signOut}>{item.title}</Link>   
                        </li>
                        )
                       }
                       else{
                        return(
                            <li key = {item.id} className ={item.cName}
                            onClick= {() => setDropdown(!dropdown)}>
                            <Link to={item.url}>{item.title}</Link>   
                        </li>
                        )
                       }
                       
                   })} 
               </ul> 
   
   </>
 )
}