import React, {Component, useState, useEffect, useRef } from 'react';
import {MenuItems } from "./MenuItems";
//import './Navbar.css';
import { BiBrain } from 'react-icons/bi';
import {MdClose, MdArrowDropDown} from "react-icons/md";
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom';
import {GamesDropdown, ProfDropdownFunc} from './Dropdown';
import { auth } from '../../firebase';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'




const Navbar = () => {
    return (
      <nav className="nav-wrapper purple darken-3">
        <div className="container">
          <Link to='/' className="brand-logo" style={{ textDecoration:"none"}}>Knome <BiBrain /></Link>
          <SignedInLinks />
          {/* <SignedOutLinks /> */}
        </div>
      </nav>
    )
  }

export default Navbar