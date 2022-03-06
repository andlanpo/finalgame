import React from 'react';
import Navbar from "./components/navbar/Navbar";
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ASL from './Pages/aslType';

import Home from './Pages/Home';
import Wikipedia from './Pages/Wikipedia';
import SignIn from './Pages/SignIn';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path= "/" element = {<Home />} />
                <Route path= "/aslRacer" element = {<ASL />} />
                <Route path= "/wikiRacer" element = {<Wikipedia />} />


            </Routes>
             
        </Router>
        
    );
}

export default App;