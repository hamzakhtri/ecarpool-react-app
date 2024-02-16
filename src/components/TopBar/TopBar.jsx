import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/img/logo.png";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TopBar() {
  const expand = 'lg'; // Set the desired breakpoint for the expand prop
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);

  const user = useSelector(state => state.user.currentUser);

  return (
    <Navbar expand={expand} fixed='top' className="top-navbar navbar-dark py-0">
      <Container>
        <Navbar.Brand><NavLink to="/"><img src={logo} width="180px" className='img-fluid' alt="brand" /></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => setShowOffcanvas(!showOffcanvas)} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='offcanvas-header'>
              E-Carpool
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

            {/* if user is available then show user navigation menu otherwise show default nav menu  */}
            <Nav className="justify-content-evenly flex-grow-1 pe-3">
              {user && user !== null ?
                <>
                  <NavLink to="/" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Find Rides</NavLink>
                  <NavLink to="/sharerides" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Share Rides</NavLink>
                  <NavLink to="/mybookings" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>My Bookings</NavLink>
                  <NavLink to="/chatroom" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Chatroom</NavLink>
                  <NavLink to="/profile" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>My Profile</NavLink>
                </>
                :
                <>
                  <NavLink to="/" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Home</NavLink>
                  <NavLink to="/about" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>About</NavLink>
                  <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Contact Us</NavLink>
                  <NavLink to="/signin" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Sign In</NavLink>
                  <NavLink to="/signup" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`} onClick={handleClose}>Sign Up</NavLink>
                </>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default TopBar;
