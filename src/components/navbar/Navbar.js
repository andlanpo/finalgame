import React, {Component, useState } from 'react';
import {MenuItems } from "./MenuItems";
import './Navbar.css';
import { BiBrain } from 'react-icons/bi';
import {MdClose, MdArrowDropDown} from "react-icons/md";
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import {Button} from "../Button"
import { Link } from 'react-router-dom';
import {GamesDropdown, OtherDropdown} from './Dropdown';


function Navbar() {
    const [gamesDropdown, setGamesDropDown] = useState(false)
    const [profDropdown, setProfDropDown] = useState(false)

    
    return (
        <>
            <nav className="navbar">
                <Link to= "/" className='navbar-logo'>
                    Knome    
                    <BiBrain />
                </Link>   
                <u1 className = "nav-items">
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
                </u1> 
                <u1 className = 'prof-item'>
                <li key = '1' className ='profile'onMouseEnter ={() => setProfDropDown(true)} onMouseLeave = {() => setProfDropDown(false)}>
                <Link to='/signup'><CgProfile></CgProfile> </Link>   
                {profDropdown && <OtherDropdown />}
                </li>

                </u1>
            </nav>
        </>
    )
}

export default Navbar