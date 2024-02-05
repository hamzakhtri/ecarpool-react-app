import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Footer() {

    const user = useSelector(state=> state.user.currentUser);

    return (
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start footer-sec">
                {/* Section: Social media */}
                <section className="d-flex justify-content-center justify-content-lg-between px-5 py-4 border-bottom">
                    {/* Left */}
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-facebook-f" />
                        </Link>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-twitter" />
                        </Link>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-google" />
                        </Link>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-instagram" />
                        </Link>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-linkedin" />
                        </Link>
                        <Link to="/" className="me-4 text-reset">
                            <i className="fab fa-github" />
                        </Link>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />
                                    E-Carpool
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer content.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            {user ? <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Menu</h6>
                                <p>
                                    <Link to="/" className="text-reset">
                                        Find Rides
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/sharerides" className="text-reset">
                                        Share Rides
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/chatroom" className="text-reset">
                                        Chatroom
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/profile" className="text-reset">
                                        My Profile
                                    </Link>
                                </p>
                            </div> : <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Menu</h6>
                                <p>
                                    <Link to="/" className="text-reset">
                                        Home
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/about" className="text-reset">
                                        About
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/contact" className="text-reset">
                                        Contact Us
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/signin" className="text-reset">
                                        Sign In
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/signup" className="text-reset">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>}
                            {/* Grid column */}
                            {/* Grid column */}
                            
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home me-3" /> New York, NY 10012, US
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3" />
                                    info@example.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3" /> + 01 234 567 88
                                </p>
                                <p>
                                    <i className="fas fa-print me-3" /> + 01 234 567 89
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div className='bottom-footer text-center py-4'
                >
                    © 2024 Copyright: &nbsp;
                    <Link className="text-reset fw-bold" to="/">
                        E-Carpool
                    </Link>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </>

    )
}

export default Footer