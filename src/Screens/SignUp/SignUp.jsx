import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from "firebase/firestore";


function SignUp() {


    // creating form state to get data and save user in firebase 

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // creating a function to register user in firebase and save user in users collection of firestore 

    const registerUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), { username, email, password, id: userCredential.user.uid });

        } catch (error) {
            console.log(error.message);
        }
        setUsername("");
        setEmail("");
        setPassword("");
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
                                    <h3 className="login-heading mb-4 text-white h2 fw-medium">Sign Up Now</h3>
                                    {/* Sign In Form */}
                                    <div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingName"
                                                placeholder="John Doe"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <label htmlFor="floatingName">Username</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="floatingEmail">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <div className="d-grid">
                                            <button
                                                className="theme-btn m-0 text-uppercase py-3 mb-2"
                                                type="button"
                                                onClick={registerUser}
                                            >
                                                Sign up
                                            </button>
                                            <div className="my-3">
                                                <Link to="/signin" className="text-white" href="#">
                                                    Allready Have Account? <u>Signin</u>
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

export default SignUp