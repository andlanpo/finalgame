import React, {Component } from 'react';
import {MenuItems } from "./MenuItems";
import './Navbar.css';
import { BiBrain } from 'react-icons/bi';
import {MdClose} from "react-icons/md";
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import {Button} from "../Button"



class Navbar extends Component {
    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <a href = "/" style={{ textDecoration: 'none' }}>
                <h1 className = "navbar-logo">Knome <BiBrain /></h1>
                </a>
                <a href = "/signup" style={{ textDecoration: 'none' }}>
                <h1 className = "profile-icon"><CgProfile /></h1>
                </a>
                <div className="menu-icon" onClick = {this.handleClick}>
                    {this.state.clicked ? <MdClose /> : <GiHamburgerMenu />}
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index)=> {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>

            </nav>
        )
    }
}

export default Navbar