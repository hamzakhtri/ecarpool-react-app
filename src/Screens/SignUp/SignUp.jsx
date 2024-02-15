import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { addCurrentUser } from '../../store/features/user/userSlice';
import { useDispatch } from 'react-redux';



function SignUp() {


    // creating form state to get data and save user in firebase 

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("male");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // creating a function to register user in firebase and save user in users collection of firestore 

    const registerUser = async () => {

        setLoading(true);

        if (username && email && phoneNo && gender && address && password) {

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    username,
                    email,
                    phoneNo,
                    gender,
                    address,
                    password,
                    id: userCredential.user.uid
                });

                const user = userCredential.user;

                // get data of user and set it into redux store
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

                setUsername("");
                setEmail("");
                setPassword("");
                setAddress("");
                setPhoneNo("");
                setGender("male");

                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Account Created",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate("/");

            } catch (error) {
                setLoading(false);
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message.split(":")[1],
                });
            }

        } else {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All Fields Required",
            });
        }

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
                                                type="number"
                                                className="form-control"
                                                id="floatingNo"
                                                placeholder="name@example.com"
                                                value={phoneNo}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                            />
                                            <label htmlFor="floatingNo">Phone Number</label>
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
                                        <div className='d-flex text-white'>
                                            <p className='me-3'>Gender : </p>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id="male"
                                                    value="male"
                                                    checked={gender === 'male'}
                                                    onChange={() => setGender('male')}
                                                />
                                                <label className="form-check-label me-2" htmlFor="male">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id="female"
                                                    value="female"
                                                    checked={gender === 'female'}
                                                    onChange={() => setGender('female')}
                                                />
                                                <label className="form-check-label" htmlFor="female">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingAddress"
                                                placeholder="Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <label htmlFor="floatingAddress">Address</label>
                                        </div>
                                        <div className="d-grid">
                                            <button
                                                className="theme-btn m-0 text-uppercase py-3 mb-2"
                                                type="button"
                                                onClick={registerUser}
                                            >
                                                {loading ? "Signing..." : "Sign up"}
                                            </button>
                                            <div className="my-3">
                                                <Link to="/signin" className="text-white small" href="#">
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