import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/img/logo.png";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function TopBar() {
  const expand = 'lg'; // Set the desired breakpoint for the expand prop

  const user = useSelector(state => state.user.currentUser);

  return (
    <Navbar expand={expand} fixed='top' className="top-navbar navbar-dark py-0">
      <Container>
        <Navbar.Brand><NavLink to="/"><img src={logo} width="180px" className='img-fluid' alt="brand" /></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
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

            {/* if user is avaible than show user navigaion menu either show default nav menu  */}

            {user && user !== null ?

              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <NavLink to="/" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Find Rides</NavLink>
                <NavLink to="/sharerides" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Share Rides</NavLink>
                <NavLink to="/chatroom" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Chatroom</NavLink>
                <NavLink to="/profile" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>My Profile</NavLink>
              </Nav>

              :
              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <NavLink to="/" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Contact Us</NavLink>
                <NavLink to="/signin" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Sign In</NavLink>
                <NavLink to="/signup" className={({ isActive }) => `${isActive ? 'active' : ""} me-3 menu-item`}>Sign Up</NavLink>
              </Nav>
            }
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default TopBar;
