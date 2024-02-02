import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <div className="ps-md-0 auth-sec">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4 text-white h2 fw-medium">Reset Password</h3>
                                    {/* Sign In Form */}
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="name@example.com"
                                            />
                                            <label htmlFor="floatingEmail">Email address</label>
                                        </div>
                                        
                                        <div className="d-grid">
                                            <button
                                                className="theme-btn m-0 text-uppercase py-3 mb-2"
                                                type="submit"
                                            >
                                                Confirm Email
                                            </button>
                                            <div className="d-flex justify-content-between my-3">
                                                <Link className="text-white" to="/signin">
                                                    <u>Sign</u>
                                                </Link>
                                                <Link className="text-white" to="/signup">
                                                    <u>Singup</u>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to="/"
                                                    className="btn btn-light fw-bold m-0 text-uppercase mt-4 mb-2"
                                                    type="submit"
                                                >
                                                    Back to Home
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword