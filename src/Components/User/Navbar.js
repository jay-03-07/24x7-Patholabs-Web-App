//previous version
// import React from 'react';
// import {Link} from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg'; // Importing the chart logo
// import "./Navbar.css"
// function MyNavbar() {
//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0 " // Center aligning the Nav
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//               <LinkContainer to="/" exact>
//                 <Nav.Link className="nav-link-custom mx-5">Home</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/about">
//                 <Nav.Link className="nav-link-custom mx-5">About Us</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/contact">
//                 <Nav.Link className="nav-link-custom mx-5">Contact Us</Nav.Link>
//               </LinkContainer>
//             </Nav>

//             <Nav className="mx-3">
//               <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
//               <span className="mt-2">|</span>
//               <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
//             </Nav>

//             <Nav className="mx-3">
//               <Navbar.Brand as={Link} to="/cart">
//                 <img
//                   src={cartLogo}
//                   alt="Cart Logo"
//                   height="30"
//                   width="30"
//                   className="d-inline-block align-top"
//                 />
//               </Navbar.Brand>
//             </Nav>
//             <Nav className="mx-3">

//               <Nav.Link as={Link} to="/help" className="nav-link-custom">Need Help?</Nav.Link>

//             </Nav>


//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//     </>
//   );
// }

// export default MyNavbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg'; // Importing the chart logo
// import { useCart } from './Cart/CartContext'; // Import the CartContext to access cart items
// import "./Navbar.css";

// function MyNavbar() {
//   const { cartItems } = useCart(); // Get cart items from CartContext

//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0 " // Center aligning the Nav
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//               <LinkContainer to="/" exact>
//                 <Nav.Link className="nav-link-custom mx-5">Home</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/about">
//                 <Nav.Link className="nav-link-custom mx-5">About Us</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/contact">
//                 <Nav.Link className="nav-link-custom mx-5">Contact Us</Nav.Link>
//               </LinkContainer>
//             </Nav>


//             <Nav className="mx-5">
//               <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
//               <span className="mt-2 d-flex">|</span>
//               <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
//             </Nav>

//             <Nav className="mx-3">
//               {/* Link the cart logo to the cart page */}
//               <Link to="/cart">
//                 <img
//                   src={cartLogo}
//                   alt="Cart Logo"
//                   height="30"
//                   width="30"
//                   className="d-inline-block align-top"
//                 />
//                 {/* Display the cart badge with the number of items */}
//                 {cartItems.length>0 &&(
//                 <span className="cart-badge">{cartItems.length}</span>
//                 )}
//               </Link>
//             </Nav>
//             <Nav className="mx-3">
//               <Nav.Link as={Link} to="/help" className="nav-link-custom">Need Help?</Nav.Link>
//             </Nav>


//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default MyNavbar;


//done
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg';
// import { useCart } from './Cart/CartContext';
// import "./Navbar.css";

// function MyNavbar() {
//   const { cartItems } = useCart();

//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px'}}
//               navbarScroll
//             >
//               <div className="d-flex justify-content-center align-items-center mx-5" style={{gap:'100px'}}>
//                 <LinkContainer to="/" exact>
//                   <Nav.Link className="nav-link-custom">Home</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/about">
//                   <Nav.Link className="nav-link-custom">About Us</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/contact">
//                   <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
//                 </LinkContainer>
//               </div>
//             </Nav>

//             <Nav className="ms-auto align-items-center mx-2">
//               <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
//               <span className=" d-lg">|</span>
//               <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
//               <div className="position-relative ms-2 mx-3">
//                 <Link to="/cart" className="d-flex align-items-center text-decoration-none">
//                   <img
//                     src={cartLogo}
//                     alt="Cart Logo"
//                     height="30"
//                     width="30"
//                     className="d-inline-block align-top me-2 mt-2 mx-2"
//                   />
//                   {cartItems.length > 0 && (
//                     <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{ fontSize: '0.9rem', backgroundColor:'#ff6f61',   boxShadow:'0 0 1px #333', borderRadius:'5px'
//                   }}>
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//               <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default MyNavbar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg';
// import { useCart } from './Cart/CartContext';
// import "./Navbar.css";
// import Login from './Login/Login';
// import Signup from './Signup/Signup';

// function MyNavbar() {
//   const { cartItems } = useCart();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);

//   const openLoginModal = () => setShowLoginModal(true);
//   const closeLoginModal = () => setShowLoginModal(false);
//   const openSignupModal = () => setShowSignupModal(true);
//   const closeSignupModal = () => setShowSignupModal(false);

