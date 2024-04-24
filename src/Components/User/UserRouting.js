// import React from 'react';
// import MyNavbar from './Navbar'; // Import the MyNavbar component
// import { Routes, Route } from 'react-router-dom';
// import Home from './Home/Home';
// import About from './About/About';
// import Contact from './Contact/Contact';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
// import Help from './Help/Help';
// import NotFound from './NotFound';
// import PackageDetails from './Home/Content/PackageDetails';
// import Cart from './Cart/Cart';

// function UserRouting() {
//     return (
//         <div>
//             <MyNavbar />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/help" element={<Help />} />
//                 <Route path="/package-details/:id" element={<PackageDetails />} />

//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </div>
//     );
// }

// export default UserRouting;


// import React from 'react';
// import MyNavbar from './Navbar'; // Import the MyNavbar component
// import { Routes, Route } from 'react-router-dom';
// import Home from './Home/Home';
// import About from './About/About';
// import Contact from './Contact/Contact';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
// import Help from './Help/Help';
// import NotFound from './NotFound';
// import PackageDetails from './Home/Content/PackageDetails';
// import Cart from './Cart/Cart';
// import { CartProvider } from './Cart/CartContext';
// function UserRouting() {
//     return (
//         <div>
//             <CartProvider>
//                 <MyNavbar />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/cart" element={<Cart />} />
//                     <Route path="/help" element={<Help />} />
//                     <Route path="/package-details/:id" element={<PackageDetails />} />

//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </CartProvider>
//         </div>
//     );
// }

// export default UserRouting;


import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyNavbar from './Navbar'; // Import the MyNavbar component
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Help from './Help/Help';
import NotFound from './NotFound';
import PackageDetails from './Home/Content/PackageDetails';
import Cart from './Cart/Cart';
import { CartProvider } from './Cart/CartContext';
function UserRouting() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
    return (
        <div>
            <CartProvider>
            <MyNavbar isAuthenticated={user !== null} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/package-details/:id" element={<PackageDetails />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </CartProvider>
        </div>
    );
}

export default UserRouting;
