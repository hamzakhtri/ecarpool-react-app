import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

function ForgotPassword() {


    const [userEmail, setUserEmail] = useState("");


    // reset password function which will send a link for password reset to the entered email

    const resetPassword = () => {
        const actionCodeSettings = {
            url: 'http://localhost:3000/signin',
            handleCodeInApp: false,
        };

        sendPasswordResetEmail(auth, userEmail, actionCodeSettings)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Email Sent",
                    text: "Check Your Email and Reset Password",
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: errorMessage.split(":")[1],
                });
            });
    }


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
                                    <div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="name@example.com"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />
                                            <label htmlFor="floatingEmail">Email address</label>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                className="theme-btn m-0 text-uppercase py-3 mb-2"
                                                type="button"
                                                onClick={resetPassword}
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
                                    </div>
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