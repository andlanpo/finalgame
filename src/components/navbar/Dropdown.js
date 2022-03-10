import React, { useState } from 'react'
import {GamesDropDown} from "./MenuItems"
import { Link} from "react-router-dom"
import "./Dropdown.css"

export function GamesDropdown() {
     const [dropdown, setDropdown] = useState(false);
  return (
    <>
     <u1 className = {dropdown ? "games-menu clicked" : "games-menu"} onClick= {() => setDropdown(!dropdown)}>
                    {GamesDropDown.map(item => {
                        return(
                            <li key = {item.id} className ={item.cName}
                            onClick= {() => setDropdown(!dropdown)}>
                            <Link to={item.url}>{item.title}</Link>   
                        </li>
                        )
                    })} 
                </u1> 
    
    </>
  )
}

export function OtherDropdown() {
    const [dropdown, setDropdown] = useState(false);
 return (
   <>
    <u1 className = {dropdown ? "prof-menu clicked" : "prof-menu"} onClick= {() => setDropdown(!dropdown)}>
                   {GamesDropDown.map(item => {
                       return(
                           <li key = {item.id} className ={item.cName}
                           onClick= {() => setDropdown(!dropdown)}>
                           <Link to={item.url}>{item.title}</Link>   
                       </li>
                       )
                   })} 
               </u1> 
   
   </>
 )
}