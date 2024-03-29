import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { addCurrentUser } from '../../store/features/user/userSlice';

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const logedUser = docSnap.data();
            const currentUser = {
                id: logedUser.id,
                username: logedUser.username,
                email: logedUser.email,
                phoneNo: logedUser.phoneNo,
                gender: logedUser.gender,
                address: logedUser.address,
                password: logedUser.password
            };

            dispatch(addCurrentUser(currentUser));

            setLoading(false);
            
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged In Successfully",
                showConfirmButton: false,
                timer: 1000
            });
            
            navigate("/");
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials",
            });
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };



    return (
        <div className="w-100 ps-md-0 auth-sec">
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4 text-white h2 fw-medium">Sign In Now</h3>
                                    <form onSubmit={login}>
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
                                                type="submit"
                                            >
                                                {loading ? "Signing..." : "Sign in"}
                                            </button>
                                            <div className="d-flex justify-content-between my-3">
                                                <Link className="text-white small" to="/forgotpassword">
                                                    Forgot password?
                                                </Link>
                                                <Link className="text-white small" to="/signup">
                                                    Don't Have Account? <u>Sign up</u>
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
    );
}

export default SignIn;
