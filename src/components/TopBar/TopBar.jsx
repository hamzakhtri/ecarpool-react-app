import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../assets/img/logo.png"

function TopBar() {
  const expand = 'lg'; // Set the desired breakpoint for the expand prop

  return (
      <Navbar expand={expand} fixed='top' className="top-navbar navbar-dark py-0">
        <Container>
          <Navbar.Brand href="#"><img src={logo} width="180px" className='img-fluid' alt="brand" /></Navbar.Brand>
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
              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <NavLink to="/" className='me-3 menu-item'>Home</NavLink>
                <NavLink to="/" className='me-3 menu-item'>About</NavLink>
                <NavLink to="/" className='me-3 menu-item'>Services</NavLink>
                <NavLink to="/" className='me-3 menu-item'>Contact Us</NavLink>
                <NavLink to="/" className='me-3 auth-btn menu-item'>Sign In</NavLink>
                <NavLink to="/" className='auth-btn menu-item'>Sign Up</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  );
}

export default TopBar;
