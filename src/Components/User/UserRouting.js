import React from 'react';
import MyNavbar from './Navbar'; // Import the MyNavbar component
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Help from './Help/Help';
import NotFound from './NotFound';

function UserRouting() {
    return (
        <div>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default UserRouting;
