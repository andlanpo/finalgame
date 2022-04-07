import React, {Component, useState, useEffect, useRef } from 'react';
import {MenuItems } from "./MenuItems";
import './Navbar.css';
import { BiBrain } from 'react-icons/bi';
import {MdClose, MdArrowDropDown} from "react-icons/md";
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom';
import {GamesDropdown, ProfDropdownFunc} from './Dropdown';
import { auth } from '../../firebase';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import M from 'materialize-css';




const Navbar = () => {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
  
    return (

          <nav className = "nav-wrapper purple darken-3" >
    <div className= 'container' style ={{textDecoration: 'none'}}>
      <a href="/"  style ={{textDecoration: 'none', background: '#6a1b9a'}} className="brand-logo">Knome <BiBrain style = {{background: '#6a1b9a'}}/></a>
      <a href="#"  style ={{textDecoration: 'none', background: '#6a1b9a'}} data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons" style = {{background: '#6a1b9a'}}><GiHamburgerMenu style = {{background: '#6a1b9a'}}/></i></a>
      <ul className="right hide-on-med-and-down">
        <li><a href="/" style ={{textDecoration: 'none', background: '#6a1b9a'}}>Home</a></li>
        <li><a href="/wikiRacer" style ={{textDecoration: 'none', background: '#6a1b9a'}}>Wiki Racer</a></li>
        <li><a href="/aslRacer" style ={{textDecoration: 'none', background: '#6a1b9a'}}>ASL Type</a></li>
        <li><a href="/signup" style ={{textDecoration: 'none', background: '#6a1b9a'}}><CgProfile style = {{background: '#6a1b9a'}}/></a></li>
      </ul>
    </div>

  <ul className="sidenav"  style = {{background: '#6a1b9a'}}id="mobile-demo">
    <li><a href="/"style ={{textDecoration: 'none', background: '#6a1b9a', color: 'white'}}>Home</a></li>
        <li><a href="/wikiRacer"style ={{textDecoration: 'none', background: '#6a1b9a', color: 'white'}}>Wiki Racer</a></li>
        <li><a href="/aslRacer"style ={{textDecoration: 'none', background: '#6a1b9a', color: 'white'}}>ASL Type</a></li>
        <li><a href="/signup"style ={{textDecoration: 'none', background: '#6a1b9a', color: 'white'}}>Sign Up</a></li>
  </ul>
  </nav>
      
      
    )
  }

export default Navbar