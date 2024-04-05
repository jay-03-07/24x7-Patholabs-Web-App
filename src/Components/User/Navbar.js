import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import chartLogo from './icons/chart-logo.svg'; // Importing the chart logo
import "./Navbar.css"
function MyNavbar() {
  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"><span className="logo">24x7 Patholabs</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0 " // Center aligning the Nav
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to="/" exact>
                <Nav.Link className="nav-link-custom mx-5">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="nav-link-custom mx-5">About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link className="nav-link-custom mx-5">Contact Us</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="mx-3">
              <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
              <span className="mt-2">|</span>
              <Nav.Link as={Link} to="/signup" className="nav-link-custom">Sign Up</Nav.Link>
            </Nav>

            <Nav className="mx-3">
              <Navbar.Brand href="#chart">
                <img
                  src={chartLogo}
                  alt="Chart Logo"
                  height="30"
                  width="30"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            </Nav>
            <Nav className="mx-3">

              <Nav.Link as={Link} to="/help" className="nav-link-custom">Need Help?</Nav.Link>

            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>
 
    </>
  );
}

export default MyNavbar;