//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px'}}
//               navbarScroll
//             >
//               <div className="d-flex justify-content-center align-items-center mx-5" style={{gap:'100px'}}>
//                 <LinkContainer to="/" exact>
//                   <Nav.Link className="nav-link-custom">Home</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/about">
//                   <Nav.Link className="nav-link-custom">About Us</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/contact">
//                   <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
//                 </LinkContainer>
//               </div>
//             </Nav>

//             <Nav className="ms-auto align-items-center mx-2">
//               <Nav.Link onClick={openLoginModal} className="nav-link-custom">Login</Nav.Link>
//               <span className=" d-lg">|</span>
//               <Nav.Link onClick={openSignupModal} className="nav-link-custom">Sign Up</Nav.Link>
//               <div className="position-relative ms-2 mx-3">
//                 <Link to="/cart" className="d-flex align-items-center text-decoration-none">
//                   <img
//                     src={cartLogo}
//                     alt="Cart Logo"
//                     height="30"
//                     width="30"
//                     className="d-inline-block align-top me-2 mt-2 mx-2"
//                   />
//                   {cartItems.length > 0 && (
//                     <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{ fontSize: '0.9rem', backgroundColor:'#ff6f61',   boxShadow:'0 0 1px #333', borderRadius:'5px'
//                   }}>
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//               <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Login Modal */}
//       <Login show={showLoginModal} handleClose={closeLoginModal} />

//       {/* Signup Modal */}
//       <Signup show={showSignupModal} handleClose={closeSignupModal} />
//     </>
//   );
// }

// export default MyNavbar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg';
// import { useCart } from './Cart/CartContext';
// import "./Navbar.css";
// import BannerLeftSection from './Login/BannerLeftSection'; // Import the BannerLeftSection component
// import Signup from './Signup/Signup';
// import Login from './Login/Login';


// function MyNavbar() {
//   const { cartItems } = useCart();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [modalContent, setModalContent] = useState(null);

//   const openLoginModal = () => {
//     setShowLoginModal(true);
//     setModalContent('login'); // Set modalContent to 'login' when opening the login modal
//   };

//   const openSignupModal = () => {
//     setShowSignupModal(true);
//     setModalContent('signup'); // Set modalContent to 'signup' when opening the signup modal
//   };

//   const closeModals = () => {
//     setShowLoginModal(false);
//     setShowSignupModal(false);
//     setModalContent(null); // Reset modalContent when closing modals
//   };

//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px'}}
//               navbarScroll
//             >
//               <div className="d-flex justify-content-center align-items-center mx-5" style={{gap:'100px'}}>
//                 <LinkContainer to="/" exact>
//                   <Nav.Link className="nav-link-custom">Home</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/about">
//                   <Nav.Link className="nav-link-custom">About Us</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/contact">
//                   <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
//                 </LinkContainer>
//               </div>
//             </Nav>
            
//             <Nav className="ms-auto align-items-center mx-2">
//               <Nav.Link onClick={openLoginModal} className="nav-link-custom">Login</Nav.Link>
//               <span className=" d-lg">|</span>
//               <Nav.Link onClick={openSignupModal} className="nav-link-custom">Sign Up</Nav.Link>
//               <div className="position-relative ms-2 mx-3">
//                 <Link to="/cart" className="d-flex align-items-center text-decoration-none">
//                   <img
//                     src={cartLogo}
//                     alt="Cart Logo"
//                     height="30"
//                     width="30"
//                     className="d-inline-block align-top me-2 mt-2 mx-2"
//                   />
//                   {cartItems.length > 0 && (
//                     <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{ fontSize: '0.9rem', backgroundColor:'#ff6f61',   boxShadow:'0 0 1px #333', borderRadius:'5px'
//                   }}>
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//               <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//        {/* BannerLeftSection Modals */}
//        <BannerLeftSection
//         show={showLoginModal}
//         handleClose={closeModals}
//         modalContent={modalContent}
//       />
//       <BannerLeftSection
//         show={showSignupModal}
//         handleClose={closeModals}
//         modalContent={modalContent}
//       />
//     </>
//   );
// }

// export default MyNavbar;

// MyNavbar.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import cartLogo from './icons/cart-logo.svg';
// import { useCart } from './Cart/CartContext';
// import "./Navbar.css";
// import BannerLeftSection from './Login/BannerLeftSection'; // Import the BannerLeftSection component

