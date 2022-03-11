import React, {Component, useState, useEffect } from 'react';
import {MenuItems } from "./MenuItems";
import './Navbar.css';
import { BiBrain } from 'react-icons/bi';
import {MdClose, MdArrowDropDown} from "react-icons/md";
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import {Button} from "../Button"
import { Link } from 'react-router-dom';
import {GamesDropdown, ProfDropdownFunc} from './Dropdown';
import { LoggedIn } from '../../firebase';


function Navbar() {
    const [gamesDropdown, setGamesDropDown] = useState(false)
    const [profDropdown, setProfDropDown] = useState(false)
    const [clicked, setClick] = useState(false)
    const [userIn, userval] = useState(false)
    let f = null;
    useEffect(() => {
        async function checkUser(){
            const res = await LoggedIn()
            console.log(res)
            userval(res !== null)
            console.log(res !== null)
        }
        checkUser();
        
      }, [userIn]);
    
    return (
        <>
            <nav className="navbar">
            <a href = "/" style={{ textDecoration: 'none' }}>
                <h1 className = "navbar-logo">Knome <BiBrain /></h1>
                </a>  
                <ul className = "nav-items">
                    {MenuItems.map(item => {
                        if( item.title === "Games"){
                            return(
                                <li key = {item.id} className ={item.cName}onMouseEnter ={() => setGamesDropDown(true)} onMouseLeave = {() => setGamesDropDown(false)}>
                                <Link to={item.url} >{item.title}</Link>   
                                {gamesDropdown && <GamesDropdown />}
                            </li>
                            )
                        }
                        return(
                            <li key = {item.id} className ={item.cName}>
                            <Link to={item.url}>{item.title}</Link>   
                        </li>
                        )
                    })} 
                </ul>
                {userIn ? <ul className = 'prof-items'>
                        <li key = '1' className ='prof-item'onMouseEnter ={() => setProfDropDown(true)} onMouseLeave = {() => setProfDropDown(false)}>
                        <Link to='/signup'><CgProfile/> </Link>   
                        {profDropdown && <ProfDropdownFunc />}
                        </li>
                        </ul> : <h1>Hello</h1> }    
                
                                     
                        
                <ul className="menu-icon" onClick = {() => setClick(!clicked)}>
                {clicked ? <MdClose /> : <GiHamburgerMenu />}
                </ul>
            </nav>
        </>
    )
}

export default Navbar