// function MyNavbar() {
//   const { cartItems } = useCart();
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState(null);

//   const openModal = (content) => {
//     setShowModal(true);
//     setModalContent(content);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalContent(null);
//   };

//   return (
//     <>
//       <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="mx-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px'}}
//               navbarScroll
//             >
//               <div className="d-flex justify-content-center align-items-center mx-5" style={{gap:'100px'}}>
//                 <LinkContainer to="/" exact>
//                   <Nav.Link className="nav-link-custom">Home</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/about">
//                   <Nav.Link className="nav-link-custom">About Us</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/contact">
//                   <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
//                 </LinkContainer>
//               </div>
//             </Nav>
            
//             <Nav className="ms-auto align-items-center mx-2">
//               <Nav.Link onClick={() => openModal('login')} className="nav-link-custom">Login</Nav.Link>
//               <span className=" d-lg">|</span>
//               <Nav.Link onClick={() => openModal('signup')} className="nav-link-custom">Sign Up</Nav.Link>
//               <div className="position-relative ms-2 mx-3">
//                 <Link to="/cart" className="d-flex align-items-center text-decoration-none">
//                   <img
//                     src={cartLogo}
//                     alt="Cart Logo"
//                     height="30"
//                     width="30"
//                     className="d-inline-block align-top me-2 mt-2 mx-2"
//                   />
//                   {cartItems.length > 0 && (
//                     <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{ fontSize: '0.9rem', backgroundColor:'#ff6f61',   boxShadow:'0 0 1px #333', borderRadius:'5px'
//                   }}>
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//               <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* BannerLeftSection Modal */}
//       <BannerLeftSection
//         show={showModal}
//         handleClose={closeModal}
//         modalContent={modalContent}
//       />
//     </>
//   );
// }

// export default MyNavbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import cartLogo from './icons/cart-logo.svg';
import { useCart } from './Cart/CartContext';
import "./Navbar.css";
import BannerLeftSection from './Login/BannerLeftSection'; // Import the BannerLeftSection component
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase Auth
import userAvatar from './icons/user-avatar.png'; // Import user avatar icon


function MyNavbar({ isAuthenticated }) {
  const { cartItems } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const auth = getAuth(); // Get the Firebase Auth instance


  const openModal = (content) => {
    setShowModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleLogout = () => {
    signOut(auth) // Call signOut method from Firebase Auth
      .then(() => {
        // Handle successful logout
        console.log('User logged out successfully');
        // You may want to redirect the user to the login page or update the state to reflect the logout
      })
      .catch((error) => {
        // Handle errors
        console.error('Error occurred during logout:', error);
      });
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px'}}
              navbarScroll
            >
              <div className="d-flex justify-content-center align-items-center mx-5" style={{gap:'100px'}}>
                <LinkContainer to="/" exact>
                  <Nav.Link className="nav-link-custom">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link className="nav-link-custom">About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link className="nav-link-custom">Contact Us</Nav.Link>
                </LinkContainer>
              </div>
            </Nav>
            
            <Nav className="ms-auto align-items-center mx-2">
              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <img src={userAvatar} alt="User Avatar" className="avatar d-inline-block align-top me-2 mt-2 mx-2"  height="30"
                    width="30"/> {/* Use user avatar icon */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                    <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item> {/* Call handleLogout function on logout */}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link onClick={() => openModal('login')} className="nav-link-custom">Login</Nav.Link>
                  <span className=" d-lg">|</span>
                  <Nav.Link onClick={() => openModal('signup')} className="nav-link-custom">Sign Up</Nav.Link>
                </>
              )}
              <div className="position-relative ms-2 mx-3">
                <Link to="/cart" className="d-flex align-items-center text-decoration-none">
                  <img
                    src={cartLogo}
                    alt="Cart Logo"
                    height="30"
                    width="30"
                    className="d-inline-block align-top me-2 mt-2 mx-2"
                  />
                  {cartItems.length > 0 && (
                    <span className="cart-badge position-absolute top-0 start-100 translate-middle badge mx-1" style={{ fontSize: '0.9rem', backgroundColor:'#ff6f61',   boxShadow:'0 0 1px #333', borderRadius:'5px'
                  }}>
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              <Nav.Link as={Link} to="/help" className="nav-link-custom ms-2 mx-3">Need Help?</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* BannerLeftSection Modal */}
      <BannerLeftSection
        show={showModal}
        handleClose={closeModal}
        modalContent={modalContent}
      />
    </>
  );
}

export default MyNavbar;